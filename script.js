document.querySelector('#contact form').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    
    // --- البيانات الجديدة ---
    const token = "8447345113:AAGn2QkiAYq_KGtiLifN255VhUuEuRuGUXM";
    const chat_id = "8391069477"; // تم التعديل لحسابك الشخصي بناءً على الصورة
    // ----------------------
    
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    submitBtn.disabled = true;
    submitBtn.innerText = "جاري الإرسال...";

    const formData = new FormData(this);
    let message = "<b>🏥 حجز موعد جديد (خاص)</b>\n";
    message += "---------------------------------------\n";
    
    formData.forEach((value, key) => {
        // تحسين شكل أسماء الحقول في الرسالة
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
            showSuccessMessage(); 
            this.reset();
        } else {
            // عشان تعرف لو فيه مشكلة ظهرت في الكونسول
            console.error("Telegram Response Error");
            alert("❌ حدث خطأ، تأكد من أنك بدأت المحادثة مع البوت (/start)");
        }
    })
    .catch(error => {
        console.error("Fetch Error:", error);
        alert("❌ فشل الاتصال بالسيرفر.");
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Book An Appointment";
    });
});

// دالة إظهار رسالة النجاح (بدون تغيير)
function showSuccessMessage() {
    const msg = document.createElement('div');
    msg.className = 'success-popup';
    msg.innerHTML = '✅ تم إرسال بيانات الحجز بنجاح!';
    document.body.appendChild(msg);

    setTimeout(() => { 
        msg.classList.add('show'); 
    }, 100);

    setTimeout(() => {
        msg.classList.remove('show'); 
        setTimeout(() => { 
            msg.remove(); 
        }, 500);
    }, 7000); 
}

// كود القائمة المستجيبة (بدون تغيير)
const navbar = document.querySelector(".navbar");
const bars = document.querySelector(".fa-bars");
const xmark = document.querySelector(".fa-xmark");
const humburgerMenu = document.querySelector(".humburger");

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