// mycart.js
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tableBody = document.querySelector('.cart-table tbody');
    const totalCostElement = document.querySelector('.cart-summary div');
    
    function updateCart() {
        // Clear existing table rows
        tableBody.innerHTML = '';
        
        // Calculate total cost
        let totalCost = 0;
        
        // Add cart items to table
        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace(/[^\d]/g, ''));
            const total = price * item.quantity;
            totalCost += total;
            
            const row = document.createElement('tr');
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
            tableBody.appendChild(row);
        });
        
        // Update total cost display
        totalCostElement.textContent = `Total cost of goods: ${totalCost.toLocaleString()} VND`;
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Handle delete buttons
    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });
    
    // Handle complete purchase button
    const completeButton = document.querySelector('.cart-summary .btn');
    completeButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Order placed successfully!');
        localStorage.setItem('cart', JSON.stringify([])); // Clear cart
        updateCart();
    });
    
    // Initial cart render
    updateCart();
});