let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let searchBtn = document.querySelector(".bx-search");

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
              window.location.href = `./Admin_Event_details.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
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
  
  // Fetch chunkedevents when the page loads
  window.addEventListener('load', fetchchunkedEvents);
  