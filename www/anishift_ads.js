// Global Ad Click Logic for AniShift
(function() {
    // List of pages to EXCLUDE from tracking
    const excludedPages = ['index.html', 'auth.html', 'add.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (excludedPages.includes(currentPage)) return;

    let isPremium = false;
    
    // Check if user is Admin or Subscriber (No Ads)
    const checkPremium = () => {
        const auth = window.firebase ? window.firebase.auth() : null;
        const rtdb = window.firebase ? window.firebase.database() : null;
        
        if (auth && rtdb) {
            auth.onAuthStateChanged(user => {
                if (user && user.email) {
                    const key = user.email.toLowerCase().replace(/\./g, '_at_');
                    // Using once to avoid keeping connection open (Save RTDB limits)
                    rtdb.ref(`access_control/${key}`).on('value', snap => {
                        const data = snap.val();
                        if (data) {
                            const now = Date.now();
                            const currentRole = data.role;
                            // If admin: bypass. If subscriber: check if not expired.
                            if (currentRole === 'admin' || (currentRole === 'subscriber' && data.expiry > now)) {
                                isPremium = true;
                                console.log("Premium Active: Ads Disabled");
                            } else {
                                isPremium = false;
                                console.log("Premium Status Inactive: Ads Enabled");
                            }
                        }
                    });
                }
            });
        }
    };
    checkPremium();

    let adClicks = parseInt(localStorage.getItem('anishift_ad_clicks') || '0');
    let currentThreshold = parseInt(localStorage.getItem('anishift_ad_thresh') || '15');

    function handleGlobalTap() {
        if (isPremium) return; // BYPASS ADS FOR ADMINS/SUBS
        adClicks++;
        localStorage.setItem('anishift_ad_clicks', adClicks);
        
        if (adClicks >= currentThreshold) {
            // Set next random threshold between 10 and 20 clicks
            adClicks = 0;
            localStorage.setItem('anishift_ad_clicks', '0');
            localStorage.setItem('anishift_ad_thresh', Math.floor(Math.random() * 11) + 10);

            const returnTo = encodeURIComponent(window.location.href);
            
            // Calculate path to add.html
            let rootPath = '';
            const path = window.location.pathname;
            
            if (path.includes('/ajx/c.w.d/')) {
                rootPath = '../../../add.html';
            } else if (path.includes('/ajx/profile/')) {
                rootPath = '../../../add.html';
            } else if (path.includes('/anishift.app/')) {
                rootPath = '../add.html';
            } else {
                rootPath = 'add.html';
            }

            window.location.href = rootPath + '?redirect=' + returnTo;
        }
    }

    document.addEventListener('click', handleGlobalTap);
})();
