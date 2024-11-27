// register.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-box'); // Chọn form đăng ký
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn hành động gửi form mặc định
        
        // Lấy giá trị từ form
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phonenumber').value;
        const address = document.getElementById('address').value;
        
        // Kiểm tra xem đã có users array trong localStorage chưa
        const users = JSON.parse(localStorage.getItem('users')) || []; // Lấy danh sách người dùng hoặc khởi tạo mảng rỗng
        
        // Kiểm tra xem username đã tồn tại chưa
        if (users.some(user => user.username === username)) {
            document.getElementById('username-error').textContent = 'Username already exists'; // Hiển thị thông báo lỗi
            return; // Dừng lại nếu username đã tồn tại
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
        users.push(newUser); // Thêm người dùng mới vào danh sách
        
        // Lưu lại vào localStorage
        localStorage.setItem('users', JSON.stringify(users)); // Cập nhật danh sách người dùng trong localStorage
        
        // Debug: In ra console để kiểm tra
        console.log('Registered users:', users); // In ra danh sách người dùng đã đăng ký
        
        // Chuyển hướng đến trang login
        window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
    });
});

// login.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-box'); // Chọn form đăng nhập
    
    // Debug: In ra console để kiểm tra dữ liệu hiện có
    console.log('Current users in localStorage:', JSON.parse(localStorage.getItem('users'))); // In ra danh sách người dùng hiện có

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn hành động gửi form mặc định

        // Lấy giá trị input
        const username = form.querySelector('input[name="username"]').value;
        const password = form.querySelector('input[name="password"]').value;

        // Debug: In ra giá trị đang cố gắng đăng nhập
        console.log('Trying to login with:', { username, password });

        // Xóa thông báo lỗi cũ
        document.getElementById('username-error').textContent = ''; // Xóa thông báo lỗi username
        document.getElementById('password-error').textContent = ''; // Xóa thông báo lỗi password

        // Lấy danh sách users từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || []; // Lấy danh sách người dùng

        // Debug: In ra danh sách users
        console.log('Available users:', users); // In ra danh sách người dùng có sẵn

        // Tìm user trong danh sách
        const user = users.find(u => {
            console.log('Comparing with:', u); // In ra thông tin người dùng để so sánh
            return u.username === username && u.password === password; // So sánh username và password
        });

        if (user) {
            // Debug: In ra user tìm thấy
            console.log('Found user:', user); // In ra thông tin người dùng đã tìm thấy
            
            // Lưu thông tin người dùng hiện tại
            localStorage.setItem('currentUser', JSON.stringify(user)); // Lưu thông tin người dùng đã đăng nhập
            localStorage.setItem('isLoggedIn', 'true'); // Đánh dấu người dùng đã đăng nhập

            // Redirect về trang chủ
            window.location.href = 'home.html'; // Chuyển hướng đến trang chính
        } else {
            // Debug: In ra thông báo không tìm thấy
            console.log('No matching user found'); // In ra thông báo không tìm thấy người dùng
            
            // Hiển thị thông báo lỗi
            showErrorMessages(); // Gọi hàm hiển thị thông báo lỗi
        }
    });

    function showErrorMessages() {
        document.getElementById('password-error').textContent = 'Sai tài khoản hoặc mật khẩu.'; // Hiển thị thông báo lỗi
    }

    function checkAlreadyLoggedIn() {
        const isLoggedIn = localStorage.getItem('isLoggedIn'); // Kiểm tra xem người dùng đã đăng nhập chưa
        const currentUser = localStorage.getItem('currentUser'); // Lấy thông tin người dùng hiện tại
        
        if (isLoggedIn === 'true' && currentUser) {
            window.location.href = 'home.html'; // Chuyển hướng đến trang chính nếu đã đăng nhập
        }
    }

    checkAlreadyLoggedIn(); // Gọi hàm kiểm tra đăng nhập
});