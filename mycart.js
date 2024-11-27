document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage hoặc khởi tạo mảng rỗng
    const tableBody = document.querySelector('.cart-table tbody'); // Lấy phần thân bảng giỏ hàng
    const totalCostElement = document.querySelector('.cart-summary div'); // Lấy phần tử hiển thị tổng chi phí
    
    function updateCart() {
        // Xóa các hàng trong bảng hiện tại
        tableBody.innerHTML = '';
        
        // Khởi tạo tổng chi phí
        let totalCost = 0;
        
        // Thêm các mục trong giỏ hàng vào bảng
        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace(/[^\d]/g, '')); // Lấy giá và chuyển đổi thành số
            const total = price * item.quantity; // Tính tổng cho sản phẩm
            
            totalCost += total; // Cộng dồn tổng chi phí
            
            const row = document.createElement('tr'); // Tạo hàng mới trong bảng
            row.innerHTML = `
                <td>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
                        <div>${item.name}</div>
                    </div>
                </td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${total.toLocaleString()} VND</td>
                <td><button class="btn delete-btn" data-index="${index}">Delete</button></td>
            `;
            tableBody.appendChild(row); // Thêm hàng vào bảng
        });
        
        // Cập nhật hiển thị tổng chi phí
        totalCostElement.textContent = `Total cost of goods: ${totalCost.toLocaleString()} VND`;
        
        // Lưu giỏ hàng đã cập nhật vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Xử lý sự kiện cho các nút xóa
    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) { // Kiểm tra nếu nút xóa được nhấn
            const index = e.target.dataset.index; // Lấy chỉ số của sản phẩm
            cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
            updateCart(); // Cập nhật giỏ hàng
        }
    });
    
    // Xử lý nút hoàn tất mua hàng
    const completeButton = document.querySelector('.cart-summary .btn'); // Lấy nút hoàn tất
    completeButton.addEventListener('click', () => {
        if (cart.length === 0) { // Kiểm tra nếu giỏ hàng rỗng
            alert('Your cart is empty!'); // Hiển thị thông báo
            return;
        }
        
        alert('Order placed successfully!'); // Hiển thị thông báo đặt hàng thành công
        localStorage.setItem('cart', JSON.stringify([])); // Xóa giỏ hàng
        updateCart(); // Cập nhật giỏ hàng
    });
    
    // Hiển thị giỏ hàng lần đầu
    updateCart();
});