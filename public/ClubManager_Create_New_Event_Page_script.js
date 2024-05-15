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

  // Collect the selected categories
  const categories = [];
  form.querySelectorAll('input[name="category[]"]:checked').forEach(checkbox => {
    categories.push(checkbox.value);
  });
  formData.append('category', categories);

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
          const eventImage = createdEvent.eventImage;
          try {
            const notificationResponse = await fetch('/api/Notification/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: formData.get('eventContent'),
                    Title: formData.get('eventName'),
                    Image: eventImage
                })
            });
            // Handle the response (e.g., check if it was successful, log errors, etc.)
            if (notificationResponse.ok) {
                const notificationData = await notificationResponse.json();
                console.log('Notification created successfully:', notificationData);
            } else {
                console.error('Failed to create notification:', notificationResponse.statusText);
            }
        } catch (error) {
            console.error('Error creating notification:', error);
        }
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
async function fetchchunkedNotification() {
  fetch('/api/Notification/getNotifications') // Adjust the URL as needed
  .then(response => response.json())
  .then(notifications => {
      // Get the notification box element
      const notificationBox = document.getElementById('box');
      
      // Clear the existing notifications
      notificationBox.innerHTML = '<h2>Notifications</h2>';

      // Loop through each notification and create HTML elements
      notifications.forEach(notification => {
          const link = document.createElement('a');
          link.href = './Admin_weekly-Events.html'; // You can set the link URL based on the notification

          const itemDiv = document.createElement('div');
          itemDiv.classList.add('notifi-item');
          if (notification.Image) {
            // Create an image element and set its source
            const img = document.createElement('img');
            img.classList.add('box-icon');
            img.src = notification.Image; // Image URL from notification
            img.alt = 'Notification image';

            // Append the image to the item div
            itemDiv.appendChild(img);
        }
          const textDiv = document.createElement('div');
          textDiv.classList.add('text');

          // Create a heading for the notification title
          const titleH4 = document.createElement('h4');
          titleH4.textContent = notification.Title;

          // Create a paragraph for the notification message
          const messageP = document.createElement('p');
          messageP.textContent = notification.message;

          // Append the title and message to the text div
          textDiv.appendChild(titleH4);
          textDiv.appendChild(messageP);

          // Append the text div to the item div
          itemDiv.appendChild(textDiv);

          // Append the item div to the link
          link.appendChild(itemDiv);

          // Append the link to the notification box
          notificationBox.appendChild(link);
      });
  })
  .catch(error => {
      console.error('Error fetching notifications:', error);
  });
}

window.onload = function() {
  fetchchunkedNotification();
};
