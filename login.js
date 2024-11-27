document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-box');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form (tải lại trang)

        // Lấy giá trị input
        const username = form.querySelector('input[name="username"]').value; // Lấy tên đăng nhập
        const password = form.querySelector('input[name="password"]').value; // Lấy mật khẩu

        // Xóa thông báo lỗi cũ
        document.getElementById('username-error').textContent = ''; // Xóa thông báo lỗi tên đăng nhập
        document.getElementById('password-error').textContent = ''; // Xóa thông báo lỗi mật khẩu

        // Lấy danh sách users từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || []; // Nếu không có người dùng, khởi tạo là mảng rỗng

        // Tìm user trong danh sách
        const user = users.find(u => u.username === username && u.password === password); // Tìm người dùng có tên đăng nhập và mật khẩu khớp

        if (user) {
            // Lưu thông tin người dùng hiện tại
            localStorage.setItem('currentUser', JSON.stringify(user)); // Lưu thông tin người dùng dưới dạng chuỗi JSON
            localStorage.setItem('isLoggedIn', 'true'); // Đánh dấu trạng thái đã đăng nhập

            // Redirect về trang chủ
            window.location.href = 'index.html'; // Chuyển hướng đến trang chủ
        } else {
            // Hiển thị thông báo lỗi
            showErrorMessages(); // Gọi hàm hiển thị thông báo lỗi
        }
    });

    // Hàm hiển thị thông báo lỗi
    function showErrorMessages() {
        document.getElementById('password-error').textContent = 'Sai tài khoản hoặc mật khẩu.'; // Hiển thị thông báo lỗi
    }

    // Kiểm tra nếu đã đăng nhập thì chuyển về trang chủ
    function checkAlreadyLoggedIn() {
        const isLoggedIn = localStorage.getItem('isLoggedIn'); // Lấy trạng thái đăng nhập
        const currentUser = localStorage.getItem('currentUser'); // Lấy thông tin người dùng hiện tại
        
        if (isLoggedIn === 'true' && currentUser) {
            window.location.href = 'index.html'; // Nếu đã đăng nhập, chuyển hướng về trang chủ
        }
    }

    // Kiểm tra trạng thái đăng nhập khi load trang
    checkAlreadyLoggedIn();
    
    // Xem danh sách users
    console.log(JSON.parse(localStorage.getItem('users'))); // In ra danh sách người dùng

    // Xem người dùng hiện tại
    console.log(JSON.parse(localStorage.getItem('currentUser'))); // In ra thông tin người dùng hiện tại

    // Xem trạng thái đăng nhập
    console.log(localStorage.getItem('isLoggedIn')); // In ra trạng thái đăng nhập
});