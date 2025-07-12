const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.textContent = '👁️';
            } else {
                input.type = 'password';
                icon.textContent = '👁️‍🗨️';
            }
            
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

function setupFormHandling() {
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const submitBtn = loginForm.querySelector('.submit-btn');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    setTimeout(() => {
        console.log('Login attempt:', { email, password });
        
        showNotification('Login successful!', 'success');
        
        loginForm.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const submitBtn = registerForm.querySelector('.submit-btn');
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    setTimeout(() => {
        console.log('Register attempt:', { fullName, email, password });
        
        showNotification('Account created successfully!', 'success');
        
        registerForm.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
        </div>
        <button class="notification-close">×</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: var(--card-shadow);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
        color: var(--text-primary);
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--text-primary);
                font-size: 14px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: all 0.3s ease;
                font-size: 18px;
                font-weight: bold;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
                background: rgba(0, 0, 0, 0.1);
            }
            
            .notification-success {
                border-left: 4px solid #10b981;
            }
            
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            
            .notification-info {
                border-left: 4px solid #3b82f6;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    });
}

function setupInputAnimations() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.auth-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupPasswordToggles();
    setupFormHandling();
    setupInputAnimations();
    setupCardHoverEffects();
    
    const formElements = document.querySelectorAll('.form-group, .submit-btn');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    const touchStyles = document.createElement('style');
    touchStyles.textContent = `
        .touch-device .submit-btn:active {
            transform: scale(0.98) !important;
        }
        
        .touch-device .toggle-password:active {
            transform: scale(0.9) !important;
        }
    `;
    document.head.appendChild(touchStyles);
} 