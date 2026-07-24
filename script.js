// ضع رابط سيرفر الـ Backend الخاص بك الذي استضفته على (Render / Railway / Replit)
const BACKEND_URL = 'https://your-backend-domain.com'; 

const loginBtn = document.getElementById('login-btn');
const errorBox = document.getElementById('error-box');
const episodesSection = document.getElementById('episodes-section');

// ربط زر التسجيل برابط اللوجن في السيرفر الخلفي
loginBtn.href = `${BACKEND_URL}/login`;

// قراءة المتغيرات من الرابط بعد العودة من السيرفر
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('status');

if (status === 'success') {
    // تم تسجيل الدخول والإضافة للسيرفر بنجاح
    loginBtn.style.display = 'none';
    episodesSection.style.display = 'block';
} else if (status === 'error') {
    // حدث خطأ أثناء الإضافة
    errorBox.style.display = 'block';
    errorBox.innerHTML = `
        ❌ حدث خطأ أثناء محاولة إضافتك للسيرفر. يرجى المحاولة مرة أخرى أو الانضمام يدوياً.<br>
        <a href="https://discord.gg/NWmwYCtU9k" class="invite-btn" target="_blank">الانضمام المباشر</a>
    `;
}
