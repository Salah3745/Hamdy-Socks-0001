document.addEventListener('DOMContentLoaded', () => {
    // --- Variables ---
    const languageToggleBtn = document.getElementById('language-toggle');
    const darkModeToggleBtn = document.getElementById('dark-mode-toggle');
    const cartButton = document.getElementById('cart-button'); // Button in header
    const floatingCartButton = document.getElementById('floating-cart-button'); // Floating button
    const cartModal = document.getElementById('cart-modal');
    const closeModalButton = document.getElementById('close-modal');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartItemCountFloating = floatingCartButton ? floatingCartButton.querySelector('.cart-item-count-svg') : null; // Counter for the floating button
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const paymentTriggerBtn = document.querySelector('.payment-trigger-btn'); // Button to switch to delivery form
    const finalCheckoutBtn = document.getElementById('final-checkout-btn'); // The actual submit order button

    // Delivery Form Elements
    const deliveryForm = document.getElementById('delivery-form');
    const paymentFormContainer = document.querySelector('.payment-form-container');
    const cartItemsSection = document.getElementById('cart-items-section'); // Section containing original cart items
    const paymentOptionsButtons = document.querySelectorAll('.payment--options button');
    const inputFullName = document.getElementById('full_name');
    const inputPhoneNumber = document.getElementById('phone_number');
    const inputAddress = document.getElementById('address');
    const inputDeliveryTime = document.getElementById('delivery_time');

    let currentLanguage = localStorage.getItem('language') || 'ar'; // Default to Arabic
    let currentMode = localStorage.getItem('darkMode') || 'light'; // Default to light mode

    let cart = []; // Array to store cart items

    // --- Delivery Cost Variables ---
    const deliveryCostEgyptMadaeen = 25; // تكلفة التوصيل للمعادي وحدائق المعادي ودار السلام
    const deliveryCostOtherLocations = 40; // تكلفة التوصيل لأي مكان آخر

    let currentDeliveryCost = 0; // متغير لتخزين تكلفة التوصيل الحالية

    // --- Functions ---

    // 1. Language Toggle Functionality
    function toggleLanguage() {
        currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        localStorage.setItem('language', currentLanguage);
        applyLanguage(currentLanguage);
    }

    function applyLanguage(lang) {
        const langToggleBtn = document.getElementById('language-toggle');
        const body = document.body;

        if (lang === 'en') {
            // Switch to English
            langToggleBtn.textContent = 'AR';
            body.dir = 'ltr';
            body.style.textAlign = 'left';

            document.querySelector('.logo').textContent = 'HAMDY SOCKS';
            document.querySelector('#home h2').textContent = 'Best Socks For You';
            document.querySelector('#home p').textContent = 'Discover a collection of comfortable and stylish socks for all occasions';

            document.querySelector('#products .section-title').textContent = 'Our Products';

            const productTitles = [
                'ADIDAS WHITE', 'ADIDAS BLACK', 'adidas colors', '2 lines adidas',
                'nike colors (shorts)', 'nike colors', 'NBA', 'just do it (short)', 'chicken'
            ];
            const productDescriptions = [
                'Comfortable and warm for daily use', 'Designed for sports and high performance', 'For special occasions and formal look',
                'Perfect for the cold seasons', 'nike colors (shorts)', 'nike colors', 'NBA', 'just do it (short)', 'chicken'
            ];

            document.querySelectorAll('.product-card').forEach((card, index) => {
                if (index < productTitles.length) {
                    card.querySelector('.product-title').textContent = productTitles[index];
                    card.querySelector('.product-description').textContent = productDescriptions[index];
                }
            });
             document.querySelectorAll('.label .title').forEach(el => el.textContent = 'Add to Cart');
             document.querySelectorAll('.label .title:last-child').forEach(el => el.textContent = 'Added');


            document.querySelector('#about .section-title').textContent = 'About Us';
            document.querySelector('.about-text').textContent = 'We specialize in providing the best types of socks that combine comfort, elegance, and quality. Whether you\'re looking for daily, sports, or even medical socks, we have something to suit every lifestyle.';

            document.querySelector('.contact-title-wrapper h2').textContent = 'Contact Us';
            document.querySelector('.contact-title-wrapper p').textContent = 'Have questions? Feel free to reach out';
            
            document.querySelector('.modal-content h2').textContent = 'Shopping Cart';
            document.querySelector('.cart-total strong').textContent = 'Total:';
            if (paymentTriggerBtn) paymentTriggerBtn.textContent = 'Proceed to Payment';
            
            updateDeliveryFormPlaceholders('en');


        } else { // Switch to Arabic
            langToggleBtn.textContent = 'EN';
            body.dir = 'rtl';
            body.style.textAlign = 'right';

            document.querySelector('.logo').textContent = 'HAMDY SOCKS';
            document.querySelector('#home h2').textContent = 'أفضل الشرابات لكم';
            document.querySelector('#home p').textContent = 'اكتشف مجموعة من الشرابات المريحة والأنيقة لكل المناسبات';

            document.querySelector('#products .section-title').textContent = 'منتجاتنا';

            const productTitles = [
                'ADIDAS WHITE', 'ADIDAS BLACK', 'adidas colors', '2 lines adidas',
                'nike colors (shorts)', 'nike colors', 'NBA', 'just do it (short)', 'chicken'
            ];
            const productDescriptions = [
                'مريحة ودافئة للاستخدام اليومي', 'مصممة للرياضة والأداء العالي', 'للمناسبات الخاصة والإطلالة الرسمية',
                'مثالية للفصول الباردة', 'nike colors (shorts)', 'nike colors', 'NBA', 'just do it (short)', 'chicken'
            ];

            document.querySelectorAll('.product-card').forEach((card, index) => {
                 if (index < productTitles.length) {
                    card.querySelector('.product-title').textContent = productTitles[index];
                    card.querySelector('.product-description').textContent = productDescriptions[index];
                }
            });
            document.querySelectorAll('.label .title').forEach(el => el.textContent = 'أضف للسلة');
            document.querySelectorAll('.label .title:last-child').forEach(el => el.textContent = 'تم الاضافة');

            document.querySelector('#about .section-title').textContent = 'عنا';
            document.querySelector('.about-text').textContent = 'نحن متخصصون في تقديم أفضل أنواع الشرابات التي تجمع بين الراحة، الأناقة، والجودة. سواء كنت تبحث عن شرابات يومية أو رياضية أو حتى طبية، لدينا ما يناسب كل أسلوب حياة.';

            document.querySelector('.contact-title-wrapper h2').textContent = 'Contact Us';
            document.querySelector('.contact-title-wrapper p').textContent = 'Have questions? Feel free to reach out';
            
            document.querySelector('.modal-content h2').textContent = 'عربة التسوق';
            document.querySelector('.cart-total strong').textContent = 'الإجمالي:';
            if (paymentTriggerBtn) paymentTriggerBtn.textContent = 'الانتقال للدفع';
            
            updateDeliveryFormPlaceholders('ar');
        }
        updateCartDisplay();
    }


    // 2. Dark Mode Functionality
    function toggleDarkMode() {
        currentMode = currentMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('darkMode', currentMode);
        applyDarkMode(currentMode);
    }

    function applyDarkMode(mode) {
        const body = document.body;
        if (mode === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    // 3. Shopping Cart Functionality
    function addToCart(productId, productName, productPrice) {
        const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);

        if (!productCard) {
            console.error("Product card not found for ID:", productId);
            return;
        }

        const quantityInput = productCard.querySelector('.quantity-input');
        const quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity < 1) {
            alert(currentLanguage === 'ar' ? 'يرجى تحديد كمية صحيحة.' : 'Please select a valid quantity.');
            return;
        }

        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity = quantity;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
        }
        
        updateCartDisplay();
        alert(`${productName} (الكمية: ${quantity}) ${currentLanguage === 'ar' ? 'تمت إضافته إلى السلة!' : 'added to cart!'}`);
    }

    function updateQuantity(productId, change) {
        const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
        if (!productCard) return;

        const quantityInput = productCard.querySelector('.quantity-input');
        let currentQuantity = parseInt(quantityInput.value);

        if (isNaN(currentQuantity)) currentQuantity = 1;

        const newQuantity = currentQuantity + change;

        if (newQuantity >= 1) {
            quantityInput.value = newQuantity;
            const itemIndex = cart.findIndex(item => item.id === productId);
            if (itemIndex > -1) {
                cart[itemIndex].quantity = newQuantity;
                updateCartDisplay();
            }
        }
    }

    function removeItemFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        
        const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
        if (productCard) {
            const quantityInput = productCard.querySelector('.quantity-input');
            if (quantityInput) {
                quantityInput.value = 1;
            }
            const checkbox = productCard.querySelector('.input.add-to-cart');
            if (checkbox) checkbox.checked = false;
        }
        updateCartDisplay();
    }

    function openCartModal() {
        if (cartModal) {
            cartModal.style.display = 'block';
            if(cartItemsSection) cartItemsSection.style.display = 'block';
            if(paymentFormContainer) paymentFormContainer.style.display = 'none';
            updateCartDisplay();
        }
    }

    function closeCartModal() {
        if (cartModal) {
            cartModal.style.display = 'none';
            resetDeliveryForm();
            if(cartItemsSection) cartItemsSection.style.display = 'block';
            if(paymentFormContainer) paymentFormContainer.style.display = 'none';
        }
    }

    function showDeliveryForm() {
        if (cart.length === 0) {
            alert(currentLanguage === 'ar' ? 'عربة التسوق فارغة!' : 'Your shopping cart is empty!');
            return;
        }
        if(cartItemsSection) cartItemsSection.style.display = 'none';
        if(paymentFormContainer) paymentFormContainer.style.display = 'block';
        resetDeliveryForm();
    }

    function resetDeliveryForm() {
        if (inputFullName) inputFullName.value = '';
        if (inputPhoneNumber) inputPhoneNumber.value = '';
        if (inputAddress) inputAddress.value = '';
        if (inputDeliveryTime) inputDeliveryTime.value = '';
        paymentOptionsButtons.forEach(btn => btn.classList.remove('selected'));
    }

    function updateDeliveryFormPlaceholders(lang) {
        const fullNameLabel = document.querySelector('label[for="full_name"]');
        const phoneNumberLabel = document.querySelector('label[for="phone_number"]');
        const addressLabel = document.querySelector('label[for="address"]');
        const deliveryTimeLabel = document.querySelector('label[for="delivery_time"]');
        const separatorText = document.querySelector('.separator p');
        const checkoutButton = document.getElementById('final-checkout-btn');

        if (lang === 'en') {
            if (fullNameLabel) fullNameLabel.textContent = 'Full Name';
            if (phoneNumberLabel) phoneNumberLabel.textContent = 'Phone Number';
            if (addressLabel) addressLabel.textContent = 'Full Address';
            if (deliveryTimeLabel) deliveryTimeLabel.textContent = 'Preferred Delivery Time';
            
            if (inputFullName) inputFullName.placeholder = 'Enter your full name';
            if (inputPhoneNumber) inputPhoneNumber.placeholder = 'Enter your phone number';
            if (inputAddress) inputAddress.placeholder = 'Enter your full address';
            if (inputDeliveryTime) inputDeliveryTime.placeholder = 'e.g., Morning, Afternoon, or specific time';
            
            if (separatorText) separatorText.textContent = 'or enter delivery details';
            if (checkoutButton) checkoutButton.textContent = 'Submit Order';
        } else { // Arabic
            if (fullNameLabel) fullNameLabel.textContent = 'الاسم الكامل';
            if (phoneNumberLabel) phoneNumberLabel.textContent = 'رقم الهاتف';
            if (addressLabel) addressLabel.textContent = 'العنوان بالتفصيل';
            if (deliveryTimeLabel) deliveryTimeLabel.textContent = 'وقت التسليم المفضل';

            if (inputFullName) inputFullName.placeholder = 'ادخل اسمك الكامل';
            if (inputPhoneNumber) inputPhoneNumber.placeholder = 'ادخل رقم هاتفك';
            if (inputAddress) inputAddress.placeholder = 'ادخل عنوانك كاملاً';
            if (inputDeliveryTime) inputDeliveryTime.placeholder = 'مثال: صباحاً، بعد الظهر، أو وقت محدد';
            
            if (separatorText) separatorText.textContent = 'أو أدخل بيانات الاستلام';
            if (checkoutButton) checkoutButton.textContent = 'إتمام الطلب';
        }
    }

    function updateContactFormPlaceholders(lang) {
        const nameInput = document.querySelector('.contact-form input[type="text"]');
        const emailInput = document.querySelector('.contact-form input[type="email"]');
        const messageTextarea = document.querySelector('.contact-form textarea');

        if (lang === 'en') {
            if (nameInput) nameInput.placeholder = 'Your Name';
            if (emailInput) emailInput.placeholder = 'Your Email';
            if (messageTextarea) messageTextarea.placeholder = 'Your Message';
        } else { // Arabic
            if (nameInput) nameInput.placeholder = 'الاسم';
            if (emailInput) emailInput.placeholder = 'البريد الإلكتروني';
            if (messageTextarea) messageTextarea.placeholder = 'رسالتك';
        }
    }

    function handleOrderSubmission() {
        if (!inputFullName.value.trim() || !inputPhoneNumber.value.trim() || !inputAddress.value.trim()) {
            alert(currentLanguage === 'ar' ? 'يرجى ملء جميع حقول الاستلام الإلزامية (الاسم، الهاتف، العنوان).' : 'Please fill in all required delivery fields (Name, Phone, Address).');
            return;
        }

        const lowerCaseAddress = inputAddress.value.trim().toLowerCase();
        if (lowerCaseAddress.includes('المعادي') || lowerCaseAddress.includes('حدائق المعادي') || lowerCaseAddress.includes('دار السلام')) {
            currentDeliveryCost = deliveryCostEgyptMadaeen;
        } else {
            currentDeliveryCost = deliveryCostOtherLocations;
        }

        let orderDetails = "طلب جديد:\n";
        let totalOrderPrice = 0;

        if (cart.length === 0) {
            alert(currentLanguage === 'ar' ? 'عربة التسوق فارغة!' : 'Your shopping cart is empty!');
            return;
        }

        cart.forEach(item => {
            orderDetails += `- ${item.name} (الكمية: ${item.quantity}) - السعر: ${item.price.toFixed(2)} ${currentLanguage === 'ar' ? 'ج.م' : 'EGP'}\n`;
            totalOrderPrice += item.price * item.quantity;
        });

        const finalTotalPrice = totalOrderPrice + currentDeliveryCost;

        const orderSummary = `
        --- تفاصيل الطلب ---
        اسم العميل: ${inputFullName.value.trim()}
        رقم الهاتف: ${inputPhoneNumber.value.trim()}
        العنوان: ${inputAddress.value.trim()}
        وقت التسليم المفضل: ${inputDeliveryTime.value.trim() || 'غير محدد'}
        تكلفة التوصيل: ${currentDeliveryCost} ${currentLanguage === 'ar' ? 'ج.م' : 'EGP'}
        ------
        المنتجات:
        ${orderDetails}
        ------
        الإجمالي: ${finalTotalPrice.toFixed(2)} ${currentLanguage === 'ar' ? 'ج.م' : 'EGP'}
        `;

        const encodedMessage = encodeURIComponent(orderSummary);
        
        const whatsappBaseLink = 'https://wa.me/2001554728811?text=';
        const whatsappLink = whatsappBaseLink + encodedMessage;

        window.location.href = whatsappLink;

        alert(currentLanguage === 'ar' ? `تم إرسال تفاصيل الطلب إلى الواتساب. تكلفة التوصيل: ${currentDeliveryCost} ج.م. يرجى تأكيد الطلب هناك.` : `Order details sent to WhatsApp. Delivery cost: ${currentDeliveryCost} EGP. Please confirm your order there.`);
        cart = [];
        updateCartDisplay();
        closeCartModal();
        resetDeliveryForm();
    }

    // Function to update the cart display and count
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        cart.sort((a, b) => a.id.localeCompare(b.id));

        if (cart.length === 0) {
            cartItemsList.innerHTML = `<li>${currentLanguage === 'ar' ? 'عربة التسوق فارغة.' : 'Your shopping cart is empty.'}</li>`;
            cartTotalPrice.textContent = `0.00 ${currentLanguage === 'ar' ? 'ج.م' : 'EGP'}`;
            
            if(paymentFormContainer) paymentFormContainer.style.display = 'none';
            if(paymentTriggerBtn) paymentTriggerBtn.style.display = 'block';
            if(cartItemsSection) cartItemsSection.style.display = 'block';
            
        } else {
            cart.forEach(item => {
                const listItem = document.createElement('li');
                const itemTotal = item.price * item.quantity;
                listItem.innerHTML = `
                    <span>${item.name}</span>
                    <span>${item.quantity} x ${item.price.toFixed(2)} ${currentLanguage === 'ar' ? 'ج.م' : 'EGP'}</span>
                    <span>${itemTotal.toFixed(2)} ${currentLanguage === 'ar' ? 'ج.م' : 'EGP'}</span>
                    <button class="remove-item-btn" data-id="${item.id}">${currentLanguage === 'ar' ? 'إزالة' : 'Remove'}</button>
                `;
                cartItemsList.appendChild(listItem);
                total += itemTotal;
                totalItems += item.quantity;
            });
            cartTotalPrice.textContent = `${total.toFixed(2)} ${currentLanguage === 'ar' ? 'ج.م' : 'EGP'}`;

            if(paymentTriggerBtn) paymentTriggerBtn.style.display = 'block';
            if(cartItemsSection) cartItemsSection.style.display = 'block';
            if(paymentFormContainer) paymentFormContainer.style.display = 'none';
        }
        
        updateCartIconCounters(totalItems);
    }

    // Function to update the item count on cart icons
    function updateCartIconCounters(count) {
        const floatingCartCounter = cartItemCountFloating; // Use the variable defined earlier
        
        if (floatingCartCounter) {
            if (count > 0) {
                floatingCartCounter.textContent = count;
                floatingCartCounter.style.display = 'flex';
            } else {
                floatingCartCounter.style.display = 'none';
            }
        }

        // If you have a counter for the header cart button, update it here.
        // For example, if you had <span id="header-cart-counter"></span> in your header nav:
        // const headerCartCounter = document.getElementById('header-cart-counter');
        // if (headerCartCounter) {
        //     if (count > 0) {
        //         headerCartCounter.textContent = count;
        //         headerCartCounter.style.display = 'inline-block';
        //     } else {
        //         headerCartCounter.style.display = 'none';
        //     }
        // }
    }

    // --- Event Listeners ---

    // Language Toggle
    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', toggleLanguage);
    }

    // Dark Mode Toggle
    if (darkModeToggleBtn) {
        darkModeToggleBtn.addEventListener('click', toggleDarkMode);
    }

    // Cart Button - Open Modal (Header Cart Button)
    if (cartButton) {
        cartButton.addEventListener('click', openCartModal);
    }

    // Floating Cart Button - Open Modal
    if (floatingCartButton) {
        floatingCartButton.addEventListener('click', (e) => {
            e.preventDefault();
            openCartModal();
        });
    }

    // Close Modal Button
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeCartModal);
    }

    // Close Modal if clicked outside of content
    if (cartModal) {
        window.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
    }

    // Add to Cart Buttons & Quantity Control
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = card.querySelector('.add-to-cart').dataset.id;
        const addToCartButton = card.querySelector('.input.add-to-cart'); // The checkbox itself
        const minusBtn = card.querySelector('.minus-btn');
        const plusBtn = card.querySelector('.plus-btn');

        addToCartButton.addEventListener('click', (e) => {
            if (e.target.checked) {
                const productName = card.querySelector('.product-title').textContent;
                const productPriceStr = card.querySelector('.product-price').textContent.replace(/[^0-9.-]+/g, "");
                const productPrice = parseFloat(productPriceStr);

                if (productId && productName && !isNaN(productPrice)) {
                    addToCart(productId, productName, productPrice);
                } else {
                    console.error('Could not get product details for:', card);
                    e.target.checked = false;
                }
            } else {
                removeItemFromCart(productId);
            }
        });

        if (minusBtn) {
            minusBtn.addEventListener('click', () => updateQuantity(productId, -1));
        }
        if (plusBtn) {
            plusBtn.addEventListener('click', () => updateQuantity(productId, 1));
        }
    });

    // Remove Item Button from Cart Modal
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const productIdToRemove = e.target.dataset.id;
            removeItemFromCart(productIdToRemove);
        }
    });

    // Button to trigger showing the delivery form
    if (paymentTriggerBtn) {
        paymentTriggerBtn.addEventListener('click', showDeliveryForm);
    }

    // Handle final order submission from the delivery form
    if (finalCheckoutBtn) {
        finalCheckoutBtn.addEventListener('click', handleOrderSubmission);
    }
    
    paymentOptionsButtons.forEach(button => {
        button.addEventListener('click', () => {
            paymentOptionsButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    // --- Initial Setup ---
    applyLanguage(currentLanguage);
    applyDarkMode(currentMode);
    updateCartDisplay();
    updateContactFormPlaceholders(currentLanguage);
    updateDeliveryFormPlaceholders(currentLanguage);
});

// --- Mobile Menu Toggle ---
document.addEventListener('DOMContentLoaded', () => { // This is a duplicate DOMContentLoaded, it might be better to combine if all event listeners are here
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.getElementById('nav-links');

  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuIcon.classList.toggle('active');
    });
    
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('active');
      });
    });
  }

  // --- Dark Mode Toggle (redundant if already handled in main.js, but safe) ---
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }

  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'dark');
    } else {
      localStorage.setItem('darkMode', 'light');
    }
  });
});
