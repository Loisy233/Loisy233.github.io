(function () {
    var isIE = !!document.documentMode; 
    if (isIE) {
        var warningDiv = document.getElementById('browser-warning');
        warningDiv.style.display = 'flex';
    }
})();

function updateMinecraftCards() {
    const mcAccounts = ['LoisyLoveLife', 'LoisyNotFound'];
    const renderTypes = ['default', 'marching', 'walking', 'crossed', 'criss_cross', 'ultimate', 'relaxing', 'trudging', 'pointing', 'lunging', 'cowering', 'dungeons', 'archer', 'kicking', 'mojavatar', 'reading'];

    mcAccounts.forEach((account, index) => {
        const cardIndex = index + 1;
        const randomRender = renderTypes[Math.floor(Math.random() * renderTypes.length)];
        const imageUrl = `https://starlightskins.lunareclipse.studio/render/${randomRender}/${account}/full`;

        const skinImage = document.getElementById(`minecraft-skin-image-${cardIndex}`);
        const usernameH3 = document.getElementById(`minecraft-username-${cardIndex}`);

        if (skinImage) {
            skinImage.src = imageUrl;
        }
        if (usernameH3) {
            usernameH3.textContent = account;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (theme) => {
        body.classList.remove('light-mode', 'dark-mode');
        if (theme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.add('dark-mode');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    themeToggleButton.addEventListener('click', () => {
        const isLight = body.classList.contains('light-mode');
        const newTheme = isLight ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    updateMinecraftCards();
});