export const translations = {
  // Common
  common: {
    search: 'Search',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    apply: 'Apply Now',
    learnMore: 'Learn More',
    required: 'Required',
    optional: 'Optional',
  },

  // Navigation
  nav: {
    home: 'Home',
    admin: 'Admin',
    dashboard: 'Dashboard',
    logout: 'Logout',
    login: 'Login',
    submitScheme: 'Submit Scheme',
    farmer: 'Farmer',
    student: 'Student',
    health: 'Health',
    women: 'Women',
  },

  // Home Page
  home: {
    hero: {
      title: 'Find Government Schemes You Qualify For',
      subtitle: 'Discover eligible government welfare programs, scholarships, and benefits in India. Get instant eligibility checks and direct links to apply.',
      statsSchemes: 'Active Schemes',
      statsStates: 'States Covered',
      statsFree: 'Free to Use',
    },
    features: {
      title: 'Why Use Govt Scheme Finder?',
      personalized: {
        title: 'Personalized Matching',
        desc: 'Enter your details once and get matched with all schemes you\'re eligible for based on your state, category, and income.',
      },
      verified: {
        title: 'Verified Information',
        desc: 'All schemes include official government sources, required documents, and direct links to apply on official portals.',
      },
      secure: {
        title: 'Secure & Private',
        desc: 'Your information stays private. We don\'t store personal data - all eligibility checks happen locally in your browser.',
      },
    },
    browseByState: 'Browse by State',
    browseByCategory: 'Browse by Category',
    viewAll: 'View All',
    cta: {
      title: 'Know a Scheme We\'re Missing?',
      desc: 'Help other citizens discover government benefits. Submit a scheme you know about and we\'ll verify and add it to our database.',
      button: 'Submit a Scheme',
    },
  },

  // Eligibility Wizard
  wizard: {
    title: 'Find Your Eligible Schemes',
    subtitle: 'Enter your details below to discover government schemes and benefits you qualify for.',
    state: 'State',
    category: 'Category',
    gender: 'Gender',
    age: 'Age',
    income: 'Annual Income (₹)',
    findSchemes: 'Find Eligible Schemes',
    disclaimer: 'Results are based on general eligibility criteria. Final eligibility depends on official government guidelines and document verification.',
    genders: {
      male: 'Male',
      female: 'Female',
      other: 'Other',
    },
  },

  // Results Page
  results: {
    title: 'Eligible Schemes',
    filters: {
      search: 'Search schemes...',
      sort: 'Sort by',
      sortBest: 'Best Match',
      sortName: 'Name',
      tag: 'Filter by tag',
      allTags: 'All Tags',
    },
    noResults: 'No exact matches found. Try adjusting income/category or explore state/category pages.',
  },

  // Scheme Card
  scheme: {
    viewDetails: 'View Details',
    applyNow: 'Apply Now',
    more: 'More',
    allIndia: 'All India',
    income: 'Income',
    documents: 'Required Documents',
    benefits: 'Benefits',
    eligibility: 'Eligibility',
    howToApply: 'How to Apply',
    officialWebsite: 'Official Website',
  },

  // Submit Page
  submit: {
    title: 'Submit a Government Scheme',
    desc: 'Know about a government scheme that should be on our platform? Submit it here and our team will review and publish it if approved.',
    schemeName: 'Scheme Name',
    category: 'Category',
    summary: 'Summary',
    applyLink: 'Official Website / Apply Link',
    benefits: 'Benefits (comma separated)',
    documents: 'Required Documents (comma separated)',
    states: 'Available States (comma separated, leave empty for all India)',
    email: 'Your Email (optional, for notifications)',
    submitButton: 'Submit Scheme',
    success: {
      title: 'Thank You!',
      desc: 'Your scheme submission has been received successfully. Our team will review it and publish it if approved. You\'ll receive a notification once it\'s live.',
      backHome: 'Back to Home',
      submitAnother: 'Submit Another Scheme',
    },
  },

  // Footer
  footer: {
    brand: {
      title: 'Govt Scheme Finder',
      tagline: 'India\'s Scheme Discovery Platform',
      desc: 'Helping citizens discover government welfare schemes, scholarships, and benefits they qualify for. Our mission is to ensure no eligible citizen misses out on government support.',
    },
    quickLinks: 'Quick Links',
    resources: 'Resources',
    disclaimer: 'This website provides guidance and information for educational purposes only. Always verify eligibility criteria and official details on respective government portals before applying.',
    copyright: 'All rights reserved.',
  },

  // Admin
  admin: {
    dashboard: 'Admin Dashboard',
    stats: {
      totalSchemes: 'Total Schemes',
      pendingSubmissions: 'Pending Submissions',
      totalSubmissions: 'Total Submissions',
      categories: 'Categories',
    },
    quickActions: 'Quick Actions',
    addNewScheme: 'Add New Scheme',
    viewSubmissions: 'View Submissions',
    manageSchemes: 'Manage Schemes',
    categoryBreakdown: 'Category Breakdown',
    backToSite: 'Back to Site',

    // Schemes Management
    schemes: {
      title: 'Manage Schemes',
      search: 'Search schemes...',
      allCategories: 'All Categories',
      name: 'Name',
      categoryCol: 'Category',
      states: 'States',
      actions: 'Actions',
      noSchemes: 'No schemes found',
    },

    // Submissions
    submissions: {
      title: 'Submissions',
      pending: 'pending',
      filter: {
        all: 'All',
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
      },
      fields: {
        name: 'Name',
        category: 'Category',
        submitted: 'Submitted',
        reviewed: 'Reviewed',
        link: 'Link',
      },
      actions: {
        approve: 'Approve',
        reject: 'Reject',
      },
    },

    // Scheme Editor
    editor: {
      newTitle: 'Add New Scheme',
      editTitle: 'Edit Scheme',
      basicInfo: 'Basic Information',
      eligibility: 'Eligibility Rules',
      arrays: 'States & Tags',
      publishing: 'Publishing',
      status: {
        published: 'Published',
        draft: 'Draft',
      },
    },
  },

  // Login
  login: {
    title: 'Admin Login',
    subtitle: 'Sign in to access the admin area',
    password: 'Password',
    loginButton: 'Login',
    accessDenied: 'Access Denied',
    accessDeniedDesc: 'Your email is not authorized to access the admin area.',
    contactAdmin: 'Contact the site administrator to request access.',
  },
};

export type TranslationKeys = typeof translations;
