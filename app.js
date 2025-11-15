// Add this at the top of app.js
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_https://gopurhfutfiagpzgmgdt.supabase.co; // <-- PASTE YOUR URL HERE
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHVyaGZ1dGZpYWdwemdtZ2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjgwMDQsImV4cCI6MjA3ODgwNDAwNH0.LmiWJL8auNv9xui3578Hic4ypv1Tr8fTGiwhZC4rW40; // <-- PASTE YOUR KEY HERE
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Global variables
let currentUser = null; // Will hold both auth user and profile data
let currentChat = null; // Will hold the other user's ID
let selectedSkills = new Set();
let messageSubscription = null; // For Supabase real-time

// Default configuration (for element_sdk)
const defaultConfig = {
    platform_name: "IJOP",
    tagline: "Connecting Skills to Global Opportunities",
    welcome_message: "Find your next international opportunity",
    footer_text: "© 2024 IJOP. All rights reserved."
};

// --- [ ALL FAKE SDK AND DATA ARRAYS HAVE BEEN REMOVED ] ---

// Initialize app
async function initApp() {
    // Initialize Element SDK (from original file)
    if (window.elementSdk) {
        await window.elementSdk.init({
            defaultConfig,
            onConfigChange: async (config) => {
                const platformName = config.platform_name || defaultConfig.platform_name;
                const tagline = config.tagline || defaultConfig.tagline;
                const welcomeMessage = config.welcome_message || defaultConfig.welcome_message;
                const footerText = config.footer_text || defaultConfig.footer_text;

                document.getElementById('platformName').textContent = platformName;
                document.querySelector('.logo').textContent = platformName;
                document.getElementById('tagline').textContent = tagline;
                document.getElementById('welcomeMessage').textContent = welcomeMessage;
                document.getElementById('footerText').textContent = footerText;
                document.title = `${platformName} - International Job Opportunities Platform`;
            },
            mapToCapabilities: (config) => ({
                recolorables: [],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            }),
            mapToEditPanelValues: (config) => new Map([
                ["platform_name", config.platform_name || defaultConfig.platform_name],
                ["tagline", config.tagline || defaultConfig.tagline],
                ["welcome_message", config.welcome_message || defaultConfig.welcome_message],
                ["footer_text", config.footer_text || defaultConfig.footer_text]
            ])
        });
    }

    // NEW: Supabase Auth State Listener
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
            // User is logged in. Fetch their profile data.
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
            } else if (data) {
                // Combine auth data and profile data
                currentUser = { ...session.user, ...data };
                updateAuthUI();
                showPage('dashboard');
                showDashboardSection('overview'); // Load dashboard data
            }
        } else if (event === 'SIGNED_OUT') {
            currentUser = null;
            if (messageSubscription) {
                messageSubscription.unsubscribe(); // Stop listening to messages
                messageSubscription = null;
            }
            updateAuthUI();
            showPage('home');
        }
    });

    // NEW: Check for existing session on page load
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (data) {
            currentUser = { ...session.user, ...data };
            updateAuthUI();
        }
    } else {
        updateAuthUI();
    }

    // Load initial page content
    displayFeaturedWorkers();
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    // Update sidebar active state
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const sidebarItems = document.querySelectorAll('.sidebar-nav-item');
    sidebarItems.forEach(item => {
        const onclick = item.getAttribute('onclick');
        if (onclick && onclick.includes(`showPage('${pageId}')`)) {
            item.classList.add('active');
        }
    });

    // Update page-specific content
    if (pageId === 'search') {
        displaySearchResults();
    } else if (pageId === 'jobs') {
        displayJobs();
    } else if (pageId === 'messages') {
        displayConversations();
    } else if (pageId === 'dashboard') {
        showDashboardSection('overview');
    } else if (pageId === 'home') {
        displayFeaturedWorkers();
    } else if (pageId === 'skills') {
        loadUserSkills();
    }
}

// Skills Management Functions
function loadUserSkills() {
    if (!currentUser || currentUser.user_type !== 'worker') return;
    selectedSkills.clear();
    if (currentUser.skills) {
        currentUser.skills.split(',').forEach(skill => {
            if (skill.trim()) selectedSkills.add(skill.trim());
        });
    }
    updateSelectedSkillsDisplay();
    updateSkillsSelection();
}

