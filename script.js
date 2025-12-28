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

    // 3. الاختفاء بعد 7 ثوانٍ
    setTimeout(() => {
        msg.classList.remove('show'); // بدء حركة الاختفاء
        
        // حذف العنصر نهائياً من الصفحة بعد انتهاء الحركة
        setTimeout(() => { 
            msg.remove(); 
        }, 500);
        
    }, 7000); 
}

// رسبونسف لست

const navbar = document.querySelector(".navbar");
const bars = document.querySelector(".fa-bars");
const xmark = document.querySelector(".fa-xmark");
const humburgerMenu = document.querySelector(".humburger");

// وظيفة الضغط على أيقونة القائمة (فتح/إغلاق)
humburgerMenu.addEventListener("click", () => {
  bars.classList.toggle("active");
  xmark.classList.toggle("active");
  navbar.classList.toggle("active");
});

document.querySelectorAll(".navbar ul li a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        bars.classList.add("active");     
        xmark.classList.remove("active");  
    });
});