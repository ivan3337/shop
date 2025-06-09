
document.addEventListener('DOMContentLoaded', () => {
    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElem = document.getElementById('cart-total');

    let cart = [];

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} ₽ x ${item.quantity}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Удалить';
            removeBtn.style.marginLeft = '10px';
            removeBtn.style.background = '#b39ddb';
            removeBtn.style.color = '#1a0d3a';
            removeBtn.style.border = 'none';
            removeBtn.style.borderRadius = '4px';
            removeBtn.style.cursor = 'pointer';
            removeBtn.style.fontSize = '12px';
            removeBtn.addEventListener('click', () => {
                removeFromCart(item.id);
            });
            li.appendChild(removeBtn);
            cartItemsContainer.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotalElem.textContent = `Итого: ${total} ₽`;
    }

    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        renderCart();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        renderCart();
    }

    cartToggleBtn.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });


    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productElem = e.target.closest('.product-card');
            const id = productElem.getAttribute('data-id');
            const name = productElem.getAttribute('data-name');
            const price = parseInt(productElem.getAttribute('data-price'), 10);
            addToCart(id, name, price);
        });
    });

    // Add event listener for checkout button to redirect to payment page
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = 'payment.html'; // Redirect to payment page
        });
    }

    // Add event listener for pay button in cart sidebar
    const payBtn = document.getElementById('pay-btn');
    if (payBtn) {
        payBtn.addEventListener('click', function() {
            // Extract total amount from cartTotalElem text content
            const totalText = cartTotalElem.textContent;
            // Extract number from string like "Итого: 12345 ₽"
            const totalAmount = totalText.match(/\d+/g)?.join('') || '0';
            // Save total amount to localStorage
            localStorage.setItem('paymentAmount', totalAmount);
            // Redirect to payment page
            window.location.href = 'payment.html';
        });
    }

   
    const filterCheckboxes = document.querySelectorAll('aside input[type="checkbox"][name="type"]');
    const productsContainer = document.querySelector('section.products');
    const productCards = Array.from(document.querySelectorAll('.product-card'));

  
    const sortContainer = document.createElement('div');
    sortContainer.style.margin = '20px 0';
    sortContainer.innerHTML = `
        <label for="sort-price">Сортировка по цене:</label>
        <select id="sort-price" aria-label="Сортировка по цене">
            <option value="none">Без сортировки</option>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
        </select>
    `;
    document.querySelector('aside').appendChild(sortContainer);

    const sortSelect = document.getElementById('sort-price');

    function filterAndSortProducts() {
     
        const selectedTypes = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        
        let filteredProducts = productCards.filter(card => {
            const type = card.getAttribute('data-type');
            if (selectedTypes.length === 0) {
                return true; 
            }
            return selectedTypes.includes(type);
        });

        if (sortSelect.value     === 'asc') {
            filteredProducts.sort((a, b) => {
                return parseInt(a.getAttribute('data-price'), 10) - parseInt(b.getAttribute('data-price'), 10);
            });
        } else if (sortSelect.value === 'desc') {
            filteredProducts.sort((a, b) => {
                return parseInt(b.getAttribute('data-price'), 10) - parseInt(a.getAttribute('data-price'), 10);
            });
        }

        productsContainer.innerHTML = '';
        filteredProducts.forEach(card => {
            productsContainer.appendChild(card);
        });
    }

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterAndSortProducts);
    });

    sortSelect.addEventListener('change', filterAndSortProducts);

 
    filterAndSortProducts();

    renderCart();

    // Add smooth scroll to reviews button
    const reviewsBtn = document.getElementById('reviews-btn');
    const reviewsSection = document.getElementById('footer-reviews');
    if (reviewsBtn && reviewsSection) {
        reviewsBtn.addEventListener('click', () => {
            reviewsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Hardcoded reviews array
    const reviews = [
        { user_name: 'Иван', created_at: '2024-01-10', review_text: 'Отличный магазин, очень доволен покупкой!' },
        { user_name: 'Мария', created_at: '2024-02-15', review_text: 'Большой выбор товаров и быстрая доставка.' },
        { user_name: 'Алексей', created_at: '2024-03-05', review_text: 'Качественное оборудование, рекомендую.' },
        { user_name: 'Елена', created_at: '2024-03-20', review_text: 'Приятное обслуживание и хорошие цены.' },
        { user_name: 'Дмитрий', created_at: '2024-04-01', review_text: 'Очень помогли с выбором, спасибо!' },
        { user_name: 'Ольга', created_at: '2024-04-10', review_text: 'Товары соответствуют описанию, все отлично.' },
        { user_name: 'Сергей', created_at: '2024-04-15', review_text: 'Буду заказывать еще, магазин супер!' },
        { user_name: 'Наталья', created_at: '2024-04-20', review_text: 'Отличное качество и сервис.' }
    ];

    let currentReviewIndex = 0;
    const reviewsDisplay = document.getElementById('reviews-display');

    function showReview(index) {
        if (!reviews || reviews.length === 0) {
            reviewsDisplay.textContent = 'Нет доступных отзывов.';
            return;
        }
        const review = reviews[index];
        reviewsDisplay.style.opacity = 0;
        setTimeout(() => {
            if (reviewsDisplay) {
                reviewsDisplay.textContent = `${review.user_name} (${new Date(review.created_at).toLocaleDateString()}): ${review.review_text}`;
                reviewsDisplay.style.opacity = 1;
            }
        }, 500);
    }

    if (reviewsDisplay) {
        showReview(currentReviewIndex);

        setInterval(() => {
            currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
            showReview(currentReviewIndex);
        }, 5000);
    }

});



    // Review functionality removed as per rollback request
;
