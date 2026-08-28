const BACKEND_URL = 'https://bot-beta-gilt.vercel.app';

document.addEventListener('DOMContentLoaded', async () => {
    const discordBtn = document.getElementById('discord-login-btn');
    const mainContent = document.getElementById('main-content');
    const statusMsg = document.getElementById('status-msg');

    // إعداد زر تسجيل الدخول
    if (discordBtn) {
        discordBtn.onclick = () => {
            window.location.href = `${BACKEND_URL}/login`;
        };
    }

    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = urlParams.get('userId');
    const status = urlParams.get('status');

    // 1. إذا عاد المستخدم من تسجيل الدخول بنجاح
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
            console.error('Error checking authentication status:', e);
        }
    }

    // 3. إذا لم يكن مسجلاً
    localStorage.removeItem('discord_user_id');
    if (discordBtn) discordBtn.style.display = 'inline-block';
    if (statusMsg) statusMsg.style.display = 'block';
    if (mainContent) mainContent.classList.add('hidden');
});
