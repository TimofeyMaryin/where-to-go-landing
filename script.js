// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - Starting form initialization');
    
    // Initialize EmailJS
    console.log('📧 Initializing EmailJS...');
    emailjs.init('ICx25ZuCCOOVaey8-');
    console.log('✅ EmailJS initialized with Public Key');
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(26, 11, 46, 0.98)';
        } else {
            header.style.background = 'rgba(26, 11, 46, 0.95)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-item, .feature-card, .download-content, .selection-card, .faq-item, .investor-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Button click animations
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-google-play, .btn-apk');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Phone image hover effects
    const phoneImages = document.querySelectorAll('.phone-image');
    phoneImages.forEach(phone => {
        phone.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        phone.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Phone container hover effects for tilted phones
    const phoneContainers = document.querySelectorAll('.phone-image-container');
    phoneContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            if (this.classList.contains('tilted')) {
                this.style.transform = 'rotate(0deg) scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            }
        });
        
        container.addEventListener('mouseleave', function() {
            if (this.classList.contains('tilted')) {
                this.style.transform = 'rotate(-5deg) scale(1)';
            }
        });
    });

    // Checkbox interactions - allow multiple selection for interests
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]');
    // Remove any existing event listeners by cloning the elements
    interestCheckboxes.forEach(checkbox => {
        const newCheckbox = checkbox.cloneNode(true);
        checkbox.parentNode.replaceChild(newCheckbox, checkbox);
    });

    // Telegram button functionality
    const telegramButtons = document.querySelectorAll('.btn-primary, .btn-google-play, .btn-apk');
    telegramButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Check if button contains Telegram text
            if (this.textContent.includes('ТГ') || this.textContent.includes('Telegram')) {
                
                const telegramUrl = 'https://t.me/WTGo_official'; 
                window.open(telegramUrl, '_blank');
                
                // Show success message
                showNotification('Переходим в Telegram канал! 🚀');
            } else {
                // For other buttons, show loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    // Show success message
                    showNotification('Спасибо за интерес к нашему сообществу!');
                }, 2000);
            }
        });
    });

    // Registration form functionality
    const registrationForm = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const submitBtn = document.querySelector('.registration-btn') || document.querySelector('button[type="submit"]') || document.querySelector('.btn-primary');
    
    console.log('🔍 Searching for form elements...');
    console.log('🔍 registrationForm:', registrationForm);
    console.log('🔍 emailInput:', emailInput);
    console.log('🔍 submitBtn:', submitBtn);
    console.log('🔍 All buttons on page:', document.querySelectorAll('button'));
    console.log('🔍 All forms on page:', document.querySelectorAll('form'));
    
    // Add click listeners to all buttons for debugging
    document.querySelectorAll('button').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            console.log(`🖱️ Button ${index} clicked:`, this.textContent, this.className, this.type);
        });
    });
    
    if (registrationForm && emailInput && submitBtn) {
        console.log('✅ Form elements found:', { registrationForm, emailInput, submitBtn });
        
        // Real-time email validation
        emailInput.addEventListener('input', function() {
            console.log('📧 Email input changed:', this.value);
            validateEmailRealTime();
        });
        
        emailInput.addEventListener('blur', function() {
            console.log('📧 Email input blur:', this.value);
            validateEmailRealTime();
        });
        
        // Add click listener to button as backup
        submitBtn.addEventListener('click', function(e) {
            console.log('🖱️ Button clicked!', e);
            e.preventDefault();
            e.stopPropagation();
            
            // Get form data
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData.entries());
            console.log('📝 Button click form data:', data);
            
            // Get selected interests
            const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                .map(input => input.value);
            console.log('🎯 Button click selected interests:', interests);
            
            // Clear previous error messages
            clearFormErrors();
            
            // Validate form - only email is required now
            let hasErrors = false;
            
            if (!data.email || data.email.trim() === '') {
                console.log('❌ Email is empty');
                showFieldError('email', 'Пожалуйста, заполните поле email');
                hasErrors = true;
            } else {
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    console.log('❌ Email format is invalid:', data.email);
                    showFieldError('email', 'Пожалуйста, введите корректный email адрес');
                    hasErrors = true;
                } else {
                    console.log('✅ Email is valid:', data.email);
                }
            }
            
            if (hasErrors) {
                console.log('❌ Form has errors, preventing submission');
                showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
                return;
            }
            
            console.log('✅ Button click form validation passed, proceeding with submission');
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            // Create beautiful email content
            const emailSubject = '🎉 Новая регистрация в приложении "Куда пойти?"';
            const emailBody = `Новая регистрация в приложении "Куда пойти?"

📧 Email: ${data.email}
📱 Telegram: ${data.telegram || 'Не указан'}
🎯 Интересы: ${interests.length > 0 ? interests.join(', ') : 'Не указаны'}
📅 Дата регистрации: ${new Date().toLocaleString('ru-RU')}
🌐 Сайт: ${window.location.href}

Следующие шаги:
• Добавить пользователя в Telegram канал
• Отправить приветственное сообщение  
• Добавить в базу данных пользователей

---
Это письмо отправлено автоматически с сайта "Куда пойти?"
Время: ${new Date().toLocaleString('ru-RU')}`;
            
            console.log('📧 Button click email content created:', { emailSubject, emailBody });
            
            // Send email using EmailJS
            console.log('📧 Button click attempting to send email via EmailJS');
            
            const emailParams = {
                to_email: 'lisa334.fool.434.kk@gmail.com',
                from_name: 'Сайт "Куда пойти?"',
                subject: emailSubject,
                message: emailBody,
                user_email: data.email,
                user_telegram: data.telegram || 'Не указан',
                user_interests: interests.length > 0 ? interests.join(', ') : 'Не указаны',
                registration_date: new Date().toLocaleString('ru-RU'),
                site_url: 'https://timofeymaryin.github.io/where-to-go-landing/'
            };
            
            console.log('📧 EmailJS parameters:', emailParams);
            
            emailjs.send('service_lbjwu4t', 'template_amwhlgg', emailParams)
                .then(function(response) {
                    console.log('✅ EmailJS email sent successfully!', response);
                    showNotification('Регистрация успешно отправлена! Письмо доставлено на почту.', 'success');
                    
                    // Reset form after successful submission
                    setTimeout(() => {
                        console.log('🔄 Resetting form after successful submission');
                        registrationForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        clearFormErrors();
                    }, 3000);
                })
                .catch(function(error) {
                    console.error('❌ EmailJS email failed:', error);
                    console.error('❌ Error details:', error);
                    showNotification('Ошибка отправки письма. Проверьте консоль для подробностей.', 'error');
                    
                    // Reset button state on error
                    setTimeout(() => {
                        console.log('🔄 Resetting button state after error');
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                });
        });
        
        // Form submission
        registrationForm.addEventListener('submit', function(e) {
            console.log('🚀 Form submission started');
            e.preventDefault(); // Всегда предотвращаем стандартную отправку
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            console.log('📝 Form data:', data);
            
            // Get selected interests
            const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                .map(input => input.value);
            console.log('🎯 Selected interests:', interests);
            
            // Clear previous error messages
            clearFormErrors();
            
            // Validate form - only email is required now
            let hasErrors = false;
            
            if (!data.email || data.email.trim() === '') {
                console.log('❌ Email is empty');
                showFieldError('email', 'Пожалуйста, заполните поле email');
                hasErrors = true;
            } else {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                    console.log('❌ Email format is invalid:', data.email);
                    showFieldError('email', 'Пожалуйста, введите корректный email адрес');
                    hasErrors = true;
                } else {
                    console.log('✅ Email is valid:', data.email);
                }
            }
            
            if (hasErrors) {
                console.log('❌ Form has errors, preventing submission');
                showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
                return;
            }
            
            console.log('✅ Form validation passed, proceeding with submission');
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            // Create beautiful email content
            const emailSubject = '🎉 Новая регистрация в приложении "Куда пойти?"';
            const emailBody = `Новая регистрация в приложении "Куда пойти?"

📧 Email: ${data.email}
📱 Telegram: ${data.telegram || 'Не указан'}
🎯 Интересы: ${interests.length > 0 ? interests.join(', ') : 'Не указаны'}
📅 Дата регистрации: ${new Date().toLocaleString('ru-RU')}
🌐 Сайт: ${window.location.href}

Следующие шаги:
• Добавить пользователя в Telegram канал
• Отправить приветственное сообщение  
• Добавить в базу данных пользователей

---
Это письмо отправлено автоматически с сайта "Куда пойти?"
Время: ${new Date().toLocaleString('ru-RU')}`;
            
            console.log('📧 Email content created:', { emailSubject, emailBody });
            
            // Try to send email first
            try {
                console.log('📧 Attempting to send email via mailto');
                const mailtoLink = `mailto:lisa334.fool.434.kk@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                console.log('📧 Mailto link:', mailtoLink);
                
                // Try to open email client
                window.open(mailtoLink, '_blank');
                console.log('✅ Email client opened');
                
                // Show success message
                showNotification('Почтовый клиент открыт! Если не открылся, вы будете перенаправлены на страницу с данными.', 'success');
                
                // Redirect after a short delay
                setTimeout(() => {
                    console.log('🔄 Redirecting to success page');
                    const successUrl = `send_form.html?email=${encodeURIComponent(data.email)}&telegram=${encodeURIComponent(data.telegram || '')}&interests=${encodeURIComponent(interests.join(', ') || '')}`;
                    console.log('🔄 Success URL:', successUrl);
                    window.location.href = successUrl;
            }, 2000);
                
            } catch (error) {
                console.error('❌ Mailto failed:', error);
                
                // Fallback: redirect to success page
                console.log('🔄 Fallback: redirecting to success page');
                const successUrl = `send_form.html?email=${encodeURIComponent(data.email)}&telegram=${encodeURIComponent(data.telegram || '')}&interests=${encodeURIComponent(interests.join(', ') || '')}`;
                console.log('🔄 Success URL:', successUrl);
                window.location.href = successUrl;
            }
        });
        
        // Real-time email validation function
        function validateEmailRealTime() {
            const email = emailInput.value.trim();
            console.log('🔍 Validating email in real-time:', email);
            
            if (!email) {
                console.log('❌ Email is empty');
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
                clearFormErrors();
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                console.log('❌ Email format is invalid');
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
                clearFormErrors();
                showFieldError('email', 'Пожалуйста, введите корректный email адрес');
                return;
            }
            
            console.log('✅ Email is valid, enabling submit button');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            clearFormErrors();
        }
        
        // Initial validation
        validateEmailRealTime();
        
    } else {
        console.error('❌ Form elements not found:', { registrationForm, emailInput, submitBtn });
        
        // Try alternative selectors
        console.log('🔍 Trying alternative selectors...');
        const altForm = document.querySelector('form');
        const altEmail = document.querySelector('input[type="email"]');
        const altButton = document.querySelector('button[type="submit"]');
        
        console.log('🔍 Alternative elements:', { altForm, altEmail, altButton });
        
        if (altForm && altEmail && altButton) {
            console.log('✅ Alternative elements found, setting up form...');
            
            // Set up form with alternative elements
            altForm.addEventListener('submit', function(e) {
                console.log('🚀 Alternative form submission started');
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                console.log('📝 Alternative form data:', data);
                
                // Get selected interests
                const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                    .map(input => input.value);
                console.log('🎯 Alternative selected interests:', interests);
                
                // Validate email
                if (!data.email || data.email.trim() === '') {
                    console.log('❌ Email is empty');
                    alert('Пожалуйста, заполните поле email');
                    return;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    console.log('❌ Email format is invalid');
                    alert('Пожалуйста, введите корректный email адрес');
                    return;
                }
                
                console.log('✅ Alternative form validation passed');
                
                // Create email content
                const emailSubject = '🎉 Новая регистрация в приложении "Куда пойти?"';
                const emailBody = `Новая регистрация в приложении "Куда пойти?"

📧 Email: ${data.email}
📱 Telegram: ${data.telegram || 'Не указан'}
🎯 Интересы: ${interests.length > 0 ? interests.join(', ') : 'Не указаны'}
📅 Дата регистрации: ${new Date().toLocaleString('ru-RU')}
🌐 Сайт: ${window.location.href}

Следующие шаги:
• Добавить пользователя в Telegram канал
• Отправить приветственное сообщение  
• Добавить в базу данных пользователей

---
Это письмо отправлено автоматически с сайта "Куда пойти?"
Время: ${new Date().toLocaleString('ru-RU')}`;
                
                console.log('📧 Alternative email content created');
                
                // Send email using EmailJS
                console.log('📧 Alternative attempting to send email via EmailJS');
                
                const emailParams = {
                    to_email: 'lisa334.fool.434.kk@gmail.com',
                    from_name: 'Сайт "Куда пойти?"',
                    subject: emailSubject,
                    message: emailBody,
                    user_email: data.email,
                    user_telegram: data.telegram || 'Не указан',
                    user_interests: interests.length > 0 ? interests.join(', ') : 'Не указаны',
                    registration_date: new Date().toLocaleString('ru-RU'),
                    site_url: 'https://timofeymaryin.github.io/where-to-go-landing/'
                };
                
                console.log('📧 Alternative EmailJS parameters:', emailParams);
                
                emailjs.send('service_lbjwu4t', 'template_amwhlgg', emailParams)
                    .then(function(response) {
                        console.log('✅ Alternative EmailJS email sent successfully!', response);
                        alert('Регистрация успешно отправлена! Письмо доставлено на почту.');
                        
                        // Reset form after successful submission
                        setTimeout(() => {
                            console.log('🔄 Alternative: Resetting form after successful submission');
                            altForm.reset();
                        }, 3000);
                    })
                    .catch(function(error) {
                        console.error('❌ Alternative EmailJS email failed:', error);
                        console.error('❌ Alternative error details:', error);
                        alert('Ошибка отправки письма. Проверьте консоль для подробностей.');
                    });
            });
        }
    }
    
    // Helper functions for form validation
    function clearFormErrors() {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.field-error');
        existingErrors.forEach(error => error.remove());
        
        // Remove error styling
        const errorFields = document.querySelectorAll('.form-group.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    function showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            const formGroup = field.closest('.form-group');
            formGroup.classList.add('error');
            
            // Remove existing error for this field
            const existingError = formGroup.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            errorDiv.style.color = '#ff4757';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '5px';
            formGroup.appendChild(errorDiv);
        }
    }
    

    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-icon i');
                    otherIcon.className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                icon.className = 'fas fa-plus';
            } else {
                item.classList.add('active');
                icon.className = 'fas fa-chevron-up';
            }
        });
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-trail');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.05);
            element.style.transform += ` translateY(${scrolled * speed}px)`;
        });
    });

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(90deg, #ff6b9d, #c44569);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
});

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle';
    const bgColor = type === 'error' ? 'linear-gradient(90deg, #ff4757, #ff3838)' : 'linear-gradient(90deg, #FF32D2, #6399FF)';
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.background = bgColor;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-trail');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.05);
        element.style.transform += ` translateY(${scrolled * speed}px)`;
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('contactModal');
    if (modal && e.target === modal) {
        closeContactModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

// Investor button functionality
document.addEventListener('DOMContentLoaded', function() {
    const investorButton = document.querySelector('.btn-investor');
    if (investorButton) {
        investorButton.addEventListener('click', function() {
            // Open contact modal for investor inquiries
            openContactModal();
        });
    }
});
