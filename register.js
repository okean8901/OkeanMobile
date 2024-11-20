// register.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-box');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Lấy giá trị từ form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phonenumber').value;
        const address = document.getElementById('address').value;
        
        // Kiểm tra xem đã có users array trong localStorage chưa
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Kiểm tra xem username đã tồn tại chưa
        if (users.some(user => user.username === username)) {
            document.getElementById('username-error').textContent = 'Username already exists';
            return;
        }
        
        // Tạo user mới
        const newUser = {
            username,
            password, // Lưu ý: Trong thực tế nên mã hóa mật khẩu
            email,
            phone,
            address
        };
        
        // Thêm user mới vào mảng
        users.push(newUser);
        
        // Lưu lại vào localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Debug: In ra console để kiểm tra
        console.log('Registered users:', users);
        
        // Chuyển hướng đến trang login
        window.location.href = 'login.html';
    });
});

// login.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-box');
    
    // Debug: In ra console để kiểm tra dữ liệu hiện có
    console.log('Current users in localStorage:', JSON.parse(localStorage.getItem('users')));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Lấy giá trị input
        const username = form.querySelector('input[name="username"]').value;
        const password = form.querySelector('input[name="password"]').value;

        // Debug: In ra giá trị đang cố gắng đăng nhập
        console.log('Trying to login with:', { username, password });

        // Xóa thông báo lỗi cũ
        document.getElementById('username-error').textContent = '';
        document.getElementById('password-error').textContent = '';

        // Lấy danh sách users từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Debug: In ra danh sách users
        console.log('Available users:', users);

        // Tìm user trong danh sách
        const user = users.find(u => {
            console.log('Comparing with:', u);
            return u.username === username && u.password === password;
        });

        if (user) {
            // Debug: In ra user tìm thấy
            console.log('Found user:', user);
            
            // Lưu thông tin người dùng hiện tại
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect về trang chủ
            window.location.href = 'home.html';
        } else {
            // Debug: In ra thông báo không tìm thấy
            console.log('No matching user found');
            
            // Hiển thị thông báo lỗi
            showErrorMessages();
        }
    });

    function showErrorMessages() {
        document.getElementById('password-error').textContent = 'Sai tài khoản hoặc mật khẩu.';
    }

    function checkAlreadyLoggedIn() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const currentUser = localStorage.getItem('currentUser');
        
        if (isLoggedIn === 'true' && currentUser) {
            window.location.href = 'home.html';
        }
    }

    checkAlreadyLoggedIn();
});