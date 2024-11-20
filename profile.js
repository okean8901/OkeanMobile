// Hàm để kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Hàm để hiển thị thông tin profile
function displayProfileInfo() {
    if (!checkLoginStatus()) return;

    // Lấy thông tin user từ localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profileInfo = document.querySelector('.profile-info');
    const profileDivs = profileInfo.querySelectorAll('div');

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
    event.preventDefault();
    
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
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === currentUser.username);
    
    if (userIndex !== -1) {
        users[userIndex] = {...users[userIndex], ...updatedUser};
        
        // Cập nhật localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        // Cập nhật hiển thị
        displayProfileInfo();
        
        alert('Profile updated successfully!');
    }
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra đăng nhập và hiển thị thông tin
    displayProfileInfo();

    // Thêm event listener cho nút Update
    const updateButton = document.querySelector('.update-info');
    updateButton.addEventListener('click', updateProfile);

    // Xử lý nút Login/Register/Logout
    const navButtons = document.querySelector('.nav-buttons');
    
    // Ẩn nút Login và Register nếu đã đăng nhập
    const loginButton = document.querySelector('button[onclick="location.href=\'login.html\'"]');
    const registerButton = document.querySelector('button[onclick="location.href=\'register.html\'"]');
    
    if (checkLoginStatus()) {
        if (loginButton) loginButton.style.display = 'none';
        if (registerButton) registerButton.style.display = 'none';
        
        // Thêm nút Logout
        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
        navButtons.appendChild(logoutButton);
    }
});