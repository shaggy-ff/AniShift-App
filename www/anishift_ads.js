// Global Ad Click Logic for AniShift
(function() {
    // List of pages to EXCLUDE from tracking
    const excludedPages = ['index.html', 'auth.html', 'add.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (excludedPages.includes(currentPage)) return;

    let adClicks = parseInt(localStorage.getItem('anishift_ad_clicks') || '0');
    let currentThreshold = parseInt(localStorage.getItem('anishift_ad_thresh') || '10');

    function handleGlobalTap() {
        adClicks++;
        localStorage.setItem('anishift_ad_clicks', adClicks);
        
        if (adClicks >= currentThreshold) {
            // Set next random threshold between 5 and 15 clicks
            adClicks = 0;
            localStorage.setItem('anishift_ad_clicks', '0');
            localStorage.setItem('anishift_ad_thresh', Math.floor(Math.random() * 11) + 5);

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
