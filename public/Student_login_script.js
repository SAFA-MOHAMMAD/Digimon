document.getElementById('login_st').addEventListener('submit', async function(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Create FormData from the form element
  const formData = new FormData(event.target);
  for (const [key, value] of formData.entries()) {
    console.log(`Key: ${key}, Value: ${value}`);
}

  try {
      // Send the FormData to the server via a POST request
      const response = await fetch('/api/User/login', {
          method: 'POST',
          body: formData, // Send the form data directly as the request body
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        console.log('the new user:',data);
        window.location.href = './Student_home.html'; // Redirect the user if necessary
    }
    else {
          const errorData = await response.json();
          console.error('Failed to register:', errorData.message);
      }
  } catch (error) {
      console.error('Error during registration:', error);
  }
});
document.getElementById('signupForm').addEventListener('submit', async function(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Create FormData from the form element
  const formData = new FormData(event.target);
  for (const [key, value] of formData.entries()) {
    console.log(`Key: ${key}, Value: ${value}`);
}

  try {
      // Send the FormData to the server via a POST request
      const response = await fetch('/api/User/newUser', {
          method: 'POST',
          body: formData, // Send the form data directly as the request body
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        console.log('the new user:',data);
        window.location.href = '/'; // Redirect the user if necessary
    }
    else {
          const errorData = await response.json();
          console.error('Failed to register:', errorData.message);
      }
  } catch (error) {
      console.error('Error during registration:', error);
  }
});
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



// document.querySelector('form').addEventListener('submit', async function(event) {
//   // Prevent default form submission behavior
//   event.preventDefault();
//   // Create FormData from the form element
//   const form = event.target;
//   const formData = new FormData(form);

//   // Log the FormData contents to check what's being sent
//   for (const [key, value] of formData.entries()) {
//       console.log(`Key: ${key}, Value: ${value}`);
//   }

//   try {
//       // Send the FormData to the server via a POST request
//       const response = await fetch('/api/user/login', {
//           method: 'POST',
//           body:formData
//       });
//       // Handle the response
//       if (response.ok) {
//         // Parse the JSON response
//         const data = await response.json();
//         window.location.href = './Student_home.html';
//         // Check for a JWT token and login success message
      
//     } else {
//         // If the response status is not OK, handle the error
//         const errorData = await response.json();
//         console.error('Error:', errorData.message);
//     }
//   } catch (error) {
//       console.error('Error creating user:', error);
//   }
// });

// document.getElementById('login_st').addEventListener('submit', async function(event) {
//   // Prevent default form submission behavior
//   event.preventDefault();
  
//   // Create a FormData object from the form
//   const formData = new FormData(event.target);
//   const Email=formData.get('userEmail');
//   const Password=formData.get('userPassword');

//   console.log('Form data:', formData.get('userEmail'), formData.get('userPassword'));

//   try {
//       // Send a POST request to the server with the form data
//       const response = await fetch('/api/user/login', {
//         method: 'POST',
//         userEmail: Email,
//         userPassword:Password
//       });
//     //   const response = await fetch('/api/club/newClub', {
//     //     method: 'POST',
//     //     body: formData,
//     // });
//       // Handle the server response
//       if (response.ok) {
//           // Parse the JSON response
//           const data = await response.json();
//           window.location.href = './Student_home.html';
//           // Check for a JWT token and login success message
        
//       } else {
//           // If the response status is not OK, handle the error
//           const errorData = await response.json();
//           console.error('Error:', errorData.message);
//       }
//   } catch (error) {
//       // Handle any network or other errors
//       console.error('Error logging in user:', error);
//   }
// });


// // document.querySelector('form').addEventListener('submit', async function(event) {
// //     // Prevent default form submission behavior
// //     event.preventDefault();

// //     // Create FormData from the form element
// //     const form = event.target;
// //     const formData = new FormData(form);

// //     try {
// //         // Send the FormData to the server via a POST request
// //         const response = await fetch(form.action, {
// //             method: form.method,
// //             body: formData,
// //         });

// //         // Handle the response
// //         if (response.ok) {
// //             const data = await response.json();

// //             // Check if the response includes a redirect URL
// //             if (data.redirect) {
// //                 // Redirect to the home page
// //                 window.location.href = data.redirect;
// //             } else {
// //                 console.log('Action successful:', data);
// //             }
// //         } else {
// //             console.error('Failed action:', response.statusText);
// //         }
// //     } catch (error) {
// //         console.error('Error:', error);
// //     }
// // });
