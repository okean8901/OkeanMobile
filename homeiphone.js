document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart in localStorage if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Get all product cards and convert to array for sorting
    const productContainer = document.querySelector('.main-content');
    const getProductCards = () => Array.from(document.querySelectorAll('.product-card'));

    // Function to extract price from product card
    const getPrice = (productCard) => {
        const priceText = productCard.querySelector('div:nth-child(3)').textContent;
        return parseInt(priceText.replace(/[^\d]/g, '')); // Remove non-digits and convert to number
    };

    // Sorting function
    const sortProducts = (direction) => {
        const productCards = getProductCards();
        
        productCards.sort((a, b) => {
            const priceA = getPrice(a);
            const priceB = getPrice(b);
            
            return direction === 'asc' ? priceA - priceB : priceB - priceA;
        });

        // Clear and re-append sorted products
        productContainer.innerHTML = '';
        productCards.forEach(card => productContainer.appendChild(card));
    };

    // Search functionality
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

        // If no results found, show a message
        const visibleCards = productCards.filter(card => card.style.display !== 'none');
        if (visibleCards.length === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.textContent = 'No products found';
            noResultsMessage.style.textAlign = 'center';
            noResultsMessage.style.width = '100%';
            noResultsMessage.style.padding = '20px';
            noResultsMessage.id = 'no-results-message';
            
            // Remove any existing no results message
            const existingMessage = document.getElementById('no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            productContainer.appendChild(noResultsMessage);
        } else {
            // Remove no results message if it exists
            const existingMessage = document.getElementById('no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
        }
    };

    // Add event listeners for search
    searchInput.addEventListener('input', performSearch);
    searchIcon.addEventListener('click', performSearch);

    // Add event listener to sort select
    const sortSelect = document.querySelector('select[name="soft-by-price"]');
    sortSelect.addEventListener('change', (e) => {
        const direction = e.target.value === 'From low to high' ? 'asc' : 'desc';
        sortProducts(direction);
    });

    // Update select options
    sortSelect.innerHTML = `
        <option value="">Select sorting</option>
        <option value="From high to low">From high to low</option>
        <option value="From low to high">From low to high</option>
    `;

    // Add click event listeners to all BUY buttons
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

            // Get existing cart
            const cart = JSON.parse(localStorage.getItem('cart'));
            
            // Check if product already exists in cart
            const existingProductIndex = cart.findIndex(item => item.name === product.name);
            
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }

            // Save updated cart
            localStorage.setItem('cart', JSON.stringify(cart));
            
            alert('Product added to cart!');
            window.location.href = 'mycart.html';
        });
    });
});