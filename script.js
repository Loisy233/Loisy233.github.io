// --- CONFIGURATION ---
// ⚠️ IMPORTANT: Replace with your own osu! Client ID!
const OSU_CLIENT_ID = '46802';
const OSU_USERNAME = 'L0isy';
// ---------------------

document.addEventListener('DOMContentLoaded', () => {
    fetchOsuData();
});

async function fetchOsuData() {
    const osuDataContainer = document.getElementById('osu-data');

    try {
        // Using the v1 API which is simpler and doesn't require a secret for public data
        const response = await fetch(`https://osu.ppy.sh/api/get_user?k=${OSU_CLIENT_ID}&u=${OSU_USERNAME}&type=string`);

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('User not found or API key is invalid.');
        }

        const user = data[0];

        // Format numbers for better readability
        const formatNumber = (num) => new Intl.NumberFormat('en-US').format(Math.round(num));

        // Update the HTML with the fetched data
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
        osuDataContainer.innerHTML = `<p class="osu-error">Could not load osu! data.<br>Please check your API Key and console for details.</p>`;
    }
}
