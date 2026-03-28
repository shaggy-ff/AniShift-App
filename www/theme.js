(function() {
    // 1. Initial Load from LocalStorage
    const savedColor = localStorage.getItem('anishift_accent_color') || '#1e90ff';
    const savedMode = localStorage.getItem('anishift_theme_mode') || 'dark';

    // 2. Apply Theme Instantly (to prevent flash)
    function applyTheme(color, mode) {
        const root = document.documentElement;
        root.style.setProperty('--accent-color', color);
        
        if (mode === 'light') {
            root.classList.add('light-theme');
            root.style.setProperty('--bg-main', '#f8fafc');
            root.style.setProperty('--bg-secondary', '#ffffff');
            root.style.setProperty('--text-light', '#0f172a');
            root.style.setProperty('--text-muted', '#64748b');
            root.style.setProperty('--bg-card', '#ffffff');
            root.style.setProperty('--overlay', 'rgba(255, 255, 255, 0.8)');
            root.style.setProperty('--glass-border', 'rgba(0,0,0,0.08)');
            root.style.setProperty('--slider-bg', '#e2e8f0');
            root.style.setProperty('--hero-gradient', 'linear-gradient(to top, #f8fafc 0%, rgba(248, 250, 252, 0.9) 20%, transparent 60%)');
        } else {
            root.classList.remove('light-theme');
            root.style.setProperty('--bg-main', '#0a0b10');
            root.style.setProperty('--bg-secondary', '#14151e');
            root.style.setProperty('--text-light', '#ffffff');
            root.style.setProperty('--text-muted', '#9ca3af');
            root.style.setProperty('--bg-card', '#11121a');
            root.style.setProperty('--overlay', 'rgba(10, 11, 16, 0.8)');
            root.style.setProperty('--glass-border', 'rgba(255,255,255,0.05)');
            root.style.setProperty('--slider-bg', '#222222');
            root.style.setProperty('--hero-gradient', 'linear-gradient(to top, #0a0b10 0%, rgba(10, 11, 16, 0.8) 20%, transparent 60%)');
        }
    }

    applyTheme(savedColor, savedMode);

    // Expose Global functions
    window.AniShiftTheme = {
        saveColor: function(color) {
            localStorage.setItem('anishift_accent_color', color);
            applyTheme(color, localStorage.getItem('anishift_theme_mode') || 'dark');
        },
        saveMode: function(mode) {
            localStorage.setItem('anishift_theme_mode', mode);
            applyTheme(localStorage.getItem('anishift_accent_color') || '#1e90ff', mode);
        },
        getColor: function() { return localStorage.getItem('anishift_accent_color') || '#1e90ff'; },
        getMode: function() { return localStorage.getItem('anishift_theme_mode') || 'dark'; }
    };
})();
