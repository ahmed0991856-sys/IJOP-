<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IJOP - International Job Opportunity Platform</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="/_sdk/data_sdk.js"></script>
  <script src="/_sdk/element_sdk.js"></script>
  <style>
        body {
            box-sizing: border-box;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            transition: all 0.3s ease;
        }
        
        .dark-mode {
            background: #0a0a0a;
            color: #ffffff;
        }
        
        .dark-mode .card {
            background: #1a1a1a;
            border-color: #333;
            color: #ffffff;
        }
        
        .dark-mode .input-field {
            background: #1a1a1a;
            border-color: #333;
            color: #ffffff;
        }
        
        .dark-mode .input-field:focus {
            border-color: #ffffff;
        }
        
        .geometric-pattern {
            background-image: 
                linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.02) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.02) 75%),
                linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.02) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.02) 75%);
            background-size: 60px 60px;
        }
        
        .diagonal-lines {
            background-image: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.03) 2px,
                rgba(255,255,255,0.03) 4px
            );
        }
        
        .modern-gradient {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
        }
        
        .glass-effect {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sidebar {
            background: linear-gradient(180deg, #000000 0%, #1a1a1a 100%);
            border-right: 1px solid #333;
            transition: all 0.3s ease;
        }
        
        .sidebar-collapsed {
            width: 80px;
        }
        
        .sidebar-expanded {
            width: 280px;
        }
        
        .menu-item {
            color: #888;
            transition: all 0.3s ease;
            border-radius: 12px;
            margin: 4px 0;
        }
        
        .menu-item:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            transform: translateX(4px);
        }
        
        .menu-item.active {
            background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
            color: #000000;
            font-weight: 600;
        }
        
        .profile-avatar {
            background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
            border: 3px solid #333;
        }
        
        .dark-mode .profile-avatar {
            background: linear-gradient(135deg, #333 0%, #1a1a1a 100%);
            border-color: #555;
        }
        
        .card-shadow {
            box-shadow: 
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .btn-primary {
            background: linear-gradient(135deg, #000 0%, #333 100%);
            border: 2px solid #fff;
            color: #fff;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .btn-primary:hover::before {
            left: 100%;
        }
        
        .btn-primary:hover {
            background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
            color: #000;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .btn-secondary {
            background: transparent;
            border: 2px solid #333;
            color: #333;
            transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
            background: #333;
            color: #fff;
            transform: translateY(-1px);
        }
        
        .input-field {
            background: #fff;
            border: 2px solid #e5e5e5;
            color: #000;
            transition: all 0.3s ease;
        }
        
        .input-field:focus {
            border-color: #000;
            box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
            outline: none;
        }
        
        .card {
            background: #fff;
            border: 1px solid #e5e5e5;
            transition: all 0.3s ease;
        }
        
        .card:hover {
            border-color: #000;
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }
        
        .progress-bar {
            background: linear-gradient(90deg, #000 0%, #666 100%);
            transition: width 0.5s ease;
        }
        
        .step-indicator {
            background: #f5f5f5;
            color: #666;
            border: 2px solid #e5e5e5;
            transition: all 0.3s ease;
        }
        
        .step-indicator.active {
            background: #000;
            color: #fff;
            border-color: #000;
        }
        
        .step-indicator.completed {
            background: #fff;
            color: #000;
            border-color: #000;
        }
        
        .skill-tag {
            background: #f8f8f8;
            border: 2px solid #e5e5e5;
            color: #333;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .skill-tag:hover {
            border-color: #000;
            background: #000;
            color: #fff;
        }
        
        .skill-tag.selected {
            background: #000;
            color: #fff;
            border-color: #000;
        }
        
        .tab-btn {
            color: #666;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
        }
        
        .tab-btn.active {
            color: #000;
            border-bottom-color: #000;
        }
        
        .tab-btn:hover {
            color: #333;
        }
        
        .notification {
            background: #000;
            color: #fff;
            border: 2px solid #333;
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .fade-in {
            animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .slide-up {
            animation: slideUp 0.6s ease-out;
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .logo-text {
            font-weight: 900;
            letter-spacing: -0.05em;
            background: linear-gradient(135deg, #000 0%, #666 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero-pattern {
            background-image: 
                radial-gradient(circle at 25% 25%, rgba(0,0,0,0.05) 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, rgba(0,0,0,0.05) 2px, transparent 2px);
            background-size: 50px 50px;
        }
        
        .loading-dots::after {
            content: '';
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { content: ''; }
            25% { content: '.'; }
            50% { content: '..'; }
            75% { content: '...'; }
            100% { content: ''; }
        }
        
        .border-pattern {
            border-image: linear-gradient(45deg, #000, #666, #000) 1;
        }
        
        .text-gradient {
            background: linear-gradient(135deg, #000 0%, #666 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .shortlisted {
            border: 2px solid #ef4444;
            background: rgba(239, 68, 68, 0.05);
        }
    </style>
  <style>@view-transition { navigation: auto; }</style>
 </head>
 <body class="min-h-full bg-white text-black">
  <div id="app" class="min-h-full"><!-- S-01 Splash Screen -->
   <div id="splash-screen" class="min-h-full flex items-center justify-center bg-white hero-pattern">
    <div class="text-center max-w-4xl px-4">
     <div class="mb-16 fade-in">
      <div class="mb-8">
       <h1 class="text-8xl md:text-9xl font-black mb-4 logo-text">IJOP</h1>
       <div class="w-32 h-1 bg-black mx-auto mb-8"></div>
       <p class="text-2xl md:text-3xl font-light text-gray-600 mb-4">International Job Opportunity Platform</p>
       <p class="text-lg text-gray-500">Connecting global talent with worldwide opportunities</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 mb-12 text-left">
       <div class="slide-up" style="animation-delay: 0.2s;">
        <div class="text-4xl font-bold mb-2">
         50K+
        </div>
        <div class="text-gray-600">
         Active Jobs
        </div>
       </div>
       <div class="slide-up" style="animation-delay: 0.4s;">
        <div class="text-4xl font-bold mb-2">
         120+
        </div>
        <div class="text-gray-600">
         Countries
        </div>
       </div>
       <div class="slide-up" style="animation-delay: 0.6s;">
        <div class="text-4xl font-bold mb-2">
         1M+
        </div>
        <div class="text-gray-600">
         Professionals
        </div>
       </div>
      </div>
     </div>
     <div class="flex flex-col md:flex-row gap-6 justify-center slide-up" style="animation-delay: 0.8s;"><button id="start-btn" class="btn-primary px-12 py-4 text-lg font-semibold"> Get Started </button> <button class="btn-secondary px-12 py-4 text-lg font-semibold"> Learn More </button>
     </div>
    </div>
   </div><!-- S-03 Role Selection -->
   <div id="role-selection" class="hidden min-h-full flex items-center justify-center px-4 bg-gray-50 geometric-pattern">
    <div class="max-w-6xl w-full">
     <div class="text-center mb-16">
      <h2 class="text-5xl md:text-6xl font-black mb-6 text-gradient">Choose Your Path</h2>
      <p class="text-xl text-gray-600">Select how you want to use IJOP</p>
     </div>
     <div class="grid md:grid-cols-2 gap-12"><!-- Candidate Card --> <button id="select-candidate" class="group card p-12 text-left card-shadow">
       <div class="mb-8">
        <div class="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
         👤
        </div>
        <h3 class="text-3xl font-bold mb-4">I'm Looking for a Job</h3>
        <p class="text-gray-600 text-lg leading-relaxed">Create your professional profile and get discovered by top employers worldwide. Access thousands of international job opportunities.</p>
       </div>
       <div class="space-y-3 mb-8">
        <div class="flex items-center text-gray-700"><span class="w-2 h-2 bg-black mr-3"></span> Build professional profile
        </div>
        <div class="flex items-center text-gray-700"><span class="w-2 h-2 bg-black mr-3"></span> Get matched with jobs
        </div>
        <div class="flex items-center text-gray-700"><span class="w-2 h-2 bg-black mr-3"></span> Apply to global companies
        </div>
       </div>
       <div class="text-lg font-semibold group-hover:text-black transition-colors">
        Start Your Career Journey →
       </div></button> <!-- Employer Card --> <button id="select-employer" class="group card p-12 text-left card-shadow">
       <div class="mb-8">
        <div class="w-16 h-16 bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-white group-hover:text-black transition-all duration-300">
         🏢
        </div>
        <h3 class="text-3xl font-bold mb-4">I'm Hiring Talent</h3>
        <p class="text-gray-600 text-lg leading-relaxed">Access our global talent pool and find the perfect candidates for your company. Post jobs and connect with qualified professionals.</p>
       </div>
       <div class="space-y-3 mb-8">
        <div class="flex items-center text-gray-700"><span class="w-2 h-2 bg-black mr-3"></span> Post job opportunities
        </div>
        <div class="flex items-center text-gray-700"><span class="w-2 h-2 bg-black mr-3"></span> Search global talent
        </div>
        <div class="flex items-center text-gray-700"><span class="w-2 h-2 bg-black mr-3"></span> Manage applications
        </div>
       </div>
       <div class="text-lg font-semibold group-hover:text-black transition-colors">
        Find Great Talent →
       </div></button>
     </div>
    </div>
   </div><!-- S-04 Simple Registration -->
   <div id="auth-screen" class="hidden min-h-full flex items-center justify-center px-4 bg-white diagonal-lines">
    <div class="max-w-md w-full">
     <div class="text-center mb-12">
      <h2 class="text-4xl font-bold mb-4 text-gradient">Join IJOP</h2>
      <p class="text-gray-600">Create your account to get started</p>
     </div>
     <form id="auth-form" class="card p-8 card-shadow space-y-6">
      <div><label for="auth-name" class="block text-sm font-semibold mb-2 text-gray-700"> Full Name </label> <input type="text" id="auth-name" required class="w-full px-4 py-3 input-field text-lg" placeholder="Enter your full name">
      </div>
      <div><label for="auth-email" class="block text-sm font-semibold mb-2 text-gray-700"> Email Address </label> <input type="email" id="auth-email" required class="w-full px-4 py-3 input-field text-lg" placeholder="Enter your email">
      </div>
      <div><label for="auth-phone" class="block text-sm font-semibold mb-2 text-gray-700"> Phone Number </label> <input type="tel" id="auth-phone" required class="w-full px-4 py-3 input-field text-lg" placeholder="Enter your phone number">
      </div><button type="submit" id="create-account-btn" class="w-full btn-primary py-4 text-lg font-semibold"> Create Account </button>
     </form>
     <div class="text-center mt-6">
      <p class="text-sm text-gray-500">By creating an account, you agree to our Terms of Service and Privacy Policy</p>
     </div>
    </div>
   </div><!-- C-03 Profile Creation -->
   <div id="profile-wizard" class="hidden min-h-full bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-8"><!-- Progress Header -->
     <div class="mb-12">
      <div class="flex items-center justify-between mb-6">
       <div>
        <h2 class="text-4xl font-bold text-gradient">Complete Your Profile</h2>
        <p class="text-gray-600">Help us match you with the perfect opportunities</p>
       </div>
       <div class="text-right">
        <div class="text-sm text-gray-500 mb-1">
         Step
        </div>
        <div class="text-2xl font-bold"><span id="current-step">1</span>/<span id="total-steps">4</span>
        </div>
       </div>
      </div>
      <div class="w-full bg-gray-200 h-3 mb-6">
       <div id="progress-bar" class="progress-bar h-3" style="width: 25%"></div>
      </div>
      <div class="flex justify-between">
       <div class="step-indicator px-4 py-2 text-sm font-medium">
        Personal
       </div>
       <div class="step-indicator px-4 py-2 text-sm font-medium">
        Experience
       </div>
       <div class="step-indicator px-4 py-2 text-sm font-medium">
        Skills
       </div>
       <div class="step-indicator px-4 py-2 text-sm font-medium">
        Preferences
       </div>
      </div>
     </div><!-- Step Content -->
     <div class="card p-8 card-shadow"><!-- Step 1: Personal Info -->
      <div id="step-personal" class="wizard-step">
       <h3 class="text-3xl font-bold mb-8 text-gradient">Personal Information</h3>
       <p class="text-gray-600 mb-4">Let employers know you’re a skilled professional open to global opportunities.</p>
       <div class="grid md:grid-cols-2 gap-6">
        <div><label for="nationality" class="block text-sm font-semibold mb-2 text-gray-700"> Nationality </label> <select id="nationality" class="w-full px-4 py-3 input-field"> <option value="">Select your nationality</option> <option value="India">India</option> <option value="Pakistan">Pakistan</option> <option value="Bangladesh">Bangladesh</option> <option value="Philippines">Philippines</option> <option value="Nigeria">Nigeria</option> <option value="Egypt">Egypt</option> <option value="Mexico">Mexico</option> <option value="Brazil">Brazil</option> <option value="Ukraine">Ukraine</option> <option value="Poland">Poland</option> <option value="Romania">Romania</option> <option value="Other">Other</option> </select>
        </div>
        <div><label for="current-location" class="block text-sm font-semibold mb-2 text-gray-700"> Current Location </label> <input type="text" id="current-location" class="w-full px-4 py-3 input-field" placeholder="City, Country">
        </div>
       </div>
      </div><!-- Step 2: Experience -->
      <div id="step-experience" class="wizard-step hidden">
       <h3 class="text-3xl font-bold mb-8 text-gradient">Professional Experience</h3>
       <p class="text-gray-600 mb-4">Show your real skills and achievements — degrees are optional, your talent speaks louder.</p>
       <div class="space-y-6">
        <div><label for="experience-level" class="block text-sm font-semibold mb-2 text-gray-700"> Experience Level </label> <select id="experience-level" class="w-full px-4 py-3 input-field"> <option value="">Select your experience level</option> <option value="Entry Level">Entry Level (0-2 years)</option> <option value="Mid Level">Mid Level (3-5 years)</option> <option value="Senior Level">Senior Level (6-10 years)</option> <option value="Executive">Executive (10+ years)</option> </select>
        </div>
        <div><label for="current-role" class="block text-sm font-semibold mb-2 text-gray-700"> Current/Most Recent Role </label> <input type="text" id="current-role" class="w-full px-4 py-3 input-field" placeholder="e.g., Software Engineer, Marketing Manager">
        </div>
        <div><label for="industry" class="block text-sm font-semibold mb-2 text-gray-700"> Industry </label> <select id="industry" class="w-full px-4 py-3 input-field"> <option value="">Select your industry</option> <option value="Technology">Technology</option> <option value="Finance">Finance</option> <option value="Healthcare">Healthcare</option> <option value="Education">Education</option> <option value="Marketing">Marketing</option> <option value="Sales">Sales</option> <option value="Engineering">Engineering</option> <option value="Design">Design</option> <option value="Other">Other</option> </select>
        </div>
       </div>
      </div><!-- Step 3: Skills -->
      <div id="step-skills" class="wizard-step hidden">
       <h3 class="text-3xl font-bold mb-8 text-gradient">Skills &amp; Expertise</h3>
       <div class="space-y-8">
        <div><label class="block text-sm font-semibold mb-4 text-gray-700"> Select your key skills (choose up to 10) </label>
         <div class="grid grid-cols-2 md:grid-cols-3 gap-3" id="skills-grid"><label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="JavaScript" class="mr-3"> JavaScript </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Python" class="mr-3"> Python </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Java" class="mr-3"> Java </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="React" class="mr-3"> React </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Node.js" class="mr-3"> Node.js </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="SQL" class="mr-3"> SQL </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Project Management" class="mr-3"> Project Management </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Digital Marketing" class="mr-3"> Digital Marketing </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Data Analysis" class="mr-3"> Data Analysis </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="UI/UX Design" class="mr-3"> UI/UX Design </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Sales" class="mr-3"> Sales </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Customer Service" class="mr-3"> Customer Service </label>
         </div>
        </div>
        <div><label for="additional-skills" class="block text-sm font-semibold mb-2 text-gray-700"> Additional Skills (Optional) </label> <textarea id="additional-skills" rows="3" class="w-full px-4 py-3 input-field" placeholder="List any other relevant skills or certifications..."></textarea>
        </div>
       </div>
      </div><!-- Step 4: Preferences -->
      <div id="step-preferences" class="wizard-step hidden">
       <h3 class="text-3xl font-bold mb-8 text-gradient">Job Preferences</h3>
       <p class="text-gray-600 mb-4">Highlight your global ambitions — choose options that fit your international career goals.</p>
       <div class="space-y-6">
        <div><label for="salary-expectation" class="block text-sm font-semibold mb-2 text-gray-700"> Salary Expectation (Annual, USD) </label> <select id="salary-expectation" class="w-full px-4 py-3 input-field"> <option value="">Select salary range</option> <option value="Under $30,000">Under $30,000</option> <option value="$30,000 - $50,000">$30,000 - $50,000</option> <option value="$50,000 - $75,000">$50,000 - $75,000</option> <option value="$75,000 - $100,000">$75,000 - $100,000</option> <option value="$100,000 - $150,000">$100,000 - $150,000</option> <option value="Over $150,000">Over $150,000</option> </select>
        </div>
        <div><label for="availability" class="block text-sm font-semibold mb-2 text-gray-700"> Availability </label> <select id="availability" class="w-full px-4 py-3 input-field"> <option value="Immediate">Available Immediately</option> <option value="2 weeks">2 weeks notice</option> <option value="1 month">1 month notice</option> <option value="2-3 months">2-3 months notice</option> </select>
        <div><label class="block text-sm font-semibold mb-2 text-gray-700">Work Abroad Preferences</label>
         <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label class="skill-tag px-4 py-3 flex items-center"><input type="checkbox" class="mr-3"> Open to international relocation</label>
          <label class="skill-tag px-4 py-3 flex items-center"><input type="checkbox" class="mr-3"> Need visa sponsorship</label>
          <label class="skill-tag px-4 py-3 flex items-center"><input type="checkbox" class="mr-3"> Open to remote international jobs</label>
         </div>
        </div>
        </div>
        <div><label class="block text-sm font-semibold mb-4 text-gray-700"> Preferred Work Type </label>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-3"><label class="skill-tag px-4 py-3 flex items-center"> <input type="radio" name="work-type" value="Remote" class="mr-3"> Remote </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="radio" name="work-type" value="Hybrid" class="mr-3"> Hybrid </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="radio" name="work-type" value="On-site" class="mr-3"> On-site </label>
         </div>
        </div>
       </div>
      </div>
     </div><!-- Navigation -->
     <div class="flex justify-between mt-8"><button id="prev-step-btn" class="btn-secondary px-8 py-3 font-semibold hidden"> Previous </button>
      <div class="flex-1"></div><button id="next-step-btn" class="btn-primary px-8 py-3 font-semibold"> Next Step </button> <button id="complete-profile-btn" class="btn-primary px-8 py-3 font-semibold hidden"> Complete Profile </button>
     </div>
    </div>
   </div><!-- C-01 Dashboard -->
   <div id="dashboard" class="hidden min-h-full bg-white flex"><!-- Sidebar -->
    <div id="sidebar" class="sidebar sidebar-expanded fixed left-0 top-0 h-full z-40 flex flex-col"><!-- Logo & Toggle -->
     <div class="p-6 border-b border-gray-800">
      <div class="flex items-center justify-between">
       <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-white text-black flex items-center justify-center font-black text-lg">
         IJ
        </div><span id="sidebar-logo-text" class="text-white font-bold text-xl">IJOP</span>
       </div><button id="sidebar-toggle" class="text-gray-400 hover:text-white p-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg></button>
      </div>
     </div><!-- Profile Section -->
     <div class="p-6 border-b border-gray-800">
      <div class="flex items-center space-x-3">
       <div class="profile-avatar w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg"><span id="user-initials">U</span>
       </div>
       <div id="sidebar-profile-info" class="flex-1 min-w-0">
        <div class="text-white font-semibold truncate" id="sidebar-user-name">
         User
        </div>
        <div class="text-gray-400 text-sm" id="sidebar-user-role">
         Candidate
        </div>
       </div>
      </div>
     </div><!-- Navigation Menu -->
     <nav class="flex-1 p-4 space-y-2">
      <div id="sidebar-menu-items"><!-- Candidate Menu -->
       <div id="candidate-menu" class="space-y-2"><button class="menu-item active w-full flex items-center px-4 py-3 text-left" data-page="overview">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
         </svg><span class="sidebar-text">Dashboard</span> </button> <button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="jobs">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V6"></path>
         </svg><span class="sidebar-text">Job Matches</span> </button> <button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="applications">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
         </svg><span class="sidebar-text">Applications</span> </button> <button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="interviews">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-9 0a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2H9z"></path>
         </svg><span class="sidebar-text">Interviews</span> </button> <button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="messages">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
         </svg><span class="sidebar-text">Messages</span> </button> <button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="profile">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
         </svg><span class="sidebar-text">Profile</span> </button>
       </div><!-- HR Menu (Hidden by default) -->
       <div id="hr-menu" class="space-y-2 hidden"><button class="menu-item active w-full flex items-center px-4 py-3 text-left" data-page="hr-overview">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z"></path>
         </svg><span class="sidebar-text">Dashboard</span> </button> <button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="post-jobs">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
         </svg><span class="sidebar-text">Post Jobs</span> </button> <button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="candidates">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
         </svg><span class="sidebar-text">Candidates</span> </button> <button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="hr-applications">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
         </svg><span class="sidebar-text">Applications</span> </button> <button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="hr-analytics">
         <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2V7a2 2 0 012-2h2a2 2 0 002 2v2a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 00-2 2h-2a2 2 0 00-2 2v6a2 2 0 01-2 2H9z"></path>
         </svg><span class="sidebar-text">Analytics</span> </button>
       </div>
      </div>
     </nav><!-- Bottom Menu -->
     <div class="p-4 border-t border-gray-800 space-y-2"><button class="menu-item w-full flex items-center px-4 py-3 text-left" data-page="settings">
       <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
       </svg><span class="sidebar-text">Settings</span> </button> <button id="logout-btn" class="menu-item w-full flex items-center px-4 py-3 text-left text-red-400 hover:text-red-300">
       <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
       </svg><span class="sidebar-text">Logout</span> </button>
     </div>
    </div><!-- Main Content -->
    <div class="flex-1 ml-80" id="main-content"><!-- Top Header -->
     <div class="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-4">
       <h1 class="text-2xl font-bold text-gray-900" id="page-title">Dashboard</h1>
       <div class="flex items-center space-x-2"><span class="text-sm text-gray-500">•</span> <span class="text-sm text-gray-600" id="page-subtitle">Overview</span>
       </div>
      </div>
      <div class="flex items-center space-x-4"><!-- Dark Mode Toggle --> <button id="dark-mode-toggle" class="p-2 text-gray-500 hover:text-gray-700 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg></button> <!-- Notifications --> <button class="p-2 text-gray-500 hover:text-gray-700 relative">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg><span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span> </button> <!-- Profile Dropdown -->
       <div class="relative"><button class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
         <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold"><span id="header-user-initials">U</span>
         </div>
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
         </svg></button>
       </div>
      </div>
     </div><!-- Page Content -->
     <div class="p-8" id="page-content"><!-- Dashboard Overview Page -->
      <div id="overview-page" class="page-content"><!-- Profile Status -->
       <div class="card p-8 mb-8 card-shadow">
        <div class="flex justify-between items-center mb-6">
         <h2 class="text-2xl font-bold">Profile Status</h2>
         <div class="flex items-center gap-4">
          <div id="verification-badge" class="px-4 py-2 bg-gray-100 text-gray-600 font-semibold border-2 border-gray-300 rounded-lg">
           Unverified
          </div>
          <div class="text-sm text-gray-500">
           Status: <span class="font-semibold text-green-600">Active</span>
          </div>
         </div>
        </div>
        <div class="mb-6">
         <div class="flex justify-between items-center mb-3"><span class="text-lg font-semibold text-gray-700">Profile Completeness</span> <span id="completeness-percentage" class="text-lg font-bold">0%</span>
         </div>
         <div class="w-full bg-gray-200 h-3 rounded-full">
          <div id="completeness-bar" class="h-3 progress-bar transition-all duration-500 rounded-full" style="width: 0%"></div>
         </div>
        </div>
        <div id="visibility-status" class="text-gray-600">
         Complete your profile to 70% to become visible to employers
        </div>
       </div><!-- Quick Stats -->
       <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 text-center card-shadow hover:shadow-lg transition-shadow">
         <div class="text-3xl font-bold mb-2 text-gray-900">
          0
         </div>
         <div class="text-gray-600 font-medium">
          Profile Views
         </div>
         <div class="text-xs text-gray-400 mt-1">
          This week
         </div>
        </div>
        <div class="card p-6 text-center card-shadow hover:shadow-lg transition-shadow">
         <div class="text-3xl font-bold mb-2 text-blue-600">
          0
         </div>
         <div class="text-gray-600 font-medium">
          Job Matches
         </div>
         <div class="text-xs text-gray-400 mt-1">
          Available now
         </div>
        </div>
        <div class="card p-6 text-center card-shadow hover:shadow-lg transition-shadow">
         <div class="text-3xl font-bold mb-2 text-green-600">
          0
         </div>
         <div class="text-gray-600 font-medium">
          Applications
         </div>
         <div class="text-xs text-gray-400 mt-1">
          In progress
         </div>
        </div>
        <div class="card p-6 text-center card-shadow hover:shadow-lg transition-shadow">
         <div class="text-3xl font-bold mb-2 text-purple-600">
          0
         </div>
         <div class="text-gray-600 font-medium">
          Interviews
         </div>
         <div class="text-xs text-gray-400 mt-1">
          Scheduled
         </div>
        </div>
       </div><!-- Recent Activity -->
       <div class="grid md:grid-cols-2 gap-8">
        <div class="card p-6 card-shadow">
         <h3 class="text-xl font-bold mb-4">Recent Activity</h3>
         <div class="space-y-4">
          <div class="flex items-center space-x-3 text-gray-500">
           <div class="w-2 h-2 bg-gray-300 rounded-full"></div><span>No recent activity</span>
          </div>
         </div>
        </div>
        <div class="card p-6 card-shadow">
         <h3 class="text-xl font-bold mb-4">Quick Actions</h3>
         <div class="space-y-3"><button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
           <div class="font-medium">
            Complete Profile
           </div>
           <div class="text-sm text-gray-500">
            Add missing information
           </div></button> <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
           <div class="font-medium">
            Browse Jobs
           </div>
           <div class="text-sm text-gray-500">
            Find opportunities
           </div></button> <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
           <div class="font-medium">
            Update Skills
           </div>
           <div class="text-sm text-gray-500">
            Keep profile current
           </div></button>
         </div>
        </div>
       </div>
      </div><!-- HR Overview Page -->
      <div id="hr-overview-page" class="page-content hidden"><!-- Company Stats -->
       <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 text-center card-shadow hover:shadow-lg transition-shadow">
         <div class="text-3xl font-bold mb-2 text-blue-600">
          12
         </div>
         <div class="text-gray-600 font-medium">
          Active Jobs
         </div>
         <div class="text-xs text-gray-400 mt-1">
          Posted this month
         </div>
        </div>
        <div class="card p-6 text-center card-shadow hover:shadow-lg transition-shadow">
         <div class="text-3xl font-bold mb-2 text-green-600">
          248
         </div>
         <div class="text-gray-600 font-medium">
          Applications
         </div>
         <div class="text-xs text-gray-400 mt-1">
          This week
         </div>
        </div>
        <div class="card p-6 text-center card-shadow hover:shadow-lg transition-shadow">
         <div class="text-3xl font-bold mb-2 text-purple-600">
          15
         </div>
         <div class="text-gray-600 font-medium">
          Interviews
         </div>
         <div class="text-xs text-gray-400 mt-1">
          Scheduled
         </div>
        </div>
        <div class="card p-6 text-center card-shadow hover:shadow-lg transition-shadow">
         <div class="text-3xl font-bold mb-2 text-orange-600">
          8
         </div>
         <div class="text-gray-600 font-medium">
          Shortlisted
         </div>
         <div class="text-xs text-gray-400 mt-1">
          Candidates
         </div>
        </div>
       </div><!-- Recent Activity -->
       <div class="grid md:grid-cols-2 gap-8">
        <div class="card p-6 card-shadow">
         <h3 class="text-xl font-bold mb-4">Recent Applications</h3>
         <div class="space-y-4">
          <div class="flex items-center justify-between">
           <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
             SJ
            </div>
            <div>
             <div class="font-medium">
              Sarah Johnson
             </div>
             <div class="text-sm text-gray-500">
              Senior Software Engineer
             </div>
            </div>
           </div>
           <div class="text-sm text-gray-400">
            2 hours ago
           </div>
          </div>
          <div class="flex items-center justify-between">
           <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
             AH
            </div>
            <div>
             <div class="font-medium">
              Ahmed Hassan
             </div>
             <div class="text-sm text-gray-500">
              Digital Marketing Manager
             </div>
            </div>
           </div>
           <div class="text-sm text-gray-400">
            5 hours ago
           </div>
          </div>
         </div>
        </div>
        <div class="card p-6 card-shadow">
         <h3 class="text-xl font-bold mb-4">Quick Actions</h3>
         <div class="space-y-3"><button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
           <div class="font-medium">
            Post New Job
           </div>
           <div class="text-sm text-gray-500">
            Create job listing
           </div></button> <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
           <div class="font-medium">
            Review Applications
           </div>
           <div class="text-sm text-gray-500">
            Check pending applications
           </div></button> <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
           <div class="font-medium">
            Browse Candidates
           </div>
           <div class="text-sm text-gray-500">
            Find talent
           </div></button>
         </div>
        </div>
       </div>
      </div><!-- Candidates Page -->
      <div id="candidates-page" class="page-content hidden"><!-- Search and Filters -->
       <div class="card p-6 mb-8 card-shadow">
        <div class="flex flex-col lg:flex-row gap-6"><!-- Search Bar -->
         <div class="flex-1">
          <div class="relative"><input type="text" id="candidate-search" placeholder="Search candidates by name, skills, or location..." class="w-full pl-12 pr-4 py-3 input-field text-lg">
           <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
           </svg>
          </div>
         </div><!-- Filter Dropdowns -->
         <div class="flex gap-4"><select id="experience-filter" class="px-4 py-3 input-field"> <option value="">All Experience</option> <option value="Entry Level">Entry Level</option> <option value="Mid Level">Mid Level</option> <option value="Senior Level">Senior Level</option> <option value="Executive">Executive</option> </select> <select id="industry-filter" class="px-4 py-3 input-field"> <option value="">All Industries</option> <option value="Technology">Technology</option> <option value="Finance">Finance</option> <option value="Healthcare">Healthcare</option> <option value="Marketing">Marketing</option> <option value="Sales">Sales</option> <option value="Engineering">Engineering</option> <option value="Design">Design</option> </select> <select id="rating-filter" class="px-4 py-3 input-field"> <option value="">All Ratings</option> <option value="5">5 Stars</option> <option value="4">4+ Stars</option> <option value="3">3+ Stars</option> <option value="2">2+ Stars</option> </select>
         </div>
        </div>
       </div><!-- Candidates Grid -->
       <div id="candidates-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"><!-- Sample Candidates will be populated here -->
       </div><!-- Empty State -->
       <div id="candidates-empty" class="text-center py-16 hidden">
        <div class="text-6xl mb-6">
         🔍
        </div>
        <h3 class="text-3xl font-bold mb-4">No Candidates Found</h3>
        <p class="text-xl text-gray-600">Try adjusting your search filters</p>
       </div>
      </div><!-- Jobs Page -->
      <div id="jobs-page" class="page-content hidden">
       <div class="text-center py-16">
        <div class="text-6xl mb-6">
         🎯
        </div>
        <h3 class="text-3xl font-bold mb-4">No Job Matches Yet</h3>
        <p class="text-xl text-gray-600 mb-8">Complete your profile to start receiving personalized job matches</p><button class="btn-primary px-8 py-4 text-lg font-semibold"> Complete Profile </button>
       </div>
      </div><!-- Applications Page -->
      <div id="applications-page" class="page-content hidden">
       <div class="text-center py-16">
        <div class="text-6xl mb-6">
         📄
        </div>
        <h3 class="text-3xl font-bold mb-4">No Applications Yet</h3>
        <p class="text-xl text-gray-600">Your job applications will appear here</p>
       </div>
      </div><!-- HR Applications Page -->
      <div id="hr-applications-page" class="page-content hidden">
       <div class="text-center py-16">
        <div class="text-6xl mb-6">
         📋
        </div>
        <h3 class="text-3xl font-bold mb-4">Application Management</h3>
        <p class="text-xl text-gray-600">Review and manage job applications here</p>
       </div>
      </div><!-- Post Jobs Page -->
      <div id="post-jobs-page" class="page-content hidden">
       <div class="text-center py-16">
        <div class="text-6xl mb-6">
         📝
        </div>
        <h3 class="text-3xl font-bold mb-4">Post New Job</h3>
        <p class="text-xl text-gray-600">Create and publish job opportunities</p>
       </div>
      </div><!-- HR Analytics Page -->
      <div id="hr-analytics-page" class="page-content hidden">
       <div class="text-center py-16">
        <div class="text-6xl mb-6">
         📊
        </div>
        <h3 class="text-3xl font-bold mb-4">Hiring Analytics</h3>
        <p class="text-xl text-gray-600">View recruitment metrics and insights</p>
       </div>
      </div><!-- Interviews Page -->
      <div id="interviews-page" class="page-content hidden">
       <div class="text-center py-16">
        <div class="text-6xl mb-6">
         🗓️
        </div>
        <h3 class="text-3xl font-bold mb-4">No Interviews Scheduled</h3>
        <p class="text-xl text-gray-600">Your interview schedule will appear here</p>
       </div>
      </div><!-- Messages Page -->
      <div id="messages-page" class="page-content hidden">
       <div class="text-center py-16">
        <div class="text-6xl mb-6">
         💬
        </div>
        <h3 class="text-3xl font-bold mb-4">No Messages</h3>
        <p class="text-xl text-gray-600">Messages from employers will appear here</p>
       </div>
      </div><!-- Profile Page -->
      <div id="profile-page" class="page-content hidden"><!-- Candidate Profile -->
       <div id="candidate-profile" class="max-w-4xl">
        <div class="card p-8 card-shadow">
         <h3 class="text-2xl font-bold mb-6">Edit Profile</h3>
         <div class="grid md:grid-cols-2 gap-6">
          <div><label class="block text-sm font-semibold mb-2 text-gray-700">Full Name</label> <input type="text" class="w-full px-4 py-3 input-field" placeholder="Your full name">
          </div>
          <div><label class="block text-sm font-semibold mb-2 text-gray-700">Email</label> <input type="email" class="w-full px-4 py-3 input-field" placeholder="your.email@example.com">
          </div>
          <div><label class="block text-sm font-semibold mb-2 text-gray-700">Phone</label> <input type="tel" class="w-full px-4 py-3 input-field" placeholder="+1 (555) 123-4567">
          </div>
          <div><label class="block text-sm font-semibold mb-2 text-gray-700">Location</label> <input type="text" class="w-full px-4 py-3 input-field" placeholder="City, Country">
          </div>
         </div>
         <div class="mt-6"><button class="btn-primary px-6 py-3 font-semibold">Save Changes</button>
         </div>
        </div>
       </div><!-- HR Company Profile -->
       <div id="hr-profile" class="max-w-6xl hidden">
        <div class="grid gap-8"><!-- Company Information -->
         <div class="card p-8 card-shadow">
          <h3 class="text-2xl font-bold mb-6">Company Profile</h3>
          <div class="grid md:grid-cols-2 gap-6">
           <div class="md:col-span-2"><label class="block text-sm font-semibold mb-2 text-gray-700">Company Name</label> <input type="text" id="company-name" class="w-full px-4 py-3 input-field" placeholder="Your company name">
           </div>
           <div><label class="block text-sm font-semibold mb-2 text-gray-700">Industry</label> <select id="company-industry" class="w-full px-4 py-3 input-field"> <option value="">Select industry</option> <option value="Technology">Technology</option> <option value="Finance">Finance</option> <option value="Healthcare">Healthcare</option> <option value="Manufacturing">Manufacturing</option> <option value="Retail">Retail</option> <option value="Consulting">Consulting</option> <option value="Education">Education</option> <option value="Other">Other</option> </select>
           </div>
           <div><label class="block text-sm font-semibold mb-2 text-gray-700">Company Size</label> <select id="company-size" class="w-full px-4 py-3 input-field"> <option value="">Select size</option> <option value="1-10">1-10 employees</option> <option value="11-50">11-50 employees</option> <option value="51-200">51-200 employees</option> <option value="201-1000">201-1000 employees</option> <option value="1000+">1000+ employees</option> </select>
           </div>
           <div><label class="block text-sm font-semibold mb-2 text-gray-700">Founded Year</label> <input type="number" id="founded-year" class="w-full px-4 py-3 input-field" placeholder="2020" min="1800" max="2024">
           </div>
           <div><label class="block text-sm font-semibold mb-2 text-gray-700">Headquarters</label> <input type="text" id="headquarters" class="w-full px-4 py-3 input-field" placeholder="City, Country">
           </div>
           <div class="md:col-span-2"><label class="block text-sm font-semibold mb-2 text-gray-700">Company Website</label> <input type="url" id="company-website" class="w-full px-4 py-3 input-field" placeholder="https://www.company.com">
           </div>
           <div class="md:col-span-2"><label class="block text-sm font-semibold mb-2 text-gray-700">Company Description</label> <textarea id="company-description" rows="4" class="w-full px-4 py-3 input-field" placeholder="Describe your company, mission, and values..."></textarea>
           </div>
          </div>
         </div><!-- HR Contact Information -->
         <div class="card p-8 card-shadow">
          <h3 class="text-2xl font-bold mb-6">HR Contact Information</h3>
          <div class="grid md:grid-cols-2 gap-6">
           <div><label class="block text-sm font-semibold mb-2 text-gray-700">HR Manager Name</label> <input type="text" id="hr-name" class="w-full px-4 py-3 input-field" placeholder="Your full name">
           </div>
           <div><label class="block text-sm font-semibold mb-2 text-gray-700">Job Title</label> <input type="text" id="hr-title" class="w-full px-4 py-3 input-field" placeholder="HR Manager, Talent Acquisition, etc.">
           </div>
           <div><label class="block text-sm font-semibold mb-2 text-gray-700">Email</label> <input type="email" id="hr-email" class="w-full px-4 py-3 input-field" placeholder="hr@company.com">
           </div>
           <div><label class="block text-sm font-semibold mb-2 text-gray-700">Phone</label> <input type="tel" id="hr-phone" class="w-full px-4 py-3 input-field" placeholder="+1 (555) 123-4567">
           </div>
          </div>
         </div><!-- Company Benefits & Culture -->
         <div class="card p-8 card-shadow">
          <h3 class="text-2xl font-bold mb-6">Benefits &amp; Company Culture</h3>
          <div class="space-y-6">
           <div><label class="block text-sm font-semibold mb-4 text-gray-700">Company Benefits (Select all that apply)</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3" id="benefits-grid"><label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Health Insurance" class="mr-3"> Health Insurance </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Remote Work" class="mr-3"> Remote Work </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Flexible Hours" class="mr-3"> Flexible Hours </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Paid Time Off" class="mr-3"> Paid Time Off </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="401k Matching" class="mr-3"> 401k Matching </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Professional Development" class="mr-3"> Professional Development </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Stock Options" class="mr-3"> Stock Options </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Gym Membership" class="mr-3"> Gym Membership </label> <label class="skill-tag px-4 py-3 flex items-center"> <input type="checkbox" value="Free Meals" class="mr-3"> Free Meals </label>
            </div>
           </div>
           <div><label class="block text-sm font-semibold mb-2 text-gray-700">Company Culture &amp; Values</label> <textarea id="company-culture" rows="3" class="w-full px-4 py-3 input-field" placeholder="Describe your company culture, work environment, and core values..."></textarea>
           </div>
          </div>
         </div>
         <div class="flex justify-end"><button id="save-company-profile" class="btn-primary px-8 py-3 font-semibold">Save Company Profile</button>
         </div>
        </div>
       </div>
      </div><!-- Settings Page -->
      <div id="settings-page" class="page-content hidden">
       <div class="max-w-4xl">
        <div class="space-y-6"><!-- Account Settings -->
         <div class="card p-6 card-shadow">
          <h3 class="text-xl font-bold mb-4">Account Settings</h3>
          <div class="space-y-4">
           <div class="flex items-center justify-between">
            <div>
             <div class="font-medium">
              Email Notifications
             </div>
             <div class="text-sm text-gray-500">
              Receive job alerts and updates
             </div>
            </div><label class="relative inline-flex items-center cursor-pointer"> <input type="checkbox" class="sr-only peer" checked>
             <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div></label>
           </div>
           <div class="flex items-center justify-between">
            <div>
             <div class="font-medium">
              Profile Visibility
             </div>
             <div class="text-sm text-gray-500">
              Allow employers to find your profile
             </div>
            </div><label class="relative inline-flex items-center cursor-pointer"> <input type="checkbox" class="sr-only peer" checked>
             <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div></label>
           </div>
          </div>
         </div><!-- Privacy Settings -->
         <div class="card p-6 card-shadow">
          <h3 class="text-xl font-bold mb-4">Privacy &amp; Security</h3>
          <div class="space-y-4"><button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="font-medium">
             Change Password
            </div>
            <div class="text-sm text-gray-500">
             Update your account password
            </div></button> <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="font-medium">
             Two-Factor Authentication
            </div>
            <div class="text-sm text-gray-500">
             Add extra security to your account
            </div></button> <button class="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors text-red-600">
            <div class="font-medium">
             Delete Account
            </div>
            <div class="text-sm text-red-400">
             Permanently remove your account
            </div></button>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div><!-- Notification System -->
   <div id="notification-container" class="fixed top-4 right-4 z-50 space-y-3"></div>
  </div>
  <script>
        // Application State
        let currentUser = null;
        let currentStep = 1;
        let totalSteps = 4;
        let profileData = {};
        let isLoading = false;
        let currentUserType = 'candidate';

        const defaultConfig = {
            platform_title: "IJOP",
            welcome_message: "International Job Opportunity Platform",
            login_button_text: "Join IJOP",
            register_button_text: "Get Started"
        };

        // Data SDK Handler
        const dataHandler = {
            onDataChanged(data) {
                console.log('Data updated:', data.length, 'records');
            }
        };

        // Element SDK Implementation
        async function onConfigChange(config) {
            const platformTitle = config.platform_title || defaultConfig.platform_title;
            const welcomeMessage = config.welcome_message || defaultConfig.welcome_message;
            const loginButtonText = config.login_button_text || defaultConfig.login_button_text;
            const registerButtonText = config.register_button_text || defaultConfig.register_button_text;

            // Update elements if they exist
            const titleElements = document.querySelectorAll('.logo-text');
            titleElements.forEach(el => el.textContent = platformTitle);
            
            const messageElements = document.querySelectorAll('[data-welcome-message]');
            messageElements.forEach(el => el.textContent = welcomeMessage);
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["platform_title", config.platform_title || defaultConfig.platform_title],
                ["welcome_message", config.welcome_message || defaultConfig.welcome_message],
                ["login_button_text", config.login_button_text || defaultConfig.login_button_text],
                ["register_button_text", config.register_button_text || defaultConfig.register_button_text]
            ]);
        }

        // Initialize SDKs
        async function initializeApp() {
            try {
                const dataResult = await window.dataSdk.init(dataHandler);
                if (!dataResult.isOk) {
                    console.error("Failed to initialize data SDK");
                    return;
                }

                if (window.elementSdk) {
                    await window.elementSdk.init({
                        defaultConfig,
                        onConfigChange,
                        mapToCapabilities,
                        mapToEditPanelValues
                    });
                }
            } catch (error) {
                console.error("Failed to initialize app:", error);
            }
        }

        // Sample candidate data for HR view
        const sampleCandidates = [
            {
                id: 'c1',
                name: 'Sarah Johnson',
                title: 'Senior Software Engineer',
                location: 'New York, USA',
                experience: 'Senior Level',
                industry: 'Technology',
                skills: ['JavaScript', 'React', 'Node.js', 'Python'],
                rating: 4.8,
                reviews: 12,
                profileCompleteness: 95,
                availability: 'Immediate',
                salaryExpectation: '$100,000 - $150,000',
                isShortlisted: false,
                avatar: 'SJ'
            },
            {
                id: 'c2',
                name: 'Ahmed Hassan',
                title: 'Digital Marketing Manager',
                location: 'Dubai, UAE',
                experience: 'Mid Level',
                industry: 'Marketing',
                skills: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
                rating: 4.6,
                reviews: 8,
                profileCompleteness: 88,
                availability: '2 weeks',
                salaryExpectation: '$50,000 - $75,000',
                isShortlisted: false,
                avatar: 'AH'
            },
            {
                id: 'c3',
                name: 'Maria Rodriguez',
                title: 'UX/UI Designer',
                location: 'Barcelona, Spain',
                experience: 'Mid Level',
                industry: 'Design',
                skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping'],
                rating: 4.9,
                reviews: 15,
                profileCompleteness: 92,
                availability: '1 month',
                salaryExpectation: '$60,000 - $80,000',
                isShortlisted: true,
                avatar: 'MR'
            },
            {
                id: 'c4',
                name: 'David Chen',
                title: 'Data Analyst',
                location: 'Singapore',
                experience: 'Entry Level',
                industry: 'Technology',
                skills: ['Data Analysis', 'SQL', 'Python', 'Tableau'],
                rating: 4.3,
                reviews: 5,
                profileCompleteness: 78,
                availability: 'Immediate',
                salaryExpectation: '$40,000 - $60,000',
                isShortlisted: false,
                avatar: 'DC'
            },
            {
                id: 'c5',
                name: 'Elena Petrov',
                title: 'Financial Analyst',
                location: 'London, UK',
                experience: 'Senior Level',
                industry: 'Finance',
                skills: ['Financial Analysis', 'Excel', 'Risk Management', 'Modeling'],
                rating: 4.7,
                reviews: 10,
                profileCompleteness: 90,
                availability: '2-3 months',
                salaryExpectation: '$80,000 - $120,000',
                isShortlisted: true,
                avatar: 'EP'
            },
            {
                id: 'c6',
                name: 'Raj Patel',
                title: 'Project Manager',
                location: 'Mumbai, India',
                experience: 'Senior Level',
                industry: 'Technology',
                skills: ['Project Management', 'Agile', 'Scrum', 'Leadership'],
                rating: 4.5,
                reviews: 18,
                profileCompleteness: 85,
                availability: '1 month',
                salaryExpectation: '$30,000 - $50,000',
                isShortlisted: false,
                avatar: 'RP'
            }
        ];

        // Screen Navigation
        function showScreen(screenId) {
            const screens = ['splash-screen', 'role-selection', 'auth-screen', 'profile-wizard', 'dashboard'];
            screens.forEach(id => {
                document.getElementById(id).classList.add('hidden');
            });
            document.getElementById(screenId).classList.remove('hidden');
        }

        // Notification System
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = 'notification px-6 py-4 font-semibold shadow-lg';
            notification.textContent = message;
            
            document.getElementById('notification-container').appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 4000);
        }

        // Profile Wizard Functions
        function updateProgress() {
            const progress = (currentStep / totalSteps) * 100;
            document.getElementById('progress-bar').style.width = `${progress}%`;
            document.getElementById('current-step').textContent = currentStep;
            
            // Update step indicators
            const indicators = document.querySelectorAll('.step-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.remove('active', 'completed');
                if (index + 1 < currentStep) {
                    indicator.classList.add('completed');
                } else if (index + 1 === currentStep) {
                    indicator.classList.add('active');
                }
            });
        }

        function showStep(step) {
            document.querySelectorAll('.wizard-step').forEach(el => el.classList.add('hidden'));
            document.getElementById(`step-${getStepName(step)}`).classList.remove('hidden');
            
            // Update navigation buttons
            document.getElementById('prev-step-btn').classList.toggle('hidden', step === 1);
            document.getElementById('next-step-btn').classList.toggle('hidden', step === totalSteps);
            document.getElementById('complete-profile-btn').classList.toggle('hidden', step !== totalSteps);
            
            updateProgress();
        }

        function getStepName(step) {
            const steps = ['personal', 'experience', 'skills', 'preferences'];
            return steps[step - 1];
        }

        function calculateCompleteness() {
            let completed = 0;
            const fields = [
                'nationality', 'current-location', 'experience-level', 
                'current-role', 'industry', 'salary-expectation', 'availability'
            ];
            
            // Check selected skills
            const selectedSkills = document.querySelectorAll('#skills-grid input:checked').length;
            if (selectedSkills > 0) completed++;
            
            // Check work type selection
            const workType = document.querySelector('input[name="work-type"]:checked');
            if (workType) completed++;
            
            fields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field && field.value.trim()) {
                    completed++;
                }
            });
            
            return Math.round((completed / (fields.length + 2)) * 100);
        }

        // Dashboard Functions
        function updateDashboard() {
            if (currentUser) {
                // Update sidebar profile
                document.getElementById('sidebar-user-name').textContent = currentUser.name;
                document.getElementById('sidebar-user-role').textContent = currentUserType === 'candidate' ? 'Candidate' : 'HR Manager';
                
                // Update user initials
                const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
                document.getElementById('user-initials').textContent = initials;
                document.getElementById('header-user-initials').textContent = initials;
                
                const completeness = currentUser.profileCompleteness || 0;
                document.getElementById('completeness-percentage').textContent = `${completeness}%`;
                document.getElementById('completeness-bar').style.width = `${completeness}%`;
                
                const visibilityStatus = document.getElementById('visibility-status');
                if (completeness >= 70) {
                    visibilityStatus.textContent = 'Your profile is now visible to employers!';
                    visibilityStatus.className = 'text-black font-semibold';
                    document.getElementById('verification-badge').textContent = 'Verified';
                    document.getElementById('verification-badge').className = 'px-4 py-2 bg-black text-white font-semibold border-2 border-black rounded-lg';
                } else {
                    visibilityStatus.textContent = `Complete ${70 - completeness}% more to become visible to employers`;
                }
                
                // Show appropriate menu and profile
                if (currentUserType === 'candidate') {
                    document.getElementById('candidate-menu').classList.remove('hidden');
                    document.getElementById('hr-menu').classList.add('hidden');
                    document.getElementById('candidate-profile').classList.remove('hidden');
                    document.getElementById('hr-profile').classList.add('hidden');
                } else {
                    document.getElementById('candidate-menu').classList.add('hidden');
                    document.getElementById('hr-menu').classList.remove('hidden');
                    document.getElementById('candidate-profile').classList.add('hidden');
                    document.getElementById('hr-profile').classList.remove('hidden');
                    loadCandidates();
                }
            }
        }

        // Load and display candidates
        function loadCandidates() {
            const grid = document.getElementById('candidates-grid');
            if (!grid) return;
            
            grid.innerHTML = '';
            
            sampleCandidates.forEach(candidate => {
                const candidateCard = createCandidateCard(candidate);
                grid.appendChild(candidateCard);
            });
        }

        // Create candidate card
        function createCandidateCard(candidate) {
            const card = document.createElement('div');
            card.className = `card p-6 card-shadow hover:shadow-lg transition-all duration-300 ${candidate.isShortlisted ? 'shortlisted' : ''}`;
            card.innerHTML = `
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center font-bold text-lg">
                            ${candidate.avatar}
                        </div>
                        <div>
                            <h3 class="font-bold text-lg">${candidate.name}</h3>
                            <p class="text-gray-600">${candidate.title}</p>
                        </div>
                    </div>
                    <button class="shortlist-btn ${candidate.isShortlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors" 
                            data-candidate-id="${candidate.id}">
                        <svg class="w-6 h-6" fill="${candidate.isShortlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="space-y-3 mb-4">
                    <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        ${candidate.location}
                    </div>
                    
                    <div class="flex items-center text-sm text-gray-600">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a2 2 0 002-2V6"></path>
                        </svg>
                        ${candidate.experience} • ${candidate.industry}
                    </div>
                    
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center">
                            <div class="flex text-yellow-400 mr-2">
                                ${generateStars(candidate.rating)}
                            </div>
                            <span class="text-gray-600">${candidate.rating} (${candidate.reviews} reviews)</span>
                        </div>
                        <div class="text-green-600 font-semibold">${candidate.profileCompleteness}% Complete</div>
                    </div>
                </div>
                
                <div class="mb-4">
                    <div class="flex flex-wrap gap-2">
                        ${candidate.skills.slice(0, 3).map(skill => 
                            `<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">${skill}</span>`
                        ).join('')}
                        ${candidate.skills.length > 3 ? `<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">+${candidate.skills.length - 3} more</span>` : ''}
                    </div>
                </div>
                
                <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>Available: ${candidate.availability}</span>
                    <span>${candidate.salaryExpectation}</span>
                </div>
                
                <div class="flex gap-2">
                    <button class="flex-1 btn-primary py-2 text-sm font-semibold" onclick="viewCandidateProfile('${candidate.id}')">
                        View Profile
                    </button>
                    <button class="flex-1 btn-secondary py-2 text-sm font-semibold" onclick="contactCandidate('${candidate.id}')">
                        Contact
                    </button>
                </div>
                
                <!-- Rating Section -->
                <div class="mt-4 pt-4 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-semibold text-gray-700">Rate this candidate:</span>
                        <div class="flex space-x-1 rating-stars" data-candidate-id="${candidate.id}">
                            ${[1,2,3,4,5].map(star => 
                                `<button class="star-btn text-gray-300 hover:text-yellow-400 transition-colors" data-rating="${star}">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                </button>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            return card;
        }

        // Generate star rating display
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            let stars = '';
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
            }
            
            if (hasHalfStar) {
                stars += '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
            }
            
            return stars;
        }

        // Candidate interaction functions
        function viewCandidateProfile(candidateId) {
            showNotification(`Opening detailed profile for candidate ${candidateId}`, 'info');
        }

        function contactCandidate(candidateId) {
            showNotification(`Sending message to candidate ${candidateId}`, 'info');
        }

        // Filter candidates
        function filterCandidates() {
            const searchTerm = document.getElementById('candidate-search')?.value.toLowerCase() || '';
            const experienceFilter = document.getElementById('experience-filter')?.value || '';
            const industryFilter = document.getElementById('industry-filter')?.value || '';
            const ratingFilter = parseFloat(document.getElementById('rating-filter')?.value) || 0;
            
            const filteredCandidates = sampleCandidates.filter(candidate => {
                const matchesSearch = candidate.name.toLowerCase().includes(searchTerm) ||
                                    candidate.title.toLowerCase().includes(searchTerm) ||
                                    candidate.location.toLowerCase().includes(searchTerm) ||
                                    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm));
                
                const matchesExperience = !experienceFilter || candidate.experience === experienceFilter;
                const matchesIndustry = !industryFilter || candidate.industry === industryFilter;
                const matchesRating = !ratingFilter || candidate.rating >= ratingFilter;
                
                return matchesSearch && matchesExperience && matchesIndustry && matchesRating;
            });
            
            const grid = document.getElementById('candidates-grid');
            const emptyState = document.getElementById('candidates-empty');
            
            if (filteredCandidates.length === 0) {
                grid.classList.add('hidden');
                emptyState.classList.remove('hidden');
            } else {
                grid.classList.remove('hidden');
                emptyState.classList.add('hidden');
                
                grid.innerHTML = '';
                filteredCandidates.forEach(candidate => {
                    const candidateCard = createCandidateCard(candidate);
                    grid.appendChild(candidateCard);
                });
            }
        }

        // Sidebar Functions
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('main-content');
            const sidebarTexts = document.querySelectorAll('.sidebar-text');
            const logoText = document.getElementById('sidebar-logo-text');
            const profileInfo = document.getElementById('sidebar-profile-info');
            
            if (sidebar.classList.contains('sidebar-expanded')) {
                sidebar.classList.remove('sidebar-expanded');
                sidebar.classList.add('sidebar-collapsed');
                mainContent.classList.remove('ml-80');
                mainContent.classList.add('ml-20');
                
                sidebarTexts.forEach(text => text.classList.add('hidden'));
                logoText.classList.add('hidden');
                profileInfo.classList.add('hidden');
            } else {
                sidebar.classList.remove('sidebar-collapsed');
                sidebar.classList.add('sidebar-expanded');
                mainContent.classList.remove('ml-20');
                mainContent.classList.add('ml-80');
                
                sidebarTexts.forEach(text => text.classList.remove('hidden'));
                logoText.classList.remove('hidden');
                profileInfo.classList.remove('hidden');
            }
        }

        // Page Navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.classList.add('hidden');
            });
            
            // Show selected page
            const targetPage = document.getElementById(`${pageId}-page`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
            }
            
            // Update active menu item
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            
            const activeMenuItem = document.querySelector(`[data-page="${pageId}"]`);
            if (activeMenuItem) {
                activeMenuItem.classList.add('active');
            }
            
            // Update page title
            const pageTitles = {
                'overview': 'Dashboard',
                'jobs': 'Job Matches',
                'applications': 'Applications',
                'interviews': 'Interviews',
                'messages': 'Messages',
                'profile': 'Profile',
                'settings': 'Settings',
                'hr-overview': 'HR Dashboard',
                'post-jobs': 'Post Jobs',
                'candidates': 'Candidates',
                'hr-applications': 'Applications',
                'hr-analytics': 'Analytics'
            };
            
            const pageSubtitles = {
                'overview': 'Overview',
                'jobs': 'Find opportunities',
                'applications': 'Track your applications',
                'interviews': 'Manage interviews',
                'messages': 'Communication',
                'profile': 'Edit your information',
                'settings': 'Account preferences',
                'hr-overview': 'Hiring overview',
                'post-jobs': 'Create job listings',
                'candidates': 'Browse talent',
                'hr-applications': 'Review applications',
                'hr-analytics': 'Hiring metrics'
            };
            
            document.getElementById('page-title').textContent = pageTitles[pageId] || 'Dashboard';
            document.getElementById('page-subtitle').textContent = pageSubtitles[pageId] || 'Overview';
        }

        // Dark Mode Functions
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            // Update dark mode icon
            const darkModeBtn = document.getElementById('dark-mode-toggle');
            if (isDark) {
                darkModeBtn.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                `;
            } else {
                darkModeBtn.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                `;
            }
            
            // Save preference
            localStorage.setItem('darkMode', isDark);
        }

        // Event Listeners
        document.getElementById('start-btn').addEventListener('click', () => {
            showScreen('role-selection');
        });

        document.getElementById('select-candidate').addEventListener('click', () => {
            currentUserType = 'candidate';
            showScreen('auth-screen');
        });

        document.getElementById('select-employer').addEventListener('click', () => {
            currentUserType = 'employer';
            showScreen('auth-screen');
        });

        // Auth Form
        document.getElementById('auth-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('auth-name').value;
            const email = document.getElementById('auth-email').value;
            const phone = document.getElementById('auth-phone').value;
            
            if (name && email && phone) {
                showScreen('profile-wizard');
                showStep(1);
                showNotification('Account created successfully! Let\'s complete your profile.', 'success');
            }
        });

        // Profile Wizard Navigation
        document.getElementById('next-step-btn').addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            }
        });

        document.getElementById('prev-step-btn').addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });

        // Complete Profile
        document.getElementById('complete-profile-btn').addEventListener('click', async () => {
            if (isLoading) return;
            
            isLoading = true;
            const btn = document.getElementById('complete-profile-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="loading-dots">Creating Profile</span>';
            btn.disabled = true;

            // Collect all form data
            const selectedSkills = Array.from(document.querySelectorAll('#skills-grid input:checked')).map(cb => cb.value);
            const workType = document.querySelector('input[name="work-type"]:checked')?.value || '';

            const profileData = {
                id: Date.now().toString(),
                userType: currentUserType,
                name: document.getElementById('auth-name').value,
                email: document.getElementById('auth-email').value,
                phone: document.getElementById('auth-phone').value,
                nationality: document.getElementById('nationality').value,
                currentLocation: document.getElementById('current-location').value,
                experience: document.getElementById('experience-level').value,
                currentRole: document.getElementById('current-role').value,
                industry: document.getElementById('industry').value,
                skills: selectedSkills.join(', '),
                additionalSkills: document.getElementById('additional-skills').value,
                salaryExpectation: document.getElementById('salary-expectation').value,
                availability: document.getElementById('availability').value,
                workType: workType,
                profileCompleteness: calculateCompleteness(),
                isVerified: false,
                status: 'active',
                createdAt: new Date().toISOString()
            };

            try {
                const result = await window.dataSdk.create(profileData);
                if (result.isOk) {
                    currentUser = profileData;
                    showScreen('dashboard');
                    updateDashboard();
                    showNotification('Profile created successfully! Welcome to IJOP.', 'success');
                } else {
                    showNotification('Failed to create profile. Please try again.', 'error');
                }
            } catch (error) {
                showNotification('An error occurred. Please try again.', 'error');
            } finally {
                isLoading = false;
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });

        // Sidebar Navigation
        document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);

        // Menu Navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-page]')) {
                const pageId = e.target.closest('[data-page]').dataset.page;
                showPage(pageId);
            }
        });

        // Dark Mode Toggle
        document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

        // Candidate interactions
        document.addEventListener('click', (e) => {
            // Shortlist toggle
            if (e.target.closest('.shortlist-btn')) {
                const btn = e.target.closest('.shortlist-btn');
                const candidateId = btn.dataset.candidateId;
                const candidate = sampleCandidates.find(c => c.id === candidateId);
                
                if (candidate) {
                    candidate.isShortlisted = !candidate.isShortlisted;
                    const card = btn.closest('.card');
                    const heartIcon = btn.querySelector('svg');
                    
                    if (candidate.isShortlisted) {
                        btn.classList.add('text-red-500');
                        btn.classList.remove('text-gray-400');
                        heartIcon.setAttribute('fill', 'currentColor');
                        card.classList.add('shortlisted');
                        showNotification(`${candidate.name} added to shortlist`, 'success');
                    } else {
                        btn.classList.remove('text-red-500');
                        btn.classList.add('text-gray-400');
                        heartIcon.setAttribute('fill', 'none');
                        card.classList.remove('shortlisted');
                        showNotification(`${candidate.name} removed from shortlist`, 'info');
                    }
                }
            }
            
            // Star rating
            if (e.target.closest('.star-btn')) {
                const starBtn = e.target.closest('.star-btn');
                const rating = parseInt(starBtn.dataset.rating);
                const candidateId = starBtn.closest('.rating-stars').dataset.candidateId;
                const candidate = sampleCandidates.find(c => c.id === candidateId);
                
                if (candidate) {
                    // Update visual stars
                    const allStars = starBtn.closest('.rating-stars').querySelectorAll('.star-btn');
                    allStars.forEach((star, index) => {
                        if (index < rating) {
                            star.classList.add('text-yellow-400');
                            star.classList.remove('text-gray-300');
                        } else {
                            star.classList.remove('text-yellow-400');
                            star.classList.add('text-gray-300');
                        }
                    });
                    
                    showNotification(`Rated ${candidate.name} ${rating} stars`, 'success');
                }
            }
        });

        // Search and filter functionality
        document.addEventListener('input', (e) => {
            if (e.target.id === 'candidate-search') {
                filterCandidates();
            }
        });

        document.addEventListener('change', (e) => {
            if (['experience-filter', 'industry-filter', 'rating-filter'].includes(e.target.id)) {
                filterCandidates();
            }
            
            // Skill tag interactions
            if (e.target.type === 'checkbox' && e.target.closest('.skill-tag')) {
                const label = e.target.closest('.skill-tag');
                if (e.target.checked) {
                    label.classList.add('selected');
                } else {
                    label.classList.remove('selected');
                }
            }
            
            if (e.target.type === 'radio' && e.target.closest('.skill-tag')) {
                // Remove selected class from all radio skill tags in the same group
                document.querySelectorAll('input[name="' + e.target.name + '"]').forEach(radio => {
                    radio.closest('.skill-tag').classList.remove('selected');
                });
                // Add selected class to the checked one
                if (e.target.checked) {
                    e.target.closest('.skill-tag').classList.add('selected');
                }
            }
        });

        // Initialize app
        document.addEventListener('DOMContentLoaded', () => {
            // Load dark mode preference
            const savedDarkMode = localStorage.getItem('darkMode');
            if (savedDarkMode === 'true') {
                document.body.classList.add('dark-mode');
                toggleDarkMode(); // This will update the icon
            }
            
            // Initialize default page
            showPage('overview');
        });

        initializeApp();
    </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'995503edd1308a44',t:'MTc2MTU5NzY5OC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>