// Global Ad Click Logic for AniShift
(function() {
    // List of pages to EXCLUDE from tracking
    const excludedPages = ['index.html', 'auth.html', 'add.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (excludedPages.includes(currentPage)) return;

    let adClicks = parseInt(localStorage.getItem('anishift_ad_clicks') || '0');

    function handleGlobalTap() {
        adClicks++;
        localStorage.setItem('anishift_ad_clicks', adClicks);
        if (adClicks >= 10) {
            localStorage.setItem('anishift_ad_clicks', '0');
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
