let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
const deleteBtn = document.getElementById('deleteBtn');
const saveBtn = document.getElementById('save-button');
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

/* ======================================================= */
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
/* ======================================================= */

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
  /* ========================================================================== */
// Function to resize textarea based on content
function resizeTextarea(textarea) {
textarea.style.height = 'auto'; // Reset height to auto
textarea.style.height = (textarea.scrollHeight) + 'px'; // Set height to scrollHeight
}

// Function to show edit textarea and save button
function toggleEdit() {
var clubName = document.getElementById('club-name');
var clubDescription = document.getElementById('club-description');
var clubActivities = document.getElementById('club-activities');
var clubImage = document.getElementById('club-logo');
var ClubPresident = document.getElementById('club-president-name');
var ContactInfo = document.getElementById('club-president-email');
var ClubVicePresident = document.getElementById('club-viPresident-name');
var VicePresidentContactInfo = document.getElementById('club-viPresident-email');
var phoneNumber = document.getElementById('phone-number');
var instgramUsername = document.getElementById('instgram-username');
var clubEmail = document.getElementById('email');

var editedClubName = document.getElementById('edited-club-name');
var editedDescription = document.getElementById('edited-description');
var editedActivities = document.getElementById('edited-activities');
var editedImage = document.getElementById('edited-image');
var editedClubPresident = document.getElementById('edited-president-name');
var editedContactInfo = document.getElementById('edited-president-email');
var editedClubVicePresident = document.getElementById('edited-viPresident-name');
var editedViceContactInfo = document.getElementById('edited-viPresident-email');
var editedPhoneNumber = document.getElementById('edited-phone-number');
var editedInstgramUsername = document.getElementById('edited-instgram-username');
var editedClubEmail = document.getElementById('edited-email');

var editButton = document.getElementById('edit-button');
var cancelButton = document.getElementById('cancel-button');
var saveButton = document.getElementById('save-button');

if (editButton.textContent === 'Edit') {
  editedClubName.value = clubName.textContent.trim();
  editedDescription.value = clubDescription.textContent.trim();
  editedActivities.value = clubActivities.textContent.trim();
  editedClubPresident.value = ClubPresident.textContent.trim();
  editedContactInfo.value = ContactInfo.textContent.trim();
  editedClubVicePresident.value = ClubVicePresident.textContent.trim();
  editedViceContactInfo.value = VicePresidentContactInfo.textContent.trim();
  editedPhoneNumber.value = phoneNumber.textContent.trim();
  editedInstgramUsername.value = instgramUsername.textContent.trim();
  editedClubEmail.value = clubEmail.textContent.trim();

  editedImage.value = ''; // Clear input value to prevent re-uploading same image

  clubName.style.display = 'none';
  clubDescription.style.display = 'none';
  clubActivities.style.display = 'none';
  editedClubName.style.display = 'inline';
  editedDescription.style.display = 'block';
  editedActivities.style.display = 'block';
  editedImage.style.display = 'block';

  ClubPresident.style.display = 'none';
  ContactInfo.style.display = 'none';
  ClubVicePresident.style.display = 'none';
  VicePresidentContactInfo.style.display = 'none';
  editedClubPresident.style.display = 'inline';
  editedContactInfo.style.display = 'inline';
  editedClubVicePresident.style.display = 'inline';
  editedViceContactInfo.style.display = 'inline';

  phoneNumber.style.display = 'none';
  instgramUsername.style.display = 'none';
  clubEmail.style.display = 'none';
  editedPhoneNumber.style.display = 'inline';
  editedInstgramUsername.style.display = 'inline';
  editedClubEmail.style.display = 'inline';

  saveButton.style.display = 'inline';
  cancelButton.style.display = 'inline';
  editButton.style.display = 'none';

  // Resize textarea initially
  resizeTextarea(editedDescription);
  resizeTextarea(editedActivities);
}
}

