const BACKEND_URL = 'https://bot-beta-gilt.vercel.app'; // ضع رابط Vercel الخاص بك

window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdFromUrl = urlParams.get('userId');
    const status = urlParams.get('status');

    // 1. إذا عاد المستخدم توه من عملية تسجيل الدخول بنجاح
    if (status === 'success' && userIdFromUrl) {
        localStorage.setItem('discord_user_id', userIdFromUrl);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const savedUserId = localStorage.getItem('discord_user_id');

    // 2. التحقق من السيرفر إذا كان الـ ID مسبق الحفظ
    if (savedUserId) {
        try {
            const res = await fetch(`${BACKEND_URL}/check-auth?userId=${savedUserId}`);
            const data = await res.json();

            if (data.joined) {
                // المستخدم مسجل وموجود بالسيرفر فعلاً
                onUserAuthenticated(data.user);
                return;
            }
        } catch (e) {
            console.error('Error checking authentication status:', e);
        }
    }

    // 3. إن لم يكن مسجلاً أو تغيب عن السيرفر
    localStorage.removeItem('discord_user_id');
    showLoginButton();
});

function onUserAuthenticated(user) {
    // إخفاء زر تسجيل الدخول وإظهار رسالة الترحيب أو المحتوى
    const loginBtn = document.getElementById('login-btn'); // عدل الـ ID حسب زر الدخول عندك
    if (loginBtn) loginBtn.style.display = 'none';

    console.log(`Welcome back, ${user.username}!`);
}

function showLoginButton() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.style.display = 'block';
        loginBtn.onclick = () => {
            window.location.href = `${BACKEND_URL}/login`;
        };
    }
}
