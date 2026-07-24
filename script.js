const CLIENT_ID = '1529911838882660402';
const SERVER_ID = '1404776250941374475';
const REDIRECT_URI = window.location.origin + window.location.pathname;
const loginBtn = document.getElementById('login-btn');
loginBtn.href = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds+guilds.join`;

const fragment = new URLSearchParams(window.location.hash.slice(1));
const accessToken = fragment.get('access_token');

if (accessToken) {
    loginBtn.style.display = 'none';
    fetch('https://discord.com/api/users/@me/guilds', {
        headers: { authorization: `Bearer ${accessToken}` }
    })
    .then(res => res.json())
    .then(guilds => {
        const isMember = guilds.some(guild => guild.id === SERVER_ID);
        if (isMember) {
            document.getElementById('episodes-section').style.display = 'block';
        } else {
            const errorBox = document.getElementById('error-box');
            errorBox.style.display = 'block';
            errorBox.innerHTML = `
                ❌ عذراً، يجب أن تكون عضواً في سيرفرنا لمشاهدة الحلقات والمحتوى!<br>
                <a href="https://discord.gg/NWmwYCtU9k" class="invite-btn" target="_blank">الانضمام إلى السيرفر الآن</a>
            `;
        }
    })
    .catch(err => console.error(err));
}
