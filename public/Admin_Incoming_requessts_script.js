let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}


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
/* ============================ */
async function fetchNotApprovedEvents() {
  try {
      // Fetch data from the server
      const response = await fetch(`/api/Event/getAllNotAproveEvents`);
      const events = await response.json(); // Parse the JSON response

      const mainGrid = document.getElementById('home-section');

      // Clear previous content from the mainGrid container
      mainGrid.innerHTML = '';

      // Iterate over the events and create a card for each
      events.forEach(async (event) => {
          // Fetch club data for each event
          const clubResponse = await fetch(`/api/Club/name/${event.clubName}`);
          const clubData = await clubResponse.json();

          // Create a container for each event card
          const cardContainer = document.createElement('div');

          // Set the content of the event card using event and club data
          cardContainer.innerHTML = `
          <div class="mainGrid" id="mainGrid">
              <div class="clubInfo">
                  <img src="${clubData.clubLogo || 'images/default-logo.png'}" alt="clubLogo">
                  <h4 class="clubName">${clubData.clubName}</h4>
                  <p>${clubData.clubDescription || 'No description available'}</p>
              </div>

              <div class="eventInfo">
                  <p>Event Name: ${event.eventName}</p>
                  <p>Location: ${event.eventPlace}</p>
                  <p>Date: ${event.eventDate}</p>
                  <p>Time: ${event.eventTime}</p>
                  <p>Poster Required: ${event.posterRequired ? 'Yes' : 'No'}</p>
              </div>

              <div class="buttons">
              <form action="">
              <div><button type="button" class="approve" data-event-id="${event.idclubEvent}">Approve</button></div>
              <div><button type="button" class="deny" data-event-id="${event.idclubEvent}">Deny</button></div>
                  <a href="Admin_event request infromation.html?idclubEvent=${event.idclubEvent} &clubName=${encodeURIComponent(clubData.clubName)}
                  &clubPresident=${encodeURIComponent(clubData.clubPresident)}
                  &eventType=${encodeURIComponent(event.eventType)}
                  &eventName=${encodeURIComponent(event.eventName)}
                  &eventDate=${encodeURIComponent(event.eventDate)}
                  &eventSpeaker=${encodeURIComponent(event.eventSpeaker)}
                  &eventContent=${encodeURIComponent(event.eventContent)}
                  &eventPlace=${encodeURIComponent(event.eventPlace)}
                  &eventSpecialService=${encodeURIComponent(event.eventSpecialService)}
                  &eventImage=${encodeURIComponent(event.eventImage)}
                  &eventTime=${encodeURIComponent(event.eventTime)}
                  &eventApproval=${encodeURIComponent(event.eventApproval)}"><div>
                      <button type="button" class="seeMore">See more details</button>
                      </div></a>
                  </form>
              </div>
              <hr>

          `;

          // Append each card container as a separate row in the mainGrid container
          mainGrid.appendChild(cardContainer);

          // Add event listeners for the Approve and Deny buttons
          const approveButton = cardContainer.querySelector('.approve');
          const denyButton = cardContainer.querySelector('.deny');

          approveButton.addEventListener('click', async () => {
              await handleApproval(event.idclubEvent, true);
          });

          denyButton.addEventListener('click', async () => {
            const response = await fetch(`/api/Event/${event.idclubEvent}`, {
              method: 'DELETE'
          });
          window.location.reload();
          });
      });
  } catch (error) {
      console.error('Error fetching not approved events:', error);
  }
}

// Function to handle the approval or denial of events
async function handleApproval(eventId, isApproved) {
  try {
      const response = await fetch(`/api/Event/approveEvent/${eventId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventApproval: isApproved,
          }),
      });

      if (response.ok) {
          // Refresh the page to show updated list of not approved events
          fetchNotApprovedEvents();
      } else {
          console.error('Failed to update event approval:', response.statusText);
      }
  } catch (error) {
      console.error('Error updating event approval:', error);
  }
}

// Fetch not approved events when the page loads
window.addEventListener('load', fetchNotApprovedEvents);
async function fetchchunkedNotification() {
  fetch('/api/Notification/getNotifications') // Adjust the URL as needed
  .then(response => response.json())
  .then(notifications => {
      // Get the notification box element
      const notificationBox = document.getElementById('box');
      
      // Clear the existing notifications
      notificationBox.innerHTML = '<h2>Notifications</h2>';

      // Loop through each notification and create HTML elements
      notifications.forEach(async notification => {
          const link = document.createElement('a');
          let destinationUrl = './Admin_Incoming_requessts.html'; // Default URL for non-club notifications
          // Check if the title matches a club name
          const data=(await isClubName(notification.Title)).found;
          console.log('Does the club exist?', data); // Should print true or false

          //const clubData=data.clubData;
          if (data===true) {
            console.log("enterd the is club function")
              // If it's a club name, set the destination URL to the club page
              const clubData=(await isClubName(notification.Title)).clubData;
              console.log("the result is :",clubData.clubID)

              destinationUrl = `/club?clubID=${clubData.clubID}
              &clubName=${encodeURIComponent(clubData.clubName)}
              &clubDescription=${encodeURIComponent(clubData.clubDescription)}
              &clubPresident=${encodeURIComponent(clubData.clubPresident)}
              &clubVicePresident=${encodeURIComponent(clubData.clubVicePresident)}
              &clubActivitiesInfo=${encodeURIComponent(clubData.clubActivitiesInfo)}
              &clubOfficialEmail=${encodeURIComponent(clubData.clubOfficialEmail)}
              &clubPresidentEmail=${encodeURIComponent(clubData.clubPresidentEmail)}
              &clubVicePresidentEmail=${encodeURIComponent(clubData.clubVicePresidentEmail)}
              &clubLogo=${encodeURIComponent(clubData.clubLogo)}`;
          }

          // Set the href attribute of the link
          link.href = destinationUrl; // You can set the link URL based on the notification

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
async function isClubName(name) {
  try {
      // Send a request to your server to check if a club with the given name exists
      const response = await fetch(`/api/club/name/${encodeURIComponent(name)}`);
      
      if (response.ok) {
          // If the response is successful, it means the club exists
          const clubData = await response.json();
          return {
              found: true, // Indicate that the club is found
              clubData: clubData // Include club data in the response
          };
      } else {
          // If the response is not successful, it means the club doesn't exist
          return { found: false }; // Indicate that the club is not found
      }
  } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error checking club name:', error);
      return { found: false }; // Return false in case of an error
  }
}



window.onload = function() {
  fetchchunkedNotification();
};