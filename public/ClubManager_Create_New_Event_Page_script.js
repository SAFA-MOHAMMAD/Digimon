let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
const cancel = document.getElementById('cancel');


// Attach a submit event listener to the form
document.getElementById('form').addEventListener('submit', async function(event) {
  // Prevent default form submission behavior
  event.preventDefault();

  // Create FormData from the form element
  const form = event.target;
  const formData = new FormData(form);

  try {
      // Send a POST request to the server with the FormData
      const response = await fetch('/api/Event/newEvent', {
          method: 'POST',
          body: formData
      });

      // Handle the server response
      if (response.ok) {
          const createdEvent = await response.json();
          console.log('Event created successfully:', createdEvent);

          // Redirect the user or provide feedback as needed
          window.location.href = './ClubManager_home.html'; // Change to your success page URL
      } else {
          console.error('Failed to create event:', response.statusText);
      }
  } catch (error) {
      console.error('Error creating event:', error);
  }
});

cancel.addEventListener('click', function(event) {
  // Prevent default behavior (page reload)
  event.preventDefault();
  
  // Navigate back to the previous page
  window.history.back();
});
closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); // calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replacing the icons class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); // replacing the icons class
  }
}

/* ========================================= */
var box  = document.getElementById('box');
var down = false;


function toggleNotifi(){
	if (down) {
		box.style.height  = '0px';
		box.style.opacity = 0;
		down = false;
	}else {
		box.style.height  = '510px';
		box.style.opacity = 1;
		down = true;
	}
}
/* ========================================= */


  // document.querySelector('.event-scroll-button-right').addEventListener('click', function() {
  //   document.querySelector('.gallery').scrollBy({
  //     top: 0,
  //     left: 600, // Change this value to adjust the scroll distance
  //     behavior: 'smooth'
  //   });
  // });
  
  // document.querySelector('.event-scroll-button-left').addEventListener('click', function() {
  //   document.querySelector('.gallery').scrollBy({
  //     top: 0,
  //     left: -600, // Change this value to adjust the scroll distance
  //     behavior: 'smooth'
  //   });
  // });
