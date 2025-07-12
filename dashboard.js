// DOM elements
const navItems = document.querySelectorAll('.nav-item');
const actionButtons = document.querySelectorAll('.action-btn');
const viewAllBtn = document.querySelector('.view-all-btn');
const logoutBtn = document.querySelector('.logout-btn');

// Navigation functionality
function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show notification
            const pageName = this.querySelector('span:last-child').textContent;
            showNotification(`Navigating to ${pageName}...`, 'info');
        });
    });
}

// Action buttons functionality
function setupActionButtons() {
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionName = this.querySelector('span:last-child').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show notification
            showNotification(`${actionName} action triggered!`, 'info');
        });
    });
}

// View all button
function setupViewAllButton() {
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            showNotification('Loading all activities...', 'info');
        });
    }
}

// Logout functionality
function setupLogout() {
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Show notification
            showNotification('Logging out...', 'info');
            
            // Simulate logout process
            setTimeout(() => {
                showNotification('Logged out successfully!', 'success');
                
                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }, 1500);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
        </div>
        <button class="notification-close">×</button>
    `;
    
    // Add styles
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
    
    // Add notification styles to head if not exists
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
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    });
}

// Stats animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^0-9.-]+/g, ''));
        const prefix = finalValue.replace(/[0-9.-]/g, '');
        const suffix = finalValue.replace(/[^0-9.-]+/g, '').replace(/[0-9.-]/g, '');
        
        let currentValue = 0;
        const increment = numericValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            
            if (finalValue.includes('$')) {
                stat.textContent = `$${Math.floor(currentValue).toLocaleString()}`;
            } else {
                stat.textContent = Math.floor(currentValue).toLocaleString();
            }
        }, 30);
    });
}

// Activity items hover effects
function setupActivityHover() {
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Card hover effects
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.stat-card, .content-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupActionButtons();
    setupViewAllButton();
    setupLogout();
    setupActivityHover();
    setupCardHoverEffects();
    
    // Animate stats after a short delay
    setTimeout(() => {
        animateStats();
    }, 500);
    
    // Add entrance animation to elements
    const animatedElements = document.querySelectorAll('.stat-card, .content-card, .nav-item');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape to close notifications
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
    
    // Ctrl/Cmd + L to logout
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        if (logoutBtn) {
            logoutBtn.click();
        }
    }
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch-specific styles
    const touchStyles = document.createElement('style');
    touchStyles.textContent = `
        .touch-device .action-btn:active {
            transform: scale(0.98) !important;
        }
        
        .touch-device .nav-item:active {
            transform: scale(0.95) !important;
        }
        
        .touch-device .logout-btn:active {
            transform: scale(0.95) !important;
        }
    `;
    document.head.appendChild(touchStyles);
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Randomly update a stat
        const statCards = document.querySelectorAll('.stat-card');
        const randomCard = statCards[Math.floor(Math.random() * statCards.length)];
        const statNumber = randomCard.querySelector('.stat-number');
        const statChange = randomCard.querySelector('.stat-change');
        
        if (statNumber && statChange) {
            // Add a subtle pulse animation
            statCard.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                statCard.style.animation = '';
            }, 500);
        }
    }, 10000); // Update every 10 seconds
}

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Start real-time updates
setTimeout(simulateRealTimeUpdates, 5000); 