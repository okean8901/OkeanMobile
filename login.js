document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-box');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Lấy giá trị input
        const username = form.querySelector('input[name="username"]').value;
        const password = form.querySelector('input[name="password"]').value;

        // Xóa thông báo lỗi cũ
        document.getElementById('username-error').textContent = '';
        document.getElementById('password-error').textContent = '';

        // Lấy danh sách users từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Tìm user trong danh sách
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Lưu thông tin người dùng hiện tại
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect về trang chủ
            window.location.href = 'home.html';
        } else {
            // Hiển thị thông báo lỗi
            showErrorMessages();
        }
    });

    // Hàm hiển thị thông báo lỗi
    function showErrorMessages() {
        document.getElementById('password-error').textContent = 'Sai tài khoản hoặc mật khẩu.';
    }

    // Kiểm tra nếu đã đăng nhập thì chuyển về trang chủ
    function checkAlreadyLoggedIn() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUser = localStorage.getItem('currentUser');
        
        if (isLoggedIn === 'true' && currentUser) {
            window.location.href = 'home.html';
        }
    }

    // Kiểm tra trạng thái đăng nhập khi load trang
    checkAlreadyLoggedIn();
    // Xem danh sách users
console.log(JSON.parse(localStorage.getItem('users')));

// Xem người dùng hiện tại
console.log(JSON.parse(localStorage.getItem('currentUser')));

// Xem trạng thái đăng nhập
console.log(localStorage.getItem('isLoggedIn'));
});
