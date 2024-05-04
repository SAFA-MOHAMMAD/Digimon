let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); // Calling the function to change sidebar button
});

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // Replacing the icons class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); // Replacing the icons class
  }
}

/* Notification Toggle */
var box = document.getElementById('box');
var down = false;

function toggleNotifi() {
  if (down) {
    box.style.height = '0px';
    box.style.opacity = 0;
    down = false;
  } else {
    box.style.height = '510px';
    box.style.opacity = 1;
    down = true;
  }
}

/* Gallery Scroll Buttons */
document.querySelector('.event-scroll-button-right').addEventListener('click', function() {
  document.querySelector('.gallery').scrollBy({
    top: 0,
    left: 600, // Adjust the scroll distance
    behavior: 'smooth'
  });
});

document.querySelector('.event-scroll-button-left').addEventListener('click', function() {
  document.querySelector('.gallery').scrollBy({
    top: 0,
    left: -600, // Adjust the scroll distance
    behavior: 'smooth'
  });
});

/* Form Submission Handling */
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(event.target); // Create FormData object from the form
  fetch('http://127.0.0.1:54112/api/Event/newEvent', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    window.location.href = '/ClubManager_home.html'; // Redirect to the homepage after success
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
