document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo giỏ hàng trong localStorage nếu chưa tồn tại
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Lấy tất cả các thẻ sản phẩm và chuyển đổi thành mảng để sắp xếp
    const productContainer = document.querySelector('.main-content');
    const getProductCards = () => Array.from(document.querySelectorAll('.product-card'));

    // Hàm để lấy giá từ thẻ sản phẩm
    const getPrice = (productCard) => {
        const priceText = productCard.querySelector('div:nth-child(3)').textContent;
        return parseInt(priceText.replace(/[^\d]/g, '')); // Loại bỏ ký tự không phải số và chuyển đổi thành số
    };

    // Hàm sắp xếp sản phẩm
    const sortProducts = (direction) => {
        const productCards = getProductCards();
        
        productCards.sort((a, b) => {
            const priceA = getPrice(a);
            const priceB = getPrice(b);
            
            return direction === 'asc' ? priceA - priceB : priceB - priceA;
        });

        // Xóa và thêm lại các sản phẩm đã sắp xếp
        productContainer.innerHTML = '';
        productCards.forEach(card => productContainer.appendChild(card));
    };

    // Chức năng tìm kiếm
    const searchInput = document.querySelector('.Search input');
    const searchIcon = document.querySelector('.Search i');

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const productCards = getProductCards();

        productCards.forEach(card => {
            const productName = card.querySelector('div:nth-child(2)').textContent.toLowerCase();
            
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Nếu không tìm thấy kết quả, hiển thị thông báo
        const visibleCards = productCards.filter(card => card.style.display !== 'none');
        if (visibleCards.length === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.textContent = 'Không tìm thấy sản phẩm';
            noResultsMessage.style.textAlign = 'center';
            noResultsMessage.style.width = '100%';
            noResultsMessage.style.padding = '20px';
            noResultsMessage.id = 'no-results-message';
            
            // Xóa thông báo không có kết quả nếu đã tồn tại
            const existingMessage = document.getElementById('no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            productContainer.appendChild(noResultsMessage);
        } else {
            // Xóa thông báo không có kết quả nếu có
            const existingMessage = document.getElementById('no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
        }
    };

    // Thêm sự kiện cho tìm kiếm
    searchInput.addEventListener('input', performSearch);
    searchIcon.addEventListener('click', performSearch);

    // Thêm sự kiện cho select sắp xếp
    const sortSelect = document.querySelector('select[name="soft-by-price"]');
    sortSelect.addEventListener('change', (e) => {
        const direction = e.target.value === 'From low to high' ? 'asc' : 'desc';
        sortProducts(direction);
    });

    // Cập nhật các tùy chọn cho select
    sortSelect.innerHTML = `
        <option value="">Chọn sắp xếp</option>
        <option value="From high to low">Từ cao đến thấp</option>
        <option value="From low to high">Từ thấp đến cao</option>
    `;

    // Thêm sự kiện click cho tất cả các nút MUA
    const buyButtons = document.querySelectorAll('.product-card button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.parentElement;
            const product = {
                name: productCard.querySelector('div:nth-child(2)').textContent,
                price: productCard.querySelector('div:nth-child(3)').textContent,
                image: productCard.querySelector('img').src,
                quantity: 1
            };

            // Lấy giỏ hàng hiện tại
            const cart = JSON.parse(localStorage.getItem('cart'));
            
            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingProductIndex = cart.findIndex(item => item.name === product.name);
            
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1; // Nếu có, tăng số lượng
            } else {
                cart.push(product); // Nếu không, thêm sản phẩm mới vào giỏ hàng
            }

            // Lưu giỏ hàng đã cập nhật
            localStorage.setItem('cart', JSON.stringify(cart));
            
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
            window.location.href = 'mycart.html'; // Chuyển hướng đến trang giỏ hàng
        });
    });
});