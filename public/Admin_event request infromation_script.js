let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

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


  document.querySelector('.event-scroll-button-right').addEventListener('click', function() {
    document.querySelector('.gallery').scrollBy({
      top: 0,
      left: 600, // Change this value to adjust the scroll distance
      behavior: 'smooth'
    });
  });
  
  document.querySelector('.event-scroll-button-left').addEventListener('click', function() {
    document.querySelector('.gallery').scrollBy({
      top: 0,
      left: -600, // Change this value to adjust the scroll distance
      behavior: 'smooth'
    });
  });
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