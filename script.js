const BACKEND_URL = 'https://bot-beta-gilt.vercel.app';

// دالة التوجيه المباشر
function loginWithDiscord() {
    window.location.href = `${BACKEND_URL}/login`;
}

document.addEventListener('DOMContentLoaded', async () => {
    const discordBtn = document.getElementById('discord-login-btn');
    const mainContent = document.getElementById('main-content');
    const statusMsg = document.getElementById('status-msg');

    // ربط الزر بحدث الضغط
    if (discordBtn) {
        discordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginWithDiscord();
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = urlParams.get('userId');
    const status = urlParams.get('status');

    // 1. عند العودة بنجاح من تسجيل الدخول
    if (status === 'success' && userIdFromUrl) {
        localStorage.setItem('discord_user_id', userIdFromUrl);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const savedUserId = localStorage.getItem('discord_user_id');

    // 2. التحقق من السيرفر إذا كان الـ ID محفوظاً
    if (savedUserId) {
        try {
            const res = await fetch(`${BACKEND_URL}/check-auth?userId=${savedUserId}`);
            const data = await res.json();

            if (data.joined) {
                if (discordBtn) discordBtn.style.display = 'none';
                if (statusMsg) statusMsg.style.display = 'none';
                if (mainContent) mainContent.classList.remove('hidden');
                return;
            }
        } catch (e) {
            console.error('Error checking auth:', e);
        }
    }

    // 3. إذا لم يكن مسجلاً
    localStorage.removeItem('discord_user_id');
    if (discordBtn) discordBtn.style.display = 'inline-block';
    if (statusMsg) statusMsg.style.display = 'block';
    if (mainContent) mainContent.classList.add('hidden');
});
