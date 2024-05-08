const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

document.getElementById('login_st').addEventListener('submit', async function(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Create FormData from the form element
  const formData = new FormData(event.target);

  try {
      // Send the FormData to the server via a POST request
      const response = await fetch('/api/User/login', {
          method: 'POST',
          body: formData,
      });
      // Handle the response
      if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);
          const userEmail = data.userEmail;
// Store the user's email in session storage
          sessionStorage.setItem('userEmail', userEmail);
          window.location.href = './ClubManager_home.html'; // Redirect to home page

          //window.location.href = `./ClubManager_home.html?userEmail=${encodeURIComponent(data.userEmail)}`; // Redirect to home page
      } else {
          const errorData = await response.json();
          console.error('Failed to log in:', errorData.message);

          // Display the error message to the user
          const errorMessageElement = document.getElementById('loginErrorMessage');
          errorMessageElement.textContent = errorData.message; // Set error message content
          errorMessageElement.style.display = 'block'; // Show the error message
      }
  } catch (error) {
      console.error('Error during login:', error);

      // Display a generic error message if something goes wrong
      const errorMessageElement = document.getElementById('loginErrorMessage');
      errorMessageElement.textContent = 'Invalid Email or Password.';
      errorMessageElement.style.display = 'block';
  }
});
document.getElementById('signupForm').addEventListener('submit', async function(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Create FormData from the form element
  const formData = new FormData(event.target);

  try {
      // Send the FormData to the server via a POST request
      const response = await fetch('/api/User/newUser', {
          method: 'POST',
          body: formData, // Send the form data directly as the request body
      });

      // Handle the response
      if (response.ok) {
          const data = await response.json();
          console.log('Sign-up successful:', data);
          window.location.href = '/'; // Redirect the user to the home page
      } else {
          const errorData = await response.json();
          console.error('Failed to register:', errorData.message);

          // Display the error message to the user
          const errorMessageElement = document.getElementById('signupErrorMessage');
          errorMessageElement.textContent = errorData.message; // Set error message content
          errorMessageElement.style.display = 'block'; // Show the error message
      }
  } catch (error) {
      console.error('Error during registration:', error);

      // Display a generic error message if something goes wrong
      const errorMessageElement = document.getElementById('signupErrorMessage');
      errorMessageElement.textContent = 'The Email Or Password is Invalid. Please Check Again.';
      errorMessageElement.style.display = 'block';
  }
});