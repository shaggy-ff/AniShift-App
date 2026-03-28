(function() {
    // 1. Initial Load from LocalStorage
    const savedColor = localStorage.getItem('anishift_accent_color') || '#1e90ff';
    const savedMode = localStorage.getItem('anishift_theme_mode') || 'dark';

    // 2. Apply Theme Instantly (to prevent flash)
    function applyTheme(color, mode) {
        document.documentElement.style.setProperty('--accent-color', color);
        
        if (mode === 'light') {
            document.documentElement.classList.add('light-theme');
            document.documentElement.style.setProperty('--bg-main', '#f8fafc');
            document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
            document.documentElement.style.setProperty('--text-light', '#1e293b');
            document.documentElement.style.setProperty('--text-muted', '#64748b');
            document.documentElement.style.setProperty('--bg-card', '#f1f5f9');
            document.documentElement.style.setProperty('--glass-border', 'rgba(0,0,0,0.05)');
        } else {
            document.documentElement.classList.remove('light-theme');
            document.documentElement.style.setProperty('--bg-main', '#0a0b10');
            document.documentElement.style.setProperty('--bg-secondary', '#14151e');
            document.documentElement.style.setProperty('--text-light', '#ffffff');
            document.documentElement.style.setProperty('--text-muted', '#9ca3af');
            document.documentElement.style.setProperty('--bg-card', '#11121a');
            document.documentElement.style.setProperty('--glass-border', 'rgba(255,255,255,0.05)');
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