function toggleSkill(element, skillName) {
    if (selectedSkills.has(skillName)) {
        selectedSkills.delete(skillName);
        element.classList.remove('selected');
    } else {
        selectedSkills.add(skillName);
        element.classList.add('selected');
    }
    updateSelectedSkillsDisplay();
}

function updateSelectedSkillsDisplay() {
    const container = document.getElementById('selectedSkillsContainer');
    if (!container) return;

    if (selectedSkills.size === 0) {
        container.innerHTML = '<p style="color: #666;">No skills selected yet. Choose from the categories below.</p>';
    } else {
        container.innerHTML = Array.from(selectedSkills).map(skill =>
            `<span class="selected-skill-tag" onclick="removeSkill('${skill}')">${skill} ×</span>`
        ).join('');
    }
}

function updateSkillsSelection() {
    document.querySelectorAll('.skill-item').forEach(item => {
        const skillName = item.textContent.trim();
        if (selectedSkills.has(skillName)) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

function removeSkill(skillName) {
    selectedSkills.delete(skillName);
    updateSelectedSkillsDisplay();
    updateSkillsSelection();
}

// REFACTORED: Save skills to Supabase
async function saveSelectedSkills() {
    if (!currentUser) return;
    showLoading('skills');

    const skillsString = Array.from(selectedSkills).join(', ');

    try {
        const { data, error } = await supabase
            .from('profiles')
            .update({ skills: skillsString })
            .eq('id', currentUser.id)
            .select()
            .single();

        if (error) throw error;

        // Update local currentUser object
        currentUser = { ...currentUser, ...data };
        showSuccessMessage('Skills updated successfully!');
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        hideLoading('skills');
    }
}

function filterSkills() {
    const searchTerm = document.getElementById('skillsSearchInput').value.toLowerCase();
    const categories = document.querySelectorAll('.skill-category');

    categories.forEach(category => {
        const skills = category.querySelectorAll('.skill-item');
        let hasVisibleSkills = false;

        skills.forEach(skill => {
            const skillName = skill.textContent.toLowerCase();
            if (skillName.includes(searchTerm)) {
                skill.style.display = 'block';
                hasVisibleSkills = true;
            } else {
                skill.style.display = 'none';
            }
        });

        category.style.display = hasVisibleSkills ? 'block' : 'none';
    });
}

// REFACTORED: Authentication with Supabase
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    showLoading('loginForm');

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;
        // Success! onAuthStateChange will handle the rest.
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        hideLoading('loginForm');
    }
}

// REFACTORED: Signup with Supabase (Auth + Profile)
async function handleSignup(event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const fullName = document.getElementById('fullName').value;
    const userType = document.getElementById('userType').value;

    showLoading('signupForm');

    try {
        // 1. Sign up the user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) throw authError;

        if (!authData.user) throw new Error("Signup successful, but no user data returned.");

        // 2. Insert into our public 'profiles' table
        const { error: profileError } = await supabase.from('profiles').insert({
            id: authData.user.id, // Link to the auth user
            full_name: fullName,
            user_type: userType,
            company_name: userType === 'employer' ? fullName : null, // Default company name
            availability: 'available',
            skills: '',
            bio: ''
        });

        if (profileError) throw profileError;

        showSuccessMessage('Account created! Please check your email for verification.');
        showPage('login'); // Send them to login

    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        hideLoading('signupForm');
    }
}

// REFACTORED: Password reset with Supabase
async function handleReset(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;
    showLoading('resetForm');

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin, // URL to redirect to after password reset
        });
        if (error) throw error;
        showSuccessMessage('Password reset link sent to your email!');
        showPage('login');
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        hideLoading('resetForm');
    }
}

// REFACTORED: Logout with Supabase
async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        showErrorMessage(error.message);
    }
    // onAuthStateChange will handle UI update
}

