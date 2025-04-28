// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Login modal
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeLogin = document.getElementById('close-login');
const registerLink = document.getElementById('register-link');

loginBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');
});

closeLogin.addEventListener('click', () => {
    loginModal.classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('hidden');
    document.getElementById('register-modal').classList.remove('hidden');
});

// Register modal
const registerModal = document.getElementById('register-modal');
const closeRegister = document.getElementById('close-register');
const loginLink = document.getElementById('login-link');

closeRegister.addEventListener('click', () => {
    registerModal.classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
});

// Cart functionality
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-10">Seu carrinho está vazio</p>';
        cartSubtotal.textContent = '0 MT';
        return;
    }
    
    let itemsHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        itemsHTML += `
            <div class="flex items-center border-b pb-4">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="ml-4 flex-1">
                    <h4 class="font-medium">${item.name}</h4>
                    <p class="text-sm text-gray-600">${item.price} MT</p>
                </div>
                <div class="flex items-center">
                    <button class="decrease-quantity px-2 py-1 border rounded-l" data-id="${item.id}">-</button>
                    <span class="px-3 py-1 border-t border-b">${item.quantity}</span>
                    <button class="increase-quantity px-2 py-1 border rounded-r" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item ml-4 text-red-500" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    cartSubtotal.textContent = `${subtotal} MT`;
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id == id);
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(item => item.id != id);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id == id);
            item.quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id != id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        });
    });
}

cartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.add('translate-x-full');
    overlay.classList.add('hidden');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.add('translate-x-full');
    loginModal.classList.add('hidden');
    registerModal.classList.add('hidden');
    overlay.classList.add('hidden');
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Show a small notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center';
        notification.innerHTML = `
            <i class="fas fa-check-circle mr-2"></i>
            ${name} adicionado ao carrinho
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
});

// Checkout functionality
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckout = document.getElementById('close-checkout');
const paymentMethods = document.querySelectorAll('input[name="payment"]');
const confirmPaymentBtn = document.getElementById('confirm-payment');
const successModal = document.getElementById('success-modal');
const closeSuccess = document.getElementById('close-success');

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    cartSidebar.classList.add('translate-x-full');
    checkoutModal.classList.remove('hidden');
    
    // Update checkout items
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');
    
    let itemsHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        itemsHTML += `
            <div class="flex justify-between py-2 border-b">
                <div>
                    <h4 class="font-medium">${item.name}</h4>
                    <p class="text-sm text-gray-600">${item.quantity} x ${item.price} MT</p>
                </div>
                <span class="font-medium">${item.price * item.quantity} MT</span>
            </div>
        `;
    });
    
    checkoutItems.innerHTML = itemsHTML;
    checkoutSubtotal.textContent = `${subtotal} MT`;
    checkoutTotal.textContent = `${subtotal + 100} MT`;
});

closeCheckout.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
});

paymentMethods.forEach(method => {
    method.addEventListener('change', (e) => {
        document.getElementById('mpesa-details').classList.add('hidden');
        document.getElementById('visa-details').classList.add('hidden');
        document.getElementById('emola-details').classList.add('hidden');
        
        document.getElementById(`${e.target.value}-details`).classList.remove('hidden');
    });
});

confirmPaymentBtn.addEventListener('click', () => {
    // In a real app, you would process the payment here
    checkoutModal.classList.add('hidden');
    successModal.classList.remove('hidden');
    
    // Clear the cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
});

closeSuccess.addEventListener('click', () => {
    successModal.classList.add('hidden');
    overlay.classList.add('hidden');
});

// Form submissions
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Obrigado pela sua mensagem! Entraremos em contacto em breve.');
    e.target.reset();
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Login realizado com sucesso!');
    loginModal.classList.add('hidden');
    overlay.classList.add('hidden');
    e.target.reset();
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Conta criada com sucesso! Agora você pode fazer login.');
    registerModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
    e.target.reset();
});

// Initialize cart on page load
updateCartCount();