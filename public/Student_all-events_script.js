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
/* ============================================= */


// Function to retrieve the club ID from the URL
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
  const clubLogo=getQueryParams().clubLogo
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
              <a href="Student_Event_details.html?id=${event.idclubEvent}" id="event-card-link">
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
              window.location.href = `./Student_Event_details.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
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
                            <a href="Student_Event_details.html?id=${event.idclubEvent}" id="event-card-link">
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
                          window.location.href = `./Student_Event_details.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
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
                            <a href="Student_Event_details.html?id=${event.idclubEvent}" id="event-card-link">
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
                          window.location.href = `./Student_Event_details.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
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