// This function is fine, but it relies on `currentUser` being correct.
function updateAuthUI() {
    const publicNav = document.getElementById('publicNav');
    const userNav = document.getElementById('userNav');
    const leftSidebar = document.getElementById('leftSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContentWrapper = document.getElementById('mainContentWrapper');
    const postJobBtn = document.getElementById('postJobBtn');
    const skillsNavItem = document.getElementById('skillsNavItem');

    if (currentUser) {
        publicNav.style.display = 'none';
        userNav.style.display = 'flex';
        leftSidebar.classList.add('active');
        sidebarToggle.style.display = 'inline-block';
        mainContentWrapper.classList.add('with-sidebar');

        document.getElementById('userGreeting').textContent = `Hello, ${currentUser.full_name}`;
        document.getElementById('sidebarUserName').textContent = currentUser.full_name;
        document.getElementById('sidebarUserType').textContent = currentUser.user_type === 'worker' ? 'Skilled Worker' : 'Employer';

        if (currentUser.user_type === 'employer') {
            postJobBtn.style.display = 'inline-block';
            skillsNavItem.style.display = 'none';
        } else {
            postJobBtn.style.display = 'none';
            skillsNavItem.style.display = 'block';
            loadUserSkills();
        }
    } else {
        publicNav.style.display = 'flex';
        userNav.style.display = 'none';
        leftSidebar.classList.remove('active');
        sidebarToggle.style.display = 'none';
        mainContentWrapper.classList.remove('with-sidebar');
        postJobBtn.style.display = 'none';
    }
}

function toggleSidebar() {
    const leftSidebar = document.getElementById('leftSidebar');
    const mainContentWrapper = document.getElementById('mainContentWrapper');
    leftSidebar.classList.toggle('active');
    mainContentWrapper.classList.toggle('with-sidebar');
}

// Dashboard
// REFACTORED: Show dashboard sections
async function showDashboardSection(section) {
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    // Find the link by its onclick attribute
    const activeLink = Array.from(document.querySelectorAll('.sidebar-menu a')).find(
        link => link.getAttribute('onclick') === `showDashboardSection('${section}')`
    );
    if (activeLink) activeLink.classList.add('active');


    const content = document.getElementById('dashboard-content');
    if (!content) return;
    content.innerHTML = '<div class="loading"></div>'; // Show loading

    switch (section) {
        case 'overview':
            content.innerHTML = await getDashboardOverview();
            break;
        case 'profile':
            content.innerHTML = getProfileForm(); // This one is synchronous
            break;
        case 'jobs':
            content.innerHTML = await getJobsSection();
            break;
        case 'applications':
            content.innerHTML = await getApplicationsSection();
            break;
        case 'saved':
            content.innerHTML = getSavedSection(); // Synchronous
            break;
        case 'messages':
            content.innerHTML = getMessagesSection(); // Synchronous
            break;
    }
}

// REFACTORED: Fetch real data for overview
async function getDashboardOverview() {
    if (!currentUser) return '<h2>Dashboard Overview</h2><p>Please log in.</p>';

    let jobCount = 0;
    let appCount = 0;

    if (currentUser.user_type === 'employer') {
        const { count, error } = await supabase
            .from('jobs')
            .select('id', { count: 'exact' })
            .eq('poster_id', currentUser.id);
        if (!error) jobCount = count;
    } else {
        const { count, error } = await supabase
            .from('applications')
            .select('id', { count: 'exact' })
            .eq('applicant_id', currentUser.id);
        if (!error) appCount = count;
    }

    const { count: msgCount } = await supabase
        .from('messages')
        .select('id', { count: 'exact' })
        .or(`message_from_id.eq.${currentUser.id},message_to_id.eq.${currentUser.id}`);

    return `
        <h2>Dashboard Overview</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${currentUser.user_type === 'employer' ? jobCount : appCount}</div>
                <div class="stat-label">${currentUser.user_type === 'employer' ? 'Posted Jobs' : 'Applications'}</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${msgCount || 0}</div>
                <div class="stat-label">Messages</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${getProfileCompletion()}%</div>
                <div class="stat-label">Profile Complete</div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h3>Recent Activity</h3>
            </div>
            <p>Welcome back, ${currentUser.full_name}! Complete your profile to attract more opportunities.</p>
        </div>
    `;
}

// This function builds a form, so it's fine.
function getProfileForm() {
    return `
        <h2>Profile Settings</h2>
        <form id="profileForm" onsubmit="updateProfile(event)">
            <div class="card">
                <div class="card-header"><h3>Basic Information</h3></div>
                <div class="form-group">
                    <label for="profileFullName">Full Name</label>
                    <input type="text" id="profileFullName" class="form-control" value="${currentUser?.full_name || ''}" required>
                </div>
                <div class="form-group">
                    <label for="profileCountry">Country</label>
                    <input type="text" id="profileCountry" class="form-control" value="${currentUser?.country || ''}">
                </div>
                <div class="form-group">
                    <label for="profileCity">City</label>
                    <input type="text" id="profileCity" class="form-control" value="${currentUser?.city || ''}">
                </div>
                <div class="form-group">
                    <label for="profileNationality">Nationality</label>
                    <input type="text" id="profileNationality" class="form-control" value="${currentUser?.nationality || ''}">
                </div>
                ${currentUser?.user_type === 'employer' ? `
                <div class="form-group">
                    <label for="profileCompany">Company Name</label>
                    <input type="text" id="profileCompany" class="form-control" value="${currentUser?.company_name || ''}">
                </div>
                ` : `
                <div class="form-group">
                    <label for="profileSkills">Skills (Go to Skills page to edit)</label>
                    <input type="text" id="profileSkills" class="form-control" value="${currentUser?.skills || ''}" readonly>
                </div>
                <div class="form-group">
                    <label for="profileExperience">Years of Experience</label>
                    <input type="number" id="profileExperience" class="form-control" value="${currentUser?.experience || 0}" min="0">
                </div>
                <div class="form-group">
                    <label for="profileAvailability">Availability</label>
                    <select id="profileAvailability" class="form-control">
                        <option value="available" ${currentUser?.availability === 'available' ? 'selected' : ''}>Available Now</option>
                        <option value="soon" ${currentUser?.availability === 'soon' ? 'selected' : ''}>Available Soon</option>
                        <option value="not-available" ${currentUser?.availability === 'not-available' ? 'selected' : ''}>Not Available</option>
                    </select>
                </div>
                `}
                <div class="form-group">
                    <label for="profileBio">Bio</label>
                    <textarea id="profileBio" class="form-control">${currentUser?.bio || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="profilePhone">Phone Number</label>
                    <input type="tel" id="profilePhone" class="form-control" value="${currentUser?.phone || ''}">
                </div>
                <button type="submit" class="btn btn-primary">
                    <span class="btn-text">Update Profile</span>
                    <span class="loading hidden"></span>
                </button>
            </div>
        </form>
    `;
}

// REFACTORED: Fetch real jobs/applications
async function getJobsSection() {
    if (!currentUser) return '<h2>My Jobs</h2><p>Please log in.</p>';

    if (currentUser.user_type === 'employer') {
        const { data: userJobs, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('poster_id', currentUser.id);

        if (error) return '<h2>My Posted Jobs</h2><p>Error loading jobs.</p>';
        return `
            <h2>My Posted Jobs</h2>
            <div id="employerJobs">
            ${userJobs.length ? userJobs.map(job => `
                <div class="card">
                    <h3>${job.job_title}</h3>
                    <p><strong>Location:</strong> ${job.job_country}</p>
                    <p><strong>Salary:</strong> ${job.salary_range}</p>
                    <p>${job.job_description}</p>
                    <div style="margin-top: 1rem;">
                        <span class="skill-tag">${job.visa_support ? 'Visa Support' : 'No Visa Support'}</span>
                    </div>
                </div>
            `).join('') : '<p>No jobs posted yet.</p>'}
            </div>
        `;
    } else {
        // Worker's applications
        const { data: userApplications, error } = await supabase
            .from('applications')
            .select(`
                *,
                jobs ( * )
            `)
            .eq('applicant_id', currentUser.id);

        if (error) return '<h2>My Applications</h2><p>Error loading applications.</p>';
        return `
            <h2>My Applications</h2>
            <div id="workerApplications">
            ${userApplications.length ? userApplications.map(app => `
                <div class="card">
                    <h3>${app.jobs.job_title}</h3>
                    <p><strong>Company:</strong> ${app.jobs.company_name || 'Company Name'}</p>
                    <p><strong>Location:</strong> ${app.jobs.job_country}</p>
                    <p><strong>Applied:</strong> ${new Date(app.created_at).toLocaleDateString()}</p>
                    <p><strong>Cover Letter:</strong> ${app.cover_letter}</p>
                </div>
            `).join('') : '<p>No applications yet.</p>'}
            </div>
        `;
    }
}

// REFACTORED: Fetch real applications for employers
async function getApplicationsSection() {
    if (!currentUser) return '<h2>Job Applicants</h2><p>Please log in.</p>';

    if (currentUser.user_type === 'employer') {
        const { data: jobApplications, error } = await supabase
            .from('applications')
            .select(`
                *,
                profiles ( * ),
                jobs ( * )
            `)
            .eq('jobs.poster_id', currentUser.id); // Filter by jobs posted by this user

        if (error) return '<h2>Job Applicants</h2><p>Error loading applicants.</p>';
        
        // Filter in JS since RLS might complicate direct join filter
        const myApplicants = jobApplications.filter(app => app.jobs.poster_id === currentUser.id);

        return `
            <h2>Job Applicants</h2>
            <div id="jobApplicants">
            ${myApplicants.length ? myApplicants.map(app => {
            const applicant = app.profiles;
            const job = app.jobs;
            return `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h3>${applicant.full_name}</h3>
                            <p><strong>Applied for:</strong> ${job.job_title}</p>
                            <p><strong>Location:</strong> ${applicant.country}, ${applicant.city}</p>
                            <p><strong>Experience:</strong> ${applicant.experience || 0} years</p>
                            <div class="skills-tags">
                            ${applicant.skills ? applicant.skills.split(',').map(skill =>
                `<span class="skill-tag">${skill.trim()}</span>`
            ).join('') : ''}
                            </div>
                            <p><strong>Cover Letter:</strong> ${app.cover_letter}</p>
                        </div>
                        <div>
                            <button class="btn btn-primary" onclick="startChat('${applicant.id}')">Message</button>
                        </div>
                    </div>
                </div>
                `;
        }).join('') : '<p>No applicants yet.</p>'}
            </div>
        `;
    } else {
        // For workers, this section just shows their applications
        return getJobsSection();
    }
}

function getSavedSection() {
    return `
        <h2>Saved Items</h2>
        <div class="card"><p>Saved profiles and jobs will appear here.</p></div>
    `;
}

function getMessagesSection() {
    return `
        <h2>Messages</h2>
        <div class="card">
            <p>Use the main Messages page for full messaging functionality.</p>
            <button class="btn btn-primary" onclick="showPage('messages')">Go to Messages</button>
        </div>
    `;
}

// REFACTORED: Update profile in Supabase
async function updateProfile(event) {
    event.preventDefault();
    showLoading('profileForm');

    const profileUpdates = {
        full_name: document.getElementById('profileFullName').value,
        country: document.getElementById('profileCountry').value,
        city: document.getElementById('profileCity').value,
        nationality: document.getElementById('profileNationality').value,
        bio: document.getElementById('profileBio').value,
        phone: document.getElementById('profilePhone').value
    };

    if (currentUser.user_type === 'employer') {
        profileUpdates.company_name = document.getElementById('profileCompany').value;
    } else {
        profileUpdates.experience = parseInt(document.getElementById('profileExperience').value) || 0;
        profileUpdates.availability = document.getElementById('profileAvailability').value;
    }

    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(profileUpdates)
            .eq('id', currentUser.id)
            .select()
            .single();

        if (error) throw error;

        currentUser = { ...currentUser, ...data }; // Update local user
        showSuccessMessage('Profile updated successfully!');
        updateAuthUI(); // Refresh header/sidebar
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        hideLoading('profileForm');
    }
}

function getProfileCompletion() {
    if (!currentUser) return 0;
    const fields = ['full_name', 'country', 'city', 'bio'];
    if (currentUser.user_type === 'worker') {
        fields.push('skills', 'nationality', 'experience');
    } else {
        fields.push('company_name');
    }

    const completed = fields.filter(field => currentUser[field]).length;
    return Math.round((completed / fields.length) * 100);
}

// REFACTORED: Search workers from Supabase
async function displaySearchResults() {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;

    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const countryFilter = document.getElementById('countryFilter')?.value || '';
    const experienceFilter = document.getElementById('experienceFilter')?.value || '';
    const availabilityFilter = document.getElementById('availabilityFilter')?.value || '';

    resultsContainer.innerHTML = '<div class="loading"></div>';

    try {
        let query = supabase
            .from('profiles')
            .select('*')
            .eq('user_type', 'worker');

        if (searchTerm) {
            query = query.or(`full_name.ilike.%${searchTerm}%,skills.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`);
        }
        if (countryFilter) {
            query = query.eq('country', countryFilter);
        }
        if (availabilityFilter) {
            query = query.eq('availability', availabilityFilter);
        }
        if (experienceFilter) {
            if (experienceFilter === '0-2') query = query.lte('experience', 2);
            if (experienceFilter === '3-5') query = query.gte('experience', 3).lte('experience', 5);
            if (experienceFilter === '6-10') query = query.gte('experience', 6).lte('experience', 10);
            if (experienceFilter === '10+') query = query.gt('experience', 10);
        }

        const { data: workers, error } = await query;
        if (error) throw error;

        resultsContainer.innerHTML = workers.length ? workers.map(worker => `
            <div class="worker-card">
                <div class="profile-photo">${worker.full_name ? worker.full_name.charAt(0).toUpperCase() : '?'}</div>
                <div class="worker-info" style="flex: 1;">
                    <h3>${worker.full_name || 'Anonymous'}</h3>
                    <p>${worker.country || 'Location not specified'}${worker.city ? `, ${worker.city}` : ''}</p>
                    <p>${worker.experience || 0} years experience</p>
                    <div class="skills-tags">
                        ${worker.skills ? worker.skills.split(',').map(skill =>
            `<span class="skill-tag">${skill.trim()}</span>`
        ).join('') : '<span class="skill-tag">No skills listed</span>'}
                    </div>
                    <p style="margin-top: 0.5rem; color: #666;">${worker.bio || 'No bio available'}</p>
                </div>
                <div>
                    <button class="btn btn-secondary" onclick="viewWorkerProfile('${worker.id}')">View Profile</button>
                    ${currentUser && currentUser.user_type === 'employer' ?
                `<button class="btn btn-primary" onclick="startChat('${worker.id}')" style="margin-top: 0.5rem;">Message</button>` : ''
            }
                </div>
            </div>
        `).join('') : '<p>No workers found matching your criteria.</p>';

    } catch (error) {
        resultsContainer.innerHTML = `<p class="error">Error loading workers: ${error.message}</p>`;
    }
}

// REFACTORED: Search workers from Supabase
async function displayFeaturedWorkers() {
    const featuredContainer = document.getElementById('featuredWorkers');
    if (!featuredContainer) return;

    try {
        const { data: workers, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_type', 'worker')
            .limit(3);

        if (error) throw error;

        featuredContainer.innerHTML = workers.length ? workers.map(worker => `
            <div class="worker-card">
                <div class="profile-photo">${worker.full_name ? worker.full_name.charAt(0).toUpperCase() : '?'}</div>
                <div class="worker-info" style="flex: 1;">
                    <h3>${worker.full_name || 'Anonymous'}</h3>
                    <p>${worker.country || 'Location not specified'}</p>
                    <div class="skills-tags">
                        ${worker.skills ? worker.skills.split(',').slice(0, 3).map(skill =>
            `<span class="skill-tag">${skill.trim()}</span>`
        ).join('') : '<span class="skill-tag">No skills listed</span>'}
                    </div>
                </div>
                <div>
                    <button class="btn btn-secondary" onclick="showPage('search')">View All Workers</button>
                </div>
            </div>
        `).join('') : '<p>No featured workers available yet.</p>';
    } catch (error) {
        featuredContainer.innerHTML = '<p>Could not load featured workers.</p>';
    }
}

// REFACTORED: Fetch worker profile for modal
async function viewWorkerProfile(workerId) {
    const { data: worker, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', workerId)
        .single();
    
    if (error || !worker) return alert('Could not load profile.');

    alert(`Profile: ${worker.full_name}\nLocation: ${worker.country}, ${worker.city}\nSkills: ${worker.skills}\nExperience: ${worker.experience} years\nBio: ${worker.bio}`);
}

// Jobs functionality
function showJobForm() {
    document.getElementById('jobFormModal').classList.remove('hidden');
}

function hideJobForm() {
    document.getElementById('jobFormModal').classList.add('hidden');
    document.getElementById('jobForm').reset();
}

// REFACTORED: Submit job to Supabase
async function handleJobSubmission(event) {
    event.preventDefault();
    if (!currentUser) return showErrorMessage('You must be logged in to post a job.');

    showLoading('jobForm');

    const newJob = {
        poster_id: currentUser.id,
        company_name: currentUser.company_name || currentUser.full_name,
        job_title: document.getElementById('jobTitle').value,
        job_description: document.getElementById('jobDescription').value,
        job_country: document.getElementById('jobCountry').value,
        salary_range: document.getElementById('salaryRange').value,
        visa_support: document.getElementById('visaSupport').checked
    };

    try {
        const { error } = await supabase.from('jobs').insert(newJob);
        if (error) throw error;

        hideJobForm();
        showSuccessMessage('Job posted successfully!');
        displayJobs(); // Refresh the jobs list
    } catch (error) {
        showErrorMessage(error.message);
    } finally {
        hideLoading('jobForm');
    }
}

// REFACTORED: Fetch jobs from Supabase
async function displayJobs() {
    const jobsContainer = document.getElementById('jobsList');
    if (!jobsContainer) return;
    jobsContainer.innerHTML = '<div class="loading"></div>';

    try {
        const { data: jobs, error } = await supabase
            .from('jobs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        jobsContainer.innerHTML = jobs.length ? jobs.map(job => `
            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div style="flex: 1;">
                        <h3>${job.job_title}</h3>
                        <p><strong>Company:</strong> ${job.company_name}</p>
                        <p><strong>Location:</strong> ${job.job_country}</p>
                        <p><strong>Salary:</strong> ${job.salary_range || 'Not specified'}</p>
                        <p>${job.job_description}</p>
                        <div style="margin-top: 1rem;">
                            ${job.visa_support ? '<span class="skill-tag">Visa Support Available</span>' : ''}
                        </div>
                    </div>
                    <div>
                        ${currentUser && currentUser.user_type === 'worker' ?
            `<button class="btn btn-primary" onclick="applyToJob('${job.id}')">Apply Now</button>` : ''
            }
                    </div>
                </div>
            </div>
        `).join('') : '<p>No jobs available at the moment.</p>';
    } catch (error) {
        jobsContainer.innerHTML = `<p class="error">Error loading jobs: ${error.message}</p>`;
    }
}

// REFACTORED: Submit application to Supabase
async function applyToJob(jobId) {
    if (!currentUser) {
        showErrorMessage('Please login to apply for jobs');
        return;
    }

    // Check if already applied
    const { data: existingApplication, error: checkError } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('applicant_id', currentUser.id)
        .single();

    if (existingApplication) {
        showErrorMessage('You have already applied to this job');
        return;
    }

    const coverLetter = prompt('Please enter a brief cover letter:');
    if (!coverLetter) return;

    const application = {
        job_id: jobId,
        applicant_id: currentUser.id,
        cover_letter: coverLetter
    };

    try {
        const { error } = await supabase.from('applications').insert(application);
        if (error) throw error;
        showSuccessMessage('Application submitted successfully!');
        // Optionally, refresh the dashboard applications view
        if (document.getElementById('dashboard').classList.contains('active')) {
            showDashboardSection('applications');
        }
    } catch (error) {
        showErrorMessage(error.message);
    }
}

// REFACTORED: Messaging with Supabase Real-time
async function displayConversations() {
    const conversationsContainer = document.getElementById('conversationsList');
    if (!conversationsContainer) return;

    if (!currentUser) {
        conversationsContainer.innerHTML = '<p>Please login to view messages.</p>';
        return;
    }

    conversationsContainer.innerHTML = '<div class="loading"></div>';

    try {
        // Get all messages sent to or from me
        const { data: messages, error } = await supabase
            .from('messages')
            .select('message_from_id, message_to_id, message_text, created_at, profiles_from:profiles!message_from_id(*), profiles_to:profiles!message_to_id(*)')
            .or(`message_from_id.eq.${currentUser.id},message_to_id.eq.${currentUser.id}`)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Get unique conversations
        const conversations = new Map();
        messages.forEach(msg => {
            const otherUser = msg.message_from_id === currentUser.id ? msg.profiles_to : msg.profiles_from;
            if (otherUser && !conversations.has(otherUser.id)) {
                conversations.set(otherUser.id, {
                    user: otherUser,
                    lastMsg: msg.message_text
                });
            }
        });

        if (conversations.size === 0) {
            conversationsContainer.innerHTML = '<p>No conversations yet.</p>';
            return;
        }

        conversationsContainer.innerHTML = Array.from(conversations.values()).map(convo => {
            return `
                <div class="worker-card" onclick="openChat('${convo.user.id}')" style="cursor: pointer;">
                    <div class="profile-photo">${convo.user.full_name ? convo.user.full_name.charAt(0).toUpperCase() : '?'}</div>
                    <div class="worker-info">
                        <h4>${convo.user.full_name}</h4>
                        <p style="color: #666; font-size: 0.9rem;">${convo.lastMsg.substring(0, 50)}...</p>
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        conversationsContainer.innerHTML = '<p>Error loading conversations.</p>';
    }
}

// REFACTORED: Open chat and subscribe to real-time updates
async function openChat(otherUserId) {
    if (!currentUser) return;

    // 1. Get the other user's profile
    const { data: otherUser, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('id', otherUserId)
        .single();

    if (error || !otherUser) return showErrorMessage('Could not find user.');

    currentChat = otherUser.id; // Store the ID
    document.getElementById('chatHeader').textContent = `Chat with ${otherUser.full_name}`;

    // 2. Unsubscribe from any previous chat
    if (messageSubscription) {
        messageSubscription.unsubscribe();
    }

    // 3. Fetch initial messages
    await displayMessages(currentChat);

    // 4. Subscribe to new messages
    messageSubscription = supabase
        .channel(`public:messages:to_${currentUser.id}`)
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `message_to_id=eq.${currentUser.id}` // Only get messages sent TO us
        },
            (payload) => {
                // A new message has arrived!
                if (payload.new.message_from_id === currentChat) {
                    appendMessage(payload.new); // Add to UI
                }
            }
        )
        .subscribe();
}

// REFACTORED: Fetch message history
async function displayMessages(otherUserId) {
    const messagesContainer = document.getElementById('messagesList');
    if (!messagesContainer) return;
    messagesContainer.innerHTML = '<div class="loading"></div>';

    try {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .or(`(message_from_id.eq.${currentUser.id},message_to_id.eq.${otherUserId}),(message_from_id.eq.${otherUserId},message_to_id.eq.${currentUser.id})`)
            .order('created_at', { ascending: true });

        if (error) throw error;

        messagesContainer.innerHTML = data.map(msg => `
            <div class="message ${msg.message_from_id === currentUser.id ? 'sent' : 'received'}">
                <p>${msg.message_text}</p>
                <small>${new Date(msg.created_at).toLocaleTimeString()}</small>
            </div>
        `).join('');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
        messagesContainer.innerHTML = `<p class="error">Error loading messages</p>`;
    }
}

// NEW: Helper function to add one message to the UI
function appendMessage(msg) {
    const messagesContainer = document.getElementById('messagesList');
    messagesContainer.innerHTML += `
        <div class="message ${msg.message_from_id === currentUser.id ? 'sent' : 'received'}">
            <p>${msg.message_text}</p>
            <small>${new Date(msg.created_at || Date.now()).toLocaleTimeString()}</small>
        </div>
    `;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// REFACTORED: Send message to Supabase
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (!messageText || !currentChat || !currentUser) return;

    const message = {
        message_from_id: currentUser.id,
        message_to_id: currentChat,
        message_text: messageText
    };

    try {
        // Insert the message
        const { data, error } = await supabase.from('messages').insert(message).select().single();
        if (error) throw error;

        messageInput.value = '';
        appendMessage(data); // Add our own message to the UI

    } catch (error) {
        showErrorMessage(error.message);
    }
}

// REFACTORED: Start chat using User ID
async function startChat(otherUserId) {
    showPage('messages');
    // We need to wait for the page to render before calling openChat
    setTimeout(() => openChat(otherUserId), 100);
}

// Utility functions (no changes needed)
function showLoading(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const btnText = form.querySelector('.btn-text');
    const loading = form.querySelector('.loading');
    const btn = form.querySelector('button[type="submit"]');

    if (btnText) btnText.classList.add('hidden');
    if (loading) loading.classList.remove('hidden');
    if (btn) btn.disabled = true;
}

function hideLoading(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    const btnText = form.querySelector('.btn-text');
    const loading = form.querySelector('.loading');
    const btn = form.querySelector('button[type="submit"]');

    if (btnText) btnText.classList.remove('hidden');
    if (loading) loading.classList.add('hidden');
    if (btn) btn.disabled = false;
}

function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: #000000; color: #ffffff;
        padding: 1rem 1.5rem; border-radius: 4px;
        z-index: 10000;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

function showErrorMessage(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: #ff0000; color: #ffffff;
        padding: 1rem 1.5rem; border-radius: 4px;
        z-index: 10000;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Form event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('resetForm').addEventListener('submit', handleReset);

    // Job form listener
    const jobForm = document.getElementById('jobForm');
    if (jobForm) {
        jobForm.addEventListener('submit', handleJobSubmission);
    }

    // Message input listener
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Initialize app
    initApp();
});
