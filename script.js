// DOM elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.querySelector('.btn-login');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Update icon
    const eyeIcon = togglePasswordBtn.querySelector('.eye-icon');
    if (type === 'text') {
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="1" y1="1" x2="23" y2="23" stroke-width="2" stroke-linecap="round"/>
        `;
    } else {
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    }
});

// Validate email
function validateEmail() {
    const email = emailInput.value.trim();

    if (!email) {
        showError(emailInput, emailError, 'Email is required');
        return false;
    }

    if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }

    clearError(emailInput, emailError);
    return true;
}

// Validate password
function validatePassword() {
    const password = passwordInput.value;

    if (!password) {
        showError(passwordInput, passwordError, 'Password is required');
        return false;
    }

    if (password.length < 6) {
        showError(passwordInput, passwordError, 'Password must be at least 6 characters');
        return false;
    }

    clearError(passwordInput, passwordError);
    return true;
}

// Show error
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;

    // Add shake animation
    input.style.animation = 'shake 0.5s';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

// Clear error
function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Add CSS for shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Real-time validation on blur
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);

// Clear error on input
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        clearError(emailInput, emailError);
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('error')) {
        clearError(passwordInput, passwordError);
    }
});

// Form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
        return;
    }

    // Show loading state
    loginBtn.classList.add('loading');

    // Simulate API call (replace with actual API call)
    try {
        await simulateLogin();

        // Success - show success message
        showSuccessMessage();
    } catch (error) {
        // Error - show error message
        showError(passwordInput, passwordError, 'Invalid email or password');
        loginBtn.classList.remove('loading');
    }
});

// Simulate login API call
function simulateLogin() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // For demo purposes, accept any email/password combination
            // In production, this would be a real API call
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // Simulate successful login
            if (email && password) {
                resolve({ success: true });
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1500);
    });
}

// Show success message
function showSuccessMessage() {
    // Create success overlay
    const successOverlay = document.createElement('div');
    successOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
    `;

    successOverlay.innerHTML = `
        <div style="text-align: center; animation: slideUp 0.5s ease-out;">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#48bb78" style="margin-bottom: 20px;">
                <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round"/>
                <path d="M8 12l2 2 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2 style="color: #1a202c; font-size: 24px; margin-bottom: 8px; font-weight: 700;">Login Successful!</h2>
            <p style="color: #718096; font-size: 16px;">Redirecting to dashboard...</p>
        </div>
    `;

    document.body.appendChild(successOverlay);

    // Remove loading state
    loginBtn.classList.remove('loading');

    // Simulate redirect (in production, use window.location.href)
    setTimeout(() => {
        console.log('Redirecting to dashboard...');
        // window.location.href = '/dashboard';
    }, 2000);
}

// Social login button handlers
const socialButtons = document.querySelectorAll('.btn-social');
socialButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const provider = button.textContent.trim();
        console.log(`Continue with ${provider}`);

        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.2);
            top: ${y}px;
            left: ${x}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // In production, initiate OAuth flow
        // window.location.href = `/auth/${provider.toLowerCase()}`;
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Forgot password link
const forgotPasswordLink = document.querySelector('.forgot-password');
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Forgot password clicked');
    // In production, navigate to password reset page
    // window.location.href = '/forgot-password';
    alert('Password reset functionality would be implemented here');
});

// Sign up link
const signupLink = document.querySelector('.signup-link a');
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Sign up clicked');
    // In production, navigate to sign up page
    // window.location.href = '/signup';
    alert('Sign up page would be implemented here');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Submit form on Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Auto-focus email input on page load
window.addEventListener('load', () => {
    emailInput.focus();
});

console.log('Login page initialized successfully! 🚀');
