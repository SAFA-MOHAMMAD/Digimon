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

  /* ============================ */

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
  /* ============================ */

  async function fetchchunkedEvents() {
    try {
        // Fetch data from the server
        const response = await fetch(`/api/Event/getUpcomingEvents`);
        const Events = await response.json(); // Parse the JSON response
        // Get the gallery container where cards will be inserted
        const gallery = document.getElementById('event-gallery');
        // Iterate over the chunkedevents and create a card for each
        Events.forEach((event, index) => {
            // Create a card element
            const card = document.createElement('div');
            card.classList.add('gallery-item', 'grid-colum-span');
            // Set the ID for each card, using `event-card-{index}` to distinguish them
            card.id = `event-card-${index}`;
            // Set the card content
            let imageUrl = '';
            if (event.eventImage) {
                // Convert backslashes to forward slashes in the image URL
                imageUrl = event.eventImage.replace(/\\/g, '/');
            }
            card.innerHTML = `
            <div class=" grid-colum-span">
                <a href="Admin_Event_details.html?id=${event.idclubEvent}" id="event-card-link">
                    <div class="eventCard" style="background-image: url(${imageUrl});">
                        <div class="dateBlock">
                            <p class="day"><span>${event.eventDate.substring(8, 10)}</span>th</p>
                            <p class="month"><span>${event.eventDate.substring(5, 7)}</span></p>
                            <p class="year"><span>${event.eventDate.substring(0, 4)}</span></p>
                        </div>
                        <div class="titleBlock">
                            <h3>${event.eventName}</h3>
                        </div>
                    </div>
                </a>
                <div class="locationBlock">
                    <p class="location">Location: <span>${event.eventPlace}</span></p>
                    <p class="time">Time: <span>${event.eventTime}</span></p>
                </div>
                </div>
            `;
            // Append the card to the gallery
            gallery.appendChild(card);
            // Add a click event listener to the card
            card.addEventListener("click", async function() {
              // Fetch the specific event information
              const eventResponse = await fetch(`/api/event/${event.idclubEvent}`);
              const eventData = await eventResponse.json();
              
              // Redirect to the event page with the event data as query parameters
              // Constructing the URL with query parameters
              window.location.href = `./ClubManager_Event_details.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
                  &clubName=${encodeURIComponent(eventData.clubName)}
                  &eventType=${encodeURIComponent(eventData.eventType)}
                  &eventName=${encodeURIComponent(eventData.eventName)}
                  &eventDate=${encodeURIComponent(eventData.eventDate)}
                  &eventSpeaker=${encodeURIComponent(eventData.eventSpeaker)}
                  &eventContent=${encodeURIComponent(eventData.eventContent)}
                  &eventPlace=${encodeURIComponent(eventData.eventPlace)}
                  &eventSpecialService=${encodeURIComponent(eventData.eventSpecialService)}
                  &eventImage=${encodeURIComponent(eventData.eventImage)}
                  &eventTime=${encodeURIComponent(eventData.eventTime)}
                  &eventApproval=${encodeURIComponent(eventData.eventApproval)}`;
          });
            });
    } catch (error) {
        console.error('Error fetching chunkedevents:', error);
    }
  }



