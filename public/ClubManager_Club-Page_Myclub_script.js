let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
const deleteBtn = document.getElementById('deleteBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const clubName=document.getElementById('club-name');
const clubDescription=document.getElementById('club-description');
const clubPresident=document.getElementById('club-president-name');
const clubVicePresident=document.getElementById('club-viPresident-name');
const clubPresidentEmail=document.getElementById('club-president-email');
const clubVicePresidentEmail=document.getElementById('club-viPresident-email');
const clubinfo=document.getElementById('club-info');
const clubActivitiesInfo=document.getElementById('club-activities');
const clubLogo=document.getElementById('club-logo');




// Retrieve the user's email from session storage
const userEmail = sessionStorage.getItem('userEmail');
console.log('User email from session storage:', userEmail);
async function displayClubInfo(){
try {
  const MyClubResponse = await fetch(`/api/Club/getOneClubByemail/${userEmail}`);
  // Handle the response (e.g., check if it was successful, log errors, etc.)
  if (MyClubResponse.ok) {
      const MyClubData = await MyClubResponse.json();
      clubName.textContent=MyClubData.clubName;
      clubDescription.textContent=MyClubData.clubDescription;
      clubPresident.textContent=MyClubData.clubPresident
      clubVicePresident.textContent=MyClubData.clubVicePresident;
      clubPresidentEmail.textContent=MyClubData.clubPresidentEmail;
      clubVicePresidentEmail.textContent=MyClubData.clubVicePresidentEmail;
      clubinfo.textContent=MyClubData.clubDescription;
      clubActivitiesInfo.textContent=MyClubData.clubActivitiesInfo;
      clubLogo.src=MyClubData.clubLogo;
      const seeAllLink = document.querySelector('a[href="ClubManager_all-events.html"]');
  
  // Construct the new URL with the club ID as a query parameter
      const newUrl = `ClubManager_all-events.html?clubLogo=${encodeURIComponent(MyClubData.clubLogo)}
      &clubName=${encodeURIComponent(MyClubData.clubName)}`;
  
  // Update the href attribute of the "see all" link with the new URL
  seeAllLink.href = newUrl;
  const seeAllLinkP = document.querySelector('a[href="ClubManager_allPosts.html"]');
  
  // Construct the new URL with the club ID as a query parameter
  const newUrlp = `ClubManager_allPosts.html?clubLogo=${encodeURIComponent(MyClubData.clubLogo)}
  &clubName=${encodeURIComponent(MyClubData.clubName)}`;
  
  // Update the href attribute of the "see all" link with the new URL
  seeAllLinkP.href = newUrlp;

  try {
    // Fetch data from the server
    const response = await fetch(`/api/Event/events/club/${MyClubData.clubName}`);
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
            window.location.href = `./ClubManager_Event_details_myClub.html?idclubEvent=${encodeURIComponent(event.idclubEvent)}
            &clubName=${encodeURIComponent(eventData.clubName)}
            &clubLogo=${encodeURIComponent(MyClubData.clubLogo)}
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
};


try {
  // Fetch data from the server
  const response = await fetch(`/api/Post/posts/club/${MyClubData.clubName}`);
  const Posts = await response.json(); // Parse the JSON response
  console.log(Posts);

  // Get the gallery container where cards will be inserted
  const gallery = document.getElementById('post-gallery');

  // Iterate over the chunkedposts and create a card for each
  Posts.forEach((post, index) => {
      // Create a card element
      const card = document.createElement('div');
      card.classList.add('gallery-item', 'grid-colum-span');
      
      // Set the ID for each card, using `post-card-{index}` to distinguish them
      card.id = `post-card-${index}`;

      // Set the card content
      let imageUrl = '';
      if (post.postImage) {
          // Convert backslashes to forward slashes in the image URL
          imageUrl = post.postImage.replace(/\\/g, '/');
      }

      card.innerHTML = `
<div class="postCard" style="background-image: url(${imageUrl});">
<div class="dateBlock">
<p class="day" id="post-day">${post.postDate.substring(8, 10)}th</p>
<p class="month" id="post-month">${post.postDate.substring(5, 7)}</p>
<p class="year" id="post-year">${post.postDate.substring(0, 4)}</p>
</div>
<div class="titleBlock">
<h3 id="post-name">${post.postTitle}</h3>
</div>
</div>
`;

      // Append the card to the gallery
      gallery.appendChild(card);

      // Add a click post listener to the card
      card.addEventListener("click", async function() {
          // Fetch the specific post information
          const postResponse = await fetch(`/api/Post/${post.postID}`);
          const postData = await postResponse.json();
          
          // Redirect to the post page with the post data as query parameters
          // Constructing the URL with query parameters
          window.location.href = `./ClubManager_Post_details_myClub.html?postID=${encodeURIComponent(post.postID)}
          &clubName=${encodeURIComponent(postData.clubName)}
          &clubLogo=${encodeURIComponent(MyClubData.clubLogo)}
          &postDescription=${encodeURIComponent(postData.postDescription)}
          &postTitle=${encodeURIComponent(postData.postTitle)}
          &postDate=${encodeURIComponent(postData.postDate)}
          &postImage=${encodeURIComponent(postData.postImage)}`;
      });
  });
} catch (error) {
  console.error('Error fetching chunkedposts:', error);
}


      console.log('Notification created successfully:', MyClubData);
  } else {
      console.error('Failed to create notification:', MyClubResponse.statusText);
  }
} catch (error) {
  console.error('Error creating notification:', error);
}};
window.addEventListener('load', displayClubInfo);






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



  document.querySelector('.post-scroll-button-right').addEventListener('click', function() {
    document.querySelector('.post-gallery').scrollBy({
      top: 0,
      left: 600, // Change this value to adjust the scroll distance
      behavior: 'smooth'
    });
  });
  
  document.querySelector('.post-scroll-button-left').addEventListener('click', function() {
    document.querySelector('.post-gallery').scrollBy({
      top: 0,
      left: -600, // Change this value to adjust the scroll distance
      behavior: 'smooth'
    });
  });
  