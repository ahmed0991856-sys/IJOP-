// Add this at the top of app.js
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_https://gopurhfutfiagpzgmgdt.supabase.co; // <-- PASTE YOUR URL HERE
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcHVyaGZ1dGZpYWdwemdtZ2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjgwMDQsImV4cCI6MjA3ODgwNDAwNH0.LmiWJL8auNv9xui3578Hic4ypv1Tr8fTGiwhZC4rW40; // <-- PASTE YOUR KEY HERE
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Global variables
let currentUser = null;
let allUsers = [];
let allJobs = [];
let allMessages = [];
let allApplications = [];
let currentChat = null;
let selectedSkills = new Set();

// Default configuration
const defaultConfig = {
    platform_name: "IJOP",
    tagline: "Connecting Skills to Global Opportunities",
    welcome_message: "Find your next international opportunity",
    footer_text: "© 2024 IJOP. All rights reserved."
};

// Data handler for SDK