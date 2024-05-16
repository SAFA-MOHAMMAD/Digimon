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
  /* ============================ */

  const selectBtn = document.querySelector(".select-btn"),
             items = document.querySelectorAll(".item");
   
       selectBtn.addEventListener("click", ()=> {
         selectBtn.classList.toggle("open");
       });
       items.forEach(item => {
         item.addEventListener("click", () =>{
           item.classList.toggle("checked");
         
           let checked = document.querySelectorAll(".checked"),
             btnText = document.querySelector(".btn-text");
   
             if(checked && checked.length > 0){
                btnText.innerText = `${checked.length} selected`;
               }else{
                 btnText.innerText = "select";
               }
   
         });
       })

// Function to retrieve the club ID and name from the URL
function getQueryParams() {
  // Parse query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  
  // Retrieve and decode query parameters
  const clubLogo = params.get('clubLogo');
  const clubName = params.get('clubName');
  
  // Decode and trim the parameters to remove extra spaces
  const decodedClubName = decodeURIComponent(clubName).trim();
  const decodedclubLogo = decodeURIComponent(clubLogo).trim();

  // Return the processed parameters
  return {
      clubLogo:decodedclubLogo,
      clubName: decodedClubName,
  };
}

async function fetchchunkedEvents() {
  const clubName = getQueryParams().clubName;
  const clubLogo=getQueryParams().clubLogo;
  console.log(clubName);

  try {
      // Fetch data from the server
      const response = await fetch(`/api/Event/events/club/${clubName}`);
      const Events = await response.json(); // Parse the JSON response
      const numberOfEvents=Events.length
      console.log(Events);
      // Get the gallery container where cards will be inserted
      const gallery = document.getElementById('event-gallery');
      // Iterate over the chunkedevents and create a card for each
      Events.forEach((event, index) => {
        if (numberOfEvents<index){
          window.location.reload();
        }
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
              window.location.href = `./Admin_Event_details.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
                  &clubName=${encodeURIComponent(eventData.clubName)}
                  &clubLogo=${encodeURIComponent(clubLogo)}
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

// Fetch chunkedevents when the page loads
window.addEventListener('load', fetchchunkedEvents);

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



document.addEventListener('DOMContentLoaded', function () {
  const clubName = getQueryParams().clubName;
  const clubLogo=getQueryParams().clubLogo;
  console.log('Search function entered')
  // Get the search input field and submit button elements
  const searchInput = document.getElementById('date');
  const submitButton = document.getElementById('submit');

  // Add an event listener to the submit button
  submitButton.addEventListener('click', async function (e) {
      e.preventDefault(); // Prevent the form from submitting the traditional way
console.log('submitButton clicked')
      // Get the search term from the input field
      const searchTerm = searchInput.value;
console.log(searchTerm)
      // Check if search term is empty
      if (!searchTerm) {
        return;
    }
      try {
          // Send an HTTP GET request to the search API endpoint
          const response = await fetch(`/api/Event/search/${searchTerm}/${clubName}`);
          const EventData = await response.json();
          console.log(EventData)
          

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

          
          const galleryContainer = document.getElementById('event-gallery');
          galleryContainer.innerHTML = ' ';
                    // Display results as cards
                    EventData.forEach(event => {
                      const card = document.createElement('div');
                      card.classList.add('gallery-item', 'grid-colum-span');
                       // Add a card class for styling
                        // Populate the card with club information
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
                  
                        // Add the card to the results container
                        resultsContainer.appendChild(card);
                        card.addEventListener("click", async function() {
                          // Fetch the specific event information
                          const eventResponse = await fetch(`/api/event/${event.idclubEvent}`);
                          const eventData = await eventResponse.json();
                          // Redirect to the event page with the event data as query parameters
                          // Constructing the URL with query parameters
                          window.location.href = `./Admin_Event_details.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
                              &clubName=${encodeURIComponent(eventData.clubName)}
                              &clubLogo=${encodeURIComponent(clubLogo)}
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
                      })

          // Create a list of results
          // results.forEach((result) => {
          //     const listItem = document.createElement('div');
          //     listItem.textContent = result.clubName; // Customize this as needed
          //     resultsContainer.appendChild(listItem);
          // });

      } catch (error) {
          console.error('Error fetching search results:', error);
      }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const clubName = getQueryParams().clubName;
  const clubLogo=getQueryParams().clubLogo;
  console.log('Search function entered')
  // Get the search input field and submit button elements
  const searchInput = document.getElementById('search');
  const submitButton = document.getElementById('submit');

  // Add an event listener to the submit button
  submitButton.addEventListener('click', async function (e) {
      e.preventDefault(); // Prevent the form from submitting the traditional way
console.log('submitButton clicked')
      // Get the search term from the input field
      const searchTerm = searchInput.value;
console.log(searchTerm)
      // Check if search term is empty
      if (!searchTerm) {
        return;
    }
      try {
          // Send an HTTP GET request to the search API endpoint
          const response = await fetch(`/api/Event/search/byname/${searchTerm}/${clubName}`);
          const EventData = await response.json();
          console.log(EventData)
          

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

          
          const galleryContainer = document.getElementById('event-gallery');
          galleryContainer.innerHTML = ' ';
                    // Display results as cards
                    EventData.forEach(event => {
                      const card = document.createElement('div');
                      card.classList.add('gallery-item', 'grid-colum-span');
                       // Add a card class for styling
                        // Populate the card with club information
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
                  
                        // Add the card to the results container
                        resultsContainer.appendChild(card);
                        card.addEventListener("click", async function() {
                          // Fetch the specific event information
                          const eventResponse = await fetch(`/api/event/${event.idclubEvent}`);
                          const eventData = await eventResponse.json();
                          // Redirect to the event page with the event data as query parameters
                          // Constructing the URL with query parameters
                          window.location.href = `./Admin_Event_details.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
                              &clubName=${encodeURIComponent(eventData.clubName)}
                              &clubLogo=${encodeURIComponent(clubLogo)}
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
                      })

          // Create a list of results
          // results.forEach((result) => {
          //     const listItem = document.createElement('div');
          //     listItem.textContent = result.clubName; // Customize this as needed
          //     resultsContainer.appendChild(listItem);
          // });

      } catch (error) {
          console.error('Error fetching search results:', error);
      }
  });
});