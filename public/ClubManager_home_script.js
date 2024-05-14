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

/* ============================= */

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
          const response = await fetch(`/api/Club/search/${searchTerm}`);
          const clubData = await response.json();
          console.log(clubData)
         

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
                        card.classList.add('gallery-item', 'grid-colum-span');
                
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
/* ============================= */

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

// Function to fetch data from the server and create club cards
async function fetchchunkedClubs() {
  try {
      // Fetch data from the server
      const response = await fetch('/api/Club/getAllClubs');
      const chunkedClubs = await response.json(); // Parse the JSON response

      // Get the gallery container where cards will be inserted
      const gallery = document.getElementById('club-gallery');

      // Iterate over the chunkedClubs and create a card for each
      chunkedClubs.forEach((clubs, index) => {
        clubs.forEach(club=>{
          // Create a card element
          const card = document.createElement('div');
          card.classList.add('gallery-item', 'grid-colum-span');
          
          // Set the ID for each card, using `club-card-{index}` to distinguish them
          card.id = `club-card-${index}`;

          // Set the card content
          card.innerHTML = `
              <img src="${club.clubLogo}" alt="${club.clubName}" class="club-logo">
              <h3>${club.clubName}</h3>
              <p>${club.clubDescription}</p>
              <p>President: ${club.clubPresident}</p>
              <p>Vice President: ${club.clubVicePresident}</p>
          `;

          // Append the card to the gallery
          gallery.appendChild(card);

          // Add a click event listener to the card
          card.addEventListener("click", async function() {
            // Fetch the specific club information
            const clubResponse = await fetch(`/api/Club/${club.clubID}`);
            const clubData = await clubResponse.json();
            
            // Redirect to the club page with the club data as query parameters
            // Constructing the URL with query parameters
            window.location.href = `./ClubManager_Club-Page.html?clubID=${club.clubID}
            &clubName=${encodeURIComponent(clubData.clubName)}
            &clubDescription=${encodeURIComponent(clubData.clubDescription)}
            &clubPresident=${encodeURIComponent(clubData.clubPresident)}
            &clubVicePresident=${encodeURIComponent(clubData.clubVicePresident)}
            &clubActivitiesInfo=${encodeURIComponent(clubData.clubActivitiesInfo)}
            &clubOfficialEmail=${encodeURIComponent(clubData.clubOfficialEmail)}
            &clubPresidentEmail=${encodeURIComponent(clubData.clubPresidentEmail)}
            &clubVicePresidentEmail=${encodeURIComponent(clubData.clubVicePresidentEmail)}
            &clubLogo=${encodeURIComponent(clubData.clubLogo)}`;
        });
      });
    })
  } catch (error) {
      console.error('Error fetching chunkedClubs:', error);
  }
}

// Fetch chunkedClubs when the page loads
window.addEventListener('load', fetchchunkedClubs);