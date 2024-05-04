const formOpenBtn = document.querySelector("#form-open"),
      home = document.querySelector(".home"),
      formContainer = document.querySelector(".form_container"),
      formCloseBtn = document.querySelector(".form_close"),
      signupBtn = document.querySelector("#signup"),
      loginBtn = document.querySelector("#login"),
      pwShowHide = document.querySelectorAll(".pw_hide"),
      loginForm = document.querySelector("#login-form"),
      signupForm = document.querySelector("#signup-form");

// Toggle form visibility
formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

// Password visibility toggle
pwShowHide.forEach(icon => {
    icon.addEventListener("click", () => {
        let pwInput = icon.parentElement.querySelector("input");
        if (pwInput.type === "password") {
            pwInput.type = "text";
            icon.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            pwInput.type = "password";
            icon.classList.replace("uil-eye", "uil-eye-slash");
        }
    });
});

// Form transition between login and signup
signupBtn.addEventListener("click", e => {
    e.preventDefault();
    formContainer.classList.add("active");
});

loginBtn.addEventListener("click", e => {
    e.preventDefault();
    formContainer.classList.remove("active");
});

// Handle Login Form Submission
loginForm.addEventListener('submit', event => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(loginForm);
    const data = {
        userEmail: formData.get('userEmail'),
        userPassword: formData.get('userPassword'),
        rememberMe: formData.get('rememberMe') === 'on'
    };

    fetch('http://127.0.0.1:54112/api/User/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'Admin_home.html'; // Adjust the redirect as needed
        } else {
            throw new Error(data.message || 'Failed to login');
        }
    })
    .catch(error => {
        console.error('Login Error:', error);
        alert('Login failed: ' + error.message);
    });
});

// Handle Signup Form Submission
signupForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const data = {
        userEmail: formData.get('userEmail'),
        userPassword: formData.get('userPassword')
    };

    // Password confirmation check
    if (formData.get('userPassword') !== formData.get('confirmPassword')) {
        alert('Passwords do not match!');
        return;
    }

    fetch('http://127.0.0.1:54112/api/User/newUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to signup');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = 'Admin_home.html'; // Correct the path if necessary
    })
    .catch(error => {
        console.error('Signup Error:', error);
        alert('Signup failed: ' + error.message);
    });
});
