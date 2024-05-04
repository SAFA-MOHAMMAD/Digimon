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

// Function to retrieve the club ID from the URL
function getQueryParams() {
  // Parse query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  
  // Retrieve and decode query parameters
  const clubID = params.get('clubID');
  const clubName = params.get('clubName');
  
  // Decode and trim the parameters to remove extra spaces
  const decodedClubName = decodeURIComponent(clubName).trim();
  
  // Return the processed parameters
  return {
      clubID,
      clubName: decodedClubName,
  };
}

async function fetchchunkedEvents() {
  const clubName = getQueryParams().clubName;
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

