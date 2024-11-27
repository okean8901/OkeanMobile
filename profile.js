// Hàm để kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Lấy thông tin người dùng hiện tại
    if (!currentUser) {
        window.location.href = 'login.html'; // Nếu không có người dùng, chuyển hướng đến trang đăng nhập
        return false; // Trả về false để chỉ ra rằng chưa đăng nhập
    }
    return true; // Trả về true nếu người dùng đã đăng nhập
}

// Hàm để hiển thị thông tin profile
function displayProfileInfo() {
    if (!checkLoginStatus()) return; // Kiểm tra đăng nhập trước khi hiển thị thông tin

    // Lấy thông tin user từ localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    const profileInfo = document.querySelector('.profile-info'); // Lấy phần tử hiển thị thông tin profile
    const profileDivs = profileInfo.querySelectorAll('div'); // Lấy tất cả các div trong profile-info

    // Hiển thị username ở thẻ h2
    document.querySelector('.client-card h2').textContent = currentUser.username || 'NAME';

    // Hiển thị thông tin trong profile-info
    profileDivs[0].textContent = `Username: ${currentUser.username || ''}`;
    profileDivs[1].textContent = `Email: ${currentUser.email || ''}`;
    profileDivs[2].textContent = `Phone Number: ${currentUser.phone || ''}`;
    profileDivs[3].textContent = `Address: ${currentUser.address || ''}`;

    // Điền thông tin vào form account-info
    const formInputs = document.querySelectorAll('.account-info form .form-group input');
    formInputs[0].value = currentUser.username || ''; // Username/Full Name
    formInputs[1].value = currentUser.email || '';    // Email
    formInputs[2].value = currentUser.phone || '';    // Phone
    formInputs[3].value = currentUser.address || '';  // Address
}

// Hàm để cập nhật thông tin
function updateProfile(event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    // Lấy thông tin hiện tại
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Lấy thông tin mới từ form
    const formInputs = document.querySelectorAll('.account-info form .form-group input');
    const updatedUser = {
        ...currentUser,
        username: formInputs[0].value,
        email: formInputs[1].value,
        phone: formInputs[2].value,
        address: formInputs[3].value
    };

    // Cập nhật trong mảng users
    const users = JSON.parse(localStorage.getItem('users')) || []; // Lấy danh sách người dùng
    const userIndex = users.findIndex(user => user.username === currentUser.username); // Tìm chỉ số người dùng hiện tại
    
    if (userIndex !== -1) {
        users[userIndex] = {...users[userIndex], ...updatedUser}; // Cập nhật thông tin người dùng
        
        // Cập nhật localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Cập nhật hiển thị
        displayProfileInfo(); // Hiển thị lại thông tin profile
        alert('Profile updated successfully!'); // Thông báo cập nhật thành công
    }
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra đăng nhập và hiển thị thông tin
    displayProfileInfo();

    // Thêm event listener cho nút Update
    const updateButton = document.querySelector('.update-info'); // Lấy nút cập nhật
    updateButton.addEventListener('click', updateProfile); // Thêm sự kiện click cho nút cập nhật

    // Xử lý nút Login/Register/Logout
    const navButtons = document.querySelector('.nav-buttons'); // Lấy phần tử chứa nút điều hướng
    
    // Ẩn nút Login và Register nếu đã đăng nhập
    const loginButton = document.querySelector('button[onclick="location.href=\'login.html\'"]');
    const registerButton = document.querySelector('button[onclick="location.href=\'register.html\'"]');
    
    if (checkLoginStatus()) {
        if (loginButton) loginButton.style.display = 'none'; // Ẩn nút đăng nhập
        if (registerButton) registerButton.style.display = 'none'; // Ẩn nút đăng ký
        
        // Thêm nút Logout
        const logoutButton = document.createElement('button'); // Tạo nút đăng xuất
        logoutButton.textContent = 'Logout'; // Đặt nội dung cho nút
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentUser'); // Xóa thông tin người dùng hiện tại
            localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập
            window.location.href = 'login.html'; // Chuyển hướng về trang đăng nhập
        });
        navButtons.appendChild(logoutButton); // Thêm nút đăng xuất vào nav
    }
});