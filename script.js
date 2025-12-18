// --- CONFIGURATION ---
// ⚠️ IMPORTANT: Replace with your own osu! Client ID!
// Go to https://osu.ppy.sh/home/account/edit#oauth to get it.
const OSU_CLIENT_ID = '46802'; // <-- PASTE YOUR ID HERE
const OSU_USERNAME = 'L0isy';
const MINECRAFT_USERNAME = 'LoisyLoveLife';
// ---------------------

document.addEventListener('DOMContentLoaded', () => {
    fetchOsuData();
    verifyMinecraftSkins();
});

// 4. Function to verify Minecraft skins
function verifyMinecraftSkins() {
    const verifierContainer = document.getElementById('skin-verifier');
    const img1 = document.getElementById('minecraft-skin-1'); // crafatar
    const img2 = document.getElementById('minecraft-skin-2'); // minotar

    const crafatarUrl = `https://crafatar.com/renders/body/${MINECRAFT_USERNAME}?overlay`;
    const minotarUrl = `https://minotar.net/body/${MINECRAFT_USERNAME}`;

    let loadedCount = 0;

    function checkImage(img, url, name) {
        img.onload = () => {
            img.style.display = 'block';
            loadedCount++;
            if (loadedCount === 1) { // Show the first one that works
                verifierContainer.innerHTML = `✅ Skin API <strong>${name}</strong> is working!`;
                verifierContainer.style.color = '#8cff8c';
            }
        };
        img.onerror = () => {
            console.log(`${name} API failed for ${MINECRAFT_USERNAME}`);
        };
        img.src = url;
    }

    checkImage(img1, crafatarUrl, 'crafatar.com');
    checkImage(img2, minotarUrl, 'minotar.net');

    // Set a timeout to show failure message if none load
    setTimeout(() => {
        if (loadedCount === 0) {
            verifierContainer.innerHTML = `❌ Both skin APIs failed to load.<br>Check your IGN and network connection.`;
            verifierContainer.style.color = '#ff6b6b';
        }
    }, 4000); // Wait 4 seconds
}


async function fetchOsuData() {
    const osuDataContainer = document.getElementById('osu-data');

    // Check if API Key is set
    if (OSU_CLIENT_ID === 'YOUR_OSU_CLIENT_ID' || OSU_CLIENT_ID === '') {
        osuDataContainer.innerHTML = `<p class="osu-error">osu! API Key is missing.<br>Please edit script.js and add your Client ID.</p>`;
        return;
    }

    try {
        const response = await fetch(`https://osu.ppy.sh/api/get_user?k=${OSU_CLIENT_ID}&u=${OSU_USERNAME}&type=string`);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}\nCheck if your Client ID is correct.`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('User not found. Check your osu! username.');
        }

        const user = data[0];
        const formatNumber = (num) => new Intl.NumberFormat('en-US').format(Math.round(num));

        osuDataContainer.innerHTML = `
            <div class="osu-stat">
                <span class="label">Player</span>
                <span class="value">${user.username}</span>
            </div>
            <div class="osu-stat">
                <span class="label">Rank</span>
                <span class="value">#${formatNumber(user.pp_rank)}</span>
            </div>
            <div class="osu-stat">
                <span class="label">PP</span>
                <span class="value">${formatNumber(user.pp_raw)}</span>
            </div>
            <div class="osu-stat">
                <span class="label">Accuracy</span>
                <span class="value">${parseFloat(user.accuracy).toFixed(2)}%</span>
            </div>
        `;

    } catch (error) {
        console.error("Failed to fetch osu! data:", error);
        // 3. Improved error message for osu!
        osuDataContainer.innerHTML = `<p class="osu-error">Could not load osu! data.<br>Please check your API Key (Client ID) and console for details.</p>`;
    }
}
