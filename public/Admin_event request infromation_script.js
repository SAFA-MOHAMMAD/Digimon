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

  function getQueryParams() {
    console.log('getQueryParams function called');
    const params = new URLSearchParams(window.location.search);
    const idclubEvent = params.get('idclubEvent');
    const clubName = params.get('clubName');
    const clubPresident = params.get('clubPresident');
    const eventType = params.get('eventType');
    const eventName = params.get('eventName');
    const eventDate = params.get('eventDate');
    const eventSpeaker = params.get('eventSpeaker');
    const eventContent = params.get('eventContent');
    const eventPlace = params.get('eventPlace');
    const eventSpecialService = params.get('eventSpecialService');
    const eventImage = params.get('eventImage');
    const eventTime = params.get('eventTime');
    const eventApproval = params.get('eventApproval');
    console.log('idclubEvent:', idclubEvent, 'clubName:', clubName, 'eventName:', eventName);
    
    return {
      idclubEvent,
        clubName,
        clubPresident,
        eventType,
        eventName,
        eventDate,
        eventSpeaker,
        eventContent,
        eventPlace,
        eventSpecialService,
        eventImage,
        eventTime,
        eventApproval
    };
  }





  function displayEventInfo() {
    const eventData = getQueryParams();
      // Update the HTML elements with the club data
    document.getElementById('club_name').textContent = eventData.clubName;
    document.getElementById('event_types').textContent = eventData.eventType;
    document.getElementById('Event_Name').textContent = eventData.eventName;
    document.getElementById('Event_Date').textContent = eventData.eventDate;
    document.getElementById('Event_Time').textContent = eventData.eventTime;
    document.getElementById('event_content').textContent = eventData.eventContent;
    document.getElementById('Speaker').textContent = eventData.eventSpeaker;
    document.getElementById('Event_location').textContent = eventData.eventPlace;
    document.getElementById('Event_needs').textContent = eventData.eventSpecialService;
    document.getElementById('Club_President_name').textContent = eventData.clubPresident;
    
    }
    // Call the displayEventInfo function when the page loads
    window.addEventListener('load', displayEventInfo);
  



    async function fetchchunkedNotification() {
      try {
          const response = await fetch('/api/Notification/getNotifications');
          const notifications = await response.json();
          
          // Get the notification box element
          const notificationBox = document.getElementById('box');
          
          // Clear the existing notifications
          notificationBox.innerHTML = '<h2>Notifications</h2>';
    
          // Loop through each notification and create HTML elements
          notifications.forEach(async notification => {
              // Create a link element
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
              link.href = destinationUrl;
    
              // Create a div for the notification item
              const itemDiv = document.createElement('div');
              itemDiv.classList.add('notifi-item');
    
              // If notification has an image, create an image element
              if (notification.Image) {
                  const img = document.createElement('img');
                  img.classList.add('box-icon');
                  img.src = notification.Image; // Image URL from notification
                  img.alt = 'Notification image';
                  itemDiv.appendChild(img);
              }
    
              // Create a div for the notification text
              const textDiv = document.createElement('div');
              textDiv.classList.add('text');
    
              // Create a heading for the notification title
              const titleH4 = document.createElement('h4');
              titleH4.textContent = notification.Title;
    
              // Create a paragraph for the notification message
              const messageP = document.createElement('p');
              messageP.textContent = notification.message;
    
              // Append title and message to the text div
              textDiv.appendChild(titleH4);
              textDiv.appendChild(messageP);
    
              // Append text div to the item div
              itemDiv.appendChild(textDiv);
    
              // Append item div to the link
              link.appendChild(itemDiv);
    
              // Append link to the notification box
              notificationBox.appendChild(link);
          });
      } catch (error) {
          console.error('Error fetching notifications:', error);
      }
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
    
    // Execute the function when the window is loaded
    window.onload = function() {
      fetchchunkedNotification();
    };
    