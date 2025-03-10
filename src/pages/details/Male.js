// Lấy form từ HTML
const form = document.getElementById('myForm');

// Lắng nghe sự kiện submit của form
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form gửi mặc định (reload trang)

    // Lấy giá trị từ các trường input
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Xử lý dữ liệu (ví dụ: hiển thị trên console)
    console.log('Tên:', name);
    console.log('Email:', email);

    // Hiển thị thông báo (tùy chọn)
    alert(`Cảm ơn ${name}! Dữ liệu của bạn đã được gửi. Email: ${email}`);

    // Reset form (tùy chọn)
    form.reset();
});

// Lắng nghe phím Enter trên các trường input
const inputs = form.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của Enter
            form.dispatchEvent(new Event('submit')); // Gửi form khi nhấn Enter
        }
    });
}); 