function saveEdit() {
var clubName = document.getElementById('club-name');
var clubDescription = document.getElementById('club-description');
var clubActivities = document.getElementById('club-activities');
var clubImage = document.getElementById('club-logo');
var ClubPresident = document.getElementById('club-president-name');
var ContactInfo = document.getElementById('club-president-email');
var ClubVicePresident = document.getElementById('club-viPresident-name');
var VicePresidentContactInfo = document.getElementById('club-viPresident-email');
var phoneNumber = document.getElementById('phone-number');
var instgramUsername = document.getElementById('instgram-username');
var clubEmail = document.getElementById('email');

var editedClubName = document.getElementById('edited-club-name');
var editedDescription = document.getElementById('edited-description');
var editedActivities = document.getElementById('edited-activities');
var editedImage = document.getElementById('edited-image');
var editedClubPresident = document.getElementById('edited-president-name');
var editedContactInfo = document.getElementById('edited-president-email');
var editedClubVicePresident = document.getElementById('edited-viPresident-name');
var editedViceContactInfo = document.getElementById('edited-viPresident-email');
var editedPhoneNumber = document.getElementById('edited-phone-number');
var editedInstgramUsername = document.getElementById('edited-instgram-username');
var editedClubEmail = document.getElementById('edited-email');

clubName.textContent = editedClubName.value.trim();
clubDescription.textContent = editedDescription.value.trim();
clubActivities.textContent = editedActivities.value.trim();

ClubPresident.textContent = editedClubPresident.value.trim();
ContactInfo.textContent = editedContactInfo.value.trim();
ClubVicePresident.textContent = editedClubVicePresident.value.trim();
VicePresidentContactInfo.textContent = editedViceContactInfo.value.trim();

phoneNumber.textContent = editedPhoneNumber.value.trim();
instgramUsername.textContent = editedInstgramUsername.value.trim();
clubEmail.textContent = editedClubEmail.value.trim();

// Update image if a new one is selected
if (editedImage.files.length > 0) {
  var reader = new FileReader();
  reader.onload = function (e) {
    clubImage.src = e.target.result;
  };
  reader.readAsDataURL(editedImage.files[0]);
}

clubName.style.display = 'inline';
clubDescription.style.display = 'block';
clubActivities.style.display = 'block';
editedDescription.style.display = 'none';
editedActivities.style.display = 'none';
editedImage.style.display = 'none';
editedClubName.style.display = 'none';

ClubPresident.style.display = 'inline';
ContactInfo.style.display = 'inline';
ClubVicePresident.style.display = 'inline';
VicePresidentContactInfo.style.display = 'inline';
editedClubPresident.style.display = 'none';
editedContactInfo.style.display = 'none';
editedClubVicePresident.style.display = 'none';
editedViceContactInfo.style.display = 'none';

phoneNumber.style.display = 'inline';
instgramUsername.style.display = 'inline';
clubEmail.style.display = 'inline';
editedPhoneNumber.style.display = 'none';
editedInstgramUsername.style.display = 'none';
editedClubEmail.style.display = 'none';

var editButton = document.getElementById('edit-button');
var cancelButton = document.getElementById('cancel-button');
var saveButton = document.getElementById('save-button');

editButton.style.display = 'inline';
cancelButton.style.display = 'none';
saveButton.style.display = 'none';
}

function cancelEdit() {
var editButton = document.getElementById('edit-button');
editButton.textContent = 'Edit'; // Reset edit button text
toggleEdit(); // Call toggleEdit to reset changes
}

// Event listener for edit button
document.getElementById('edit-button').addEventListener('click', toggleEdit);

// Event listener for save button
document.getElementById('save-button').addEventListener('click', saveEdit);



// Retrieve the user's email from session storage
const userEmail = sessionStorage.getItem('userEmail');
console.log('User email from session storage:', userEmail);
async function displayClubInfo(){
  const clubName=document.getElementById('club-name');
const clubDescription=document.getElementById('club-description');
const clubPresident=document.getElementById('club-president-name');
const clubVicePresident=document.getElementById('club-viPresident-name');
const clubPresidentEmail=document.getElementById('club-president-email');
const clubVicePresidentEmail=document.getElementById('club-viPresident-email');
const club_email=document.getElementById('email');
const clubinfo=document.getElementById('club-info');
const clubActivitiesInfo=document.getElementById('club-activities');
const clubLogo=document.getElementById('club-logo');

try {
  const MyClubResponse = await fetch(`/api/Club/getOneClubByemail/${userEmail}`);
  // Handle the response (e.g., check if it was successful, log errors, etc.)
  if (MyClubResponse.ok) {
      const MyClubData = await MyClubResponse.json();
      const clubID=MyClubData.clubID
      clubName.textContent=MyClubData.clubName;
      clubDescription.textContent=MyClubData.clubDescription;
      clubPresident.textContent=MyClubData.clubPresident
      clubVicePresident.textContent=MyClubData.clubVicePresident;
      clubPresidentEmail.textContent=MyClubData.clubPresidentEmail;
      clubVicePresidentEmail.textContent=MyClubData.clubVicePresidentEmail;
      club_email.textContent = MyClubData.clubOfficialEmail;
      clubinfo.textContent=MyClubData.clubDescription;
      clubActivitiesInfo.textContent=MyClubData.clubActivitiesInfo;
      clubLogo.src=MyClubData.clubLogo;
      const seeAllLink = document.querySelector('a[href="ClubManager_all-events_Myclub.html"]');
  
  // Construct the new URL with the club ID as a query parameter
      const newUrl = `ClubManager_all-events_Myclub.html?clubLogo=${encodeURIComponent(MyClubData.clubLogo)}
      &clubName=${encodeURIComponent(MyClubData.clubName)}`;
  
  // Update the href attribute of the "see all" link with the new URL
  seeAllLink.href = newUrl;
  const seeAllLinkP = document.querySelector('a[href="ClubManager_allPosts_Myclub.html"]');
  
  // Construct the new URL with the club ID as a query parameter
  const newUrlp = `ClubManager_allPosts_Myclub.html?clubLogo=${encodeURIComponent(MyClubData.clubLogo)}
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
            <a href="ClubManager_Event_details_myClub.html?id=${event.idclubEvent}" id="event-card-link">
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
            &clubLogo=${encodeURIComponent(MyClubData.clubLogo)}
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
          &clubLogo=${encodeURIComponent(MyClubData.clubLogo)}
          &clubName=${encodeURIComponent(postData.clubName)}
          &postDescription=${encodeURIComponent(postData.postDescription)}
          &postTitle=${encodeURIComponent(postData.postTitle)}
          &postDate=${encodeURIComponent(postData.postDate)}
          &postImage=${encodeURIComponent(postData.postImage)}`;
      });
  });
  deleteBtn.addEventListener('click', async function(event) {
    // Prevent default behavior (page reload)
  console.log('Cancel button clicked');
  event.preventDefault();
  try {
        const response = await fetch(`/api/Club/${clubID}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Club deleted successfully.');
            // Redirect to home page or desired page after successful deletion
            window.location.href = './Admin_home.html';
        } else {
            alert('Failed to delete club.');
        }
    } catch (error) {
        console.error('Error deleting club:', error);
    }
  });

  

  saveBtn.addEventListener('click', async function(event) {
    // Prevent default behavior (page reload)
    event.preventDefault();
    const formData = new FormData();
    try {
        // Gather updated information from the inputs
        const updatedData = {
            clubName: document.getElementById('edited-club-name').value.trim(),
            clubDescription: document.getElementById('edited-description').value.trim(),
            clubActivitiesInfo: document.getElementById('edited-activities').value.trim(),
            clubPresident: document.getElementById('edited-president-name').value.trim(),
            clubPresidentEmail: document.getElementById('edited-president-email').value.trim(),
            clubVicePresident: document.getElementById('edited-viPresident-name').value.trim(),
            clubVicePresidentEmail: document.getElementById('edited-viPresident-email').value.trim(),
            clubOfficialEmail: document.getElementById('edited-email').value.trim(),
            // Include other fields as necessary
        };
        const clubLogoInput = document.getElementById('edited-image');
        if (clubLogoInput.files && clubLogoInput.files.length > 0) {
          formData.append('clubLogo', clubLogoInput.files[0]);
          console.log(`show value: ${clubLogoInput.files[0]}`);
      }
        console.log('Updated data:', updatedData);
      console.log('Initialized formData:', formData);
  for (const [key, value] of Object.entries(updatedData)) {
      formData.append(key, value);
      console.log(`Appended key: ${key}, value: ${value}`);
  }
  for (const [key, value] of formData) {
    console.log(`show key: ${key}, show value: ${value}`);
  }
        console.log('Update query conditions:', { clubID });
        // Send a PATCH request to the server with the updated data
        const response = await fetch(`/api/Club/${clubID}`, {
            method: 'PUT',
            body: formData,
            headers: {
            'Accept': 'application/json' // Specify the content type the server should respond with
            }
        });
        // Check the server response
        if (response.ok) {
            alert('Club updated successfully.');
            // Refresh the page data
            const updatedClub = await response.json();
            try {
              const notificationResponse = await fetch('/api/Notification/notifications', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      message: updatedClub.clubDescription,
                      Title: updatedClub.clubName,
                      Image:updatedClub.clubLogo
                  })
              });
              // Handle the response (e.g., check if it was successful, log errors, etc.)
              if (notificationResponse.ok) {
                  const notificationData = await notificationResponse.json();
                  console.log('Notification created successfully:', notificationData);
              } else {
                  console.error('Failed to create notification:', notificationResponse.statusText);
              }
          } catch (error) {
              console.error('Error creating notification:', error);
          }
        } else {
            alert('Failed to update club.');
        }
    } catch (error) {
        console.error('Error updating club:', error);
    }
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
