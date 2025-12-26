document.querySelector('#contact form').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    
    const token = "8447345113:AAGn2QkiAYq_KGtiLifN255VhUuEuRuGUXM";
    const chat_id = "-1003609645463"; 
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    submitBtn.disabled = true;
    submitBtn.innerText = "جاري الإرسال...";

    const formData = new FormData(this);
    let message = "<b>🏥 حجز موعد جديد</b>\n";
    message += "---------------------------------------\n";
    
    formData.forEach((value, key) => {
        message += `<b>${key}:</b> ${value}\n`;
    });

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chat_id,
            text: message,
            parse_mode: 'HTML'
        })
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage(); // استدعاء رسالة النجاح المنسقة
            this.reset();
        } else {
            alert("❌ حدث خطأ، تأكد من إعدادات البوت.");
        }
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Book An Appointment";
    });
});

// دالة إنشاء وإظهار رسالة النجاح برمجياً
function showSuccessMessage() {
    // 1. إنشاء العنصر
    const msg = document.createElement('div');
    msg.className = 'success-popup';
    msg.innerHTML = '✅ تم إرسال بيانات الحجز بنجاح!';
    document.body.appendChild(msg);

    // 2. إظهار العنصر (تأثير الدخول)
    setTimeout(() => { 
        msg.classList.add('show'); 
    }, 100);

    // 3. الاختفاء بعد 10 ثوانٍ (10000 ملي ثانية)
    setTimeout(() => {
        msg.classList.remove('show'); // بدء حركة الاختفاء
        
        // حذف العنصر نهائياً من الصفحة بعد انتهاء الحركة (نصف ثانية إضافية)
        setTimeout(() => { 
            msg.remove(); 
        }, 500);
        
    }, 7000); // يمكنك تغيير هذا الرقم (مثلاً 15000 لـ 15 ثانية)
}