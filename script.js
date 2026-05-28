// Load Minecraft skins
document.addEventListener('DOMContentLoaded', () => {
    const accounts = [
        { name: 'LoisyLoveLife', elementId: 'minecraft-skin-image-1', nameElementId: 'minecraft-username-1' },
        { name: 'LoisyNotFound', elementId: 'minecraft-skin-image-2', nameElementId: 'minecraft-username-2' }
    ];

    accounts.forEach(account => {
        const img = document.getElementById(account.elementId);
        if (img) {
            img.src = `https://mc-heads.net/body/${account.name}/128`;
        }
    });
});