document.addEventListener('DOMContentLoaded', function () {
  console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')

  // Get the search input field and submit button elements
  const searchInput = document.getElementById('search');
  const submitButton = document.getElementById('submit');

  // Add an event listener to the submit button
  submitButton.addEventListener('click', async function (e) {
      e.preventDefault(); // Prevent the form from submitting the traditional way
console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
      // Get the search term from the input field
      const searchTerm = searchInput.value;
console.log(searchTerm)
      // Check if search term is empty
      if (!searchTerm) {
          alert('Please enter a search term.');
          return;
      }

      try {
          // Send an HTTP GET request to the search API endpoint
          const response = await node-fetch(`/api/Event/search/${searchTerm}`);
          const eventData = await response.json();
          console.log(eventData)
         

          // Check if the response is OK (status code 200)
          if (!response.ok) {
              throw new Error('Failed to fetch search results');
          }

          // Parse the response JSON
         // const results = await response.json();

          // Display the search results in the results container
          // const resultsContainer = document.getElementById('results-container');
          

          const resultsContainer = document.getElementById('results-container');
          resultsContainer.innerHTML = ' ';

          
          const galleryContainer = document.getElementById('club-gallery');
          galleryContainer.innerHTML = ' ';
                    // Display results as cards
                    clubData.forEach(club => {
                        const card = document.createElement('div');
                        card.classList.add('card'); // Add a card class for styling
                        // Populate the card with club information
                        card.innerHTML = `
                            <img src="${club.clubLogo}" alt="${club.clubName}" class="club-logo">
                            <h3>${club.clubName}</h3>
                            <p>${club.clubDescription}</p>
                            <p>President: ${club.clubPresident}</p>
                            <p>Vice President: ${club.clubVicePresident}</p>
                        `;
                  
                        // Add the card to the results container
                        resultsContainer.appendChild(card);

                      })

          // Create a list of results
          // results.forEach((result) => {
          //     const listItem = document.createElement('div');
          //     listItem.textContent = result.clubName; // Customize this as needed
          //     resultsContainer.appendChild(listItem);
          // });

      } catch (error) {
          console.error('Error fetching search results:', error);
          alert('An error occurred while fetching search results.');
      }
  });
});
async function fetchAllEvents() {
  try {
      // Fetch all events from the server
      const response = await fetch(`/api/event/all`);
      const events = await response.json(); // Parse the JSON response

      // Get the gallery container where cards will be inserted
      const gallery = document.getElementById('event-gallery');

      // Iterate over all events and create a card for each
      events.forEach((event, index) => {
          // Create a card element
          const card = document.createElement('div');
          card.classList.add('gallery-item', 'grid-colum-span');
          // Set the ID for each card, using `event-card-{index}` to distinguish them
          card.id = `event-card-${index}`;
          // Set the card content
          let imageUrl = '';
          if (event.eventImage) {
              // Convert backslashes to forward slashes in the image URL
              imageUrl = event.eventImage.replace(/\\/g, '/');
          }
          card.innerHTML = `
              <div class=" grid-colum-span">
                      <div class="eventCard" style="background-image: url(${imageUrl});">
                          <div class="dateBlock">
                              <p class="day"><span>${event.eventDate.substring(8, 10)}</span>th</p>
                              <p class="month"><span>${event.eventDate.substring(5, 7)}</span></p>
                              <p class="year"><span>${event.eventDate.substring(0, 4)}</span></p>
                          </div>
                          <div class="titleBlock">
                              <h3>${event.eventName}</h3>
                          </div>
                      </div>
                  </a>
                  <div class="locationBlock">
                      <p class="location">Location: <span>${event.eventPlace}</span></p>
                      <p class="time">Time: <span>${event.eventTime}</span></p>
                  </div>
              </div>
          `;
          // Append the card to the gallery
          gallery.appendChild(card);
          // Add a click event listener to the card
          card.addEventListener("click", async function() {
              // Fetch the specific event information
              const eventResponse = await fetch(`/api/event/${event.idclubEvent}`);
              const eventData = await eventResponse.json();
              
              // Redirect to the event page with the event data as query parameters
              // Constructing the URL with query parameters
              window.location.href = `./ClubManager_Event_details.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
                  &clubName=${encodeURIComponent(eventData.clubName)}
                  &eventType=${encodeURIComponent(eventData.eventType)}
                  &eventName=${encodeURIComponent(eventData.eventName)}
                  &eventDate=${encodeURIComponent(eventData.eventDate)}
                  &eventSpeaker=${encodeURIComponent(eventData.eventSpeaker)}
                  &eventContent=${encodeURIComponent(eventData.eventContent)}
                  &eventPlace=${encodeURIComponent(eventData.eventPlace)}
                  &eventSpecialService=${encodeURIComponent(eventData.eventSpecialService)}
                  &eventImage=${encodeURIComponent(eventData.eventImage)}
                  &eventTime=${encodeURIComponent(eventData.eventTime)}
                  &eventApproval=${encodeURIComponent(eventData.eventApproval)}`;
          });
      });
  } catch (error) {
      console.error('Error fetching all events:', error);
  }
}

  // Fetch chunkedevents when the page loads
  window.addEventListener('load', fetchchunkedEvents);
  