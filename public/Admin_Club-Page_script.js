let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
const deleteBtn = document.getElementById('deleteBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');


// Function to set the club ID in the "see all" link
function setClubIDInSeeAllLink() {
  // Get the URL of the current page
  const currentUrl = window.location.href;
  
  // Parse the query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  
  // Get the club ID from the query parameters
  const clubID = params.get('clubID');
  const clubName = params.get('clubName');

  
  // Get the "see all" link element
  const seeAllLink = document.querySelector('a[href="Admin_all-events.html"]');
  
  // Construct the new URL with the club ID as a query parameter
  const newUrl = `Admin_all-events.html?clubID=${encodeURIComponent(clubID)}&clubName=${encodeURIComponent(clubName)}`;
  
  // Update the href attribute of the "see all" link with the new URL
  seeAllLink.href = newUrl;
}

// Call the function when the page loads to set the club ID in the "see all" link
window.addEventListener('load', setClubIDInSeeAllLink);

function setClubIDInSeeAllPost() {
  // Get the URL of the current page
  const currentUrl = window.location.href;
  
  // Parse the query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  
  // Get the club ID from the query parameters
  const clubID = params.get('clubID');
  const clubName = params.get('clubName');

  
  // Get the "see all" link element
  const seeAllLink = document.querySelector('a[href="Admin_allPosts.html"]');
  
  // Construct the new URL with the club ID as a query parameter
  const newUrl = `Admin_allPosts.html?clubID=${encodeURIComponent(clubID)}&clubName=${encodeURIComponent(clubName)}`;
  
  // Update the href attribute of the "see all" link with the new URL
  seeAllLink.href = newUrl;
}

// Call the function when the page loads to set the club ID in the "see all" link
window.addEventListener('load', setClubIDInSeeAllPost);

function getQueryParams() {
  console.log('getQueryParams function called');
  const params = new URLSearchParams(window.location.search);
  const clubID = params.get('clubID');
  const clubName = params.get('clubName');
  const clubDescription = params.get('clubDescription');
  const clubPresident = params.get('clubPresident');
  const clubVicePresident = params.get('clubVicePresident');
  const clubActivitiesInfo = params.get('clubActivitiesInfo');
  const clubOfficialEmail = params.get('clubOfficialEmail');
  const clubPresidentEmail = params.get('clubPresidentEmail');
  const clubVicePresidentEmail = params.get('clubVicePresidentEmail');
  const clubLogo = params.get('clubLogo');
  console.log('clubID:', clubID, 'clubName:', clubName, 'clubDescription:', clubDescription);
  
  return {
      clubID,
      clubName,
      clubDescription,
      clubPresident,
      clubVicePresident,
      clubActivitiesInfo,
      clubOfficialEmail,
      clubPresidentEmail,
      clubVicePresidentEmail,
      clubLogo
  };
}
// Function to display club information on the page
function displayClubInfo() {
const clubData = getQueryParams();
  // Update the HTML elements with the club data
document.getElementById('club-name').textContent = clubData.clubName;
document.getElementById('club-description').textContent = clubData.clubDescription;
document.getElementById('club-president-name').textContent = clubData.clubPresident;
document.getElementById('club-viPresident-name').textContent = clubData.clubVicePresident;
document.getElementById('club-president-email').textContent = clubData.clubPresidentEmail;
document.getElementById('club-viPresident-email').textContent = clubData.clubVicePresidentEmail;
document.getElementById('club-info').textContent = clubData.clubDescription;
document.getElementById('club-activities').textContent = clubData.clubActivitiesInfo;
document.getElementById('club-logo').src = clubData.clubLogo;
}

// Call the displayClubInfo function when the page loads

window.addEventListener('load', displayClubInfo);

// Event listener for edit button
// Get the buttons from the HTML
const clubData = getQueryParams();
// Get the club ID 
const clubID = clubData.clubID;
// Function to handle the deletion of a club
// Event listener for the delete button
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
          window.location.href = './home.html';
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
          clubActivities: document.getElementById('edited-activities').value.trim(),
          clubPresident: document.getElementById('edited-president-name').value.trim(),
          clubPresidentEmail: document.getElementById('edited-president-email').value.trim(),
          clubVicePresident: document.getElementById('edited-viPresident-name').value.trim(),
          clubVicePresidentEmail: document.getElementById('edited-viPresident-email').value.trim(),
          // Include other fields as necessary
          //clubLogo: document.getElementById('edited-image').files[0] // Only append file if provided
      };
      const clubLogoInput = document.getElementById('edited-image');
      //console.log('clubLogo input:', clubLogoInput);
      //console.log('clubLogo files:', clubLogoInput.files);
      if (clubLogoInput.files && clubLogoInput.files.length > 0) {
        formData.append('clubLogo', clubLogoInput.files[0]);
        console.log(`show value: ${clubLogoInput.files[0]}`);
    }
    
      console.log('Updated data:', updatedData);
      // Create a FormData object to handle file upload if there's a new image
      //const formData = new FormData();

    console.log('Initialized formData:', formData);
for (const [key, value] of Object.entries(updatedData)) {
    formData.append(key, value);
    console.log(`Appended key: ${key}, value: ${value}`);
    //console.log('FormData object:', formData);
}
for (const [key, value] of formData) {
  console.log(`show key: ${key}, show value: ${value}`);
  //console.log('FormData object:', formData);
}
      console.log('Update query conditions:', { clubID });
      // Send a PUT request to the server with the updated data
      const response = await fetch(`/api/Club/${clubID}`, {
          method: 'PATCH',
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
          // Update the URL with the new data using pushState
    //       const newUrl = `/Club?clubID=${updatedClub.clubID}
    // &clubName=${encodeURIComponent(updatedClub.clubName)}
    // &clubDescription=${encodeURIComponent(updatedClub.clubDescription)}
    // &clubPresident=${encodeURIComponent(updatedClub.clubPresident)}
    // &clubVicePresident=${encodeURIComponent(updatedClub.clubVicePresident)}
    // &clubActivitiesInfo=${encodeURIComponent(updatedClub.clubActivitiesInfo)}
    // &clubOfficialEmail=${encodeURIComponent(updatedClub.clubOfficialEmail)}
    // &clubPresidentEmail=${encodeURIComponent(updatedClub.clubPresidentEmail)}
    // &clubVicePresidentEmail=${encodeURIComponent(updatedClub.clubVicePresidentEmail)}
    // &clubLogo=${encodeURIComponent(updatedClub.clubLogo)}`;
    // console.log('Updated club:', updatedClub);
    // window.location.replace(newUrl);
// Replace the current URL with the new URL
//window.location.href = './Admin_home.html';
          // Optionally, reload the page if needed
          // window.location.reload();
      } else {
          alert('Failed to update club.');
      }
  } catch (error) {
      console.error('Error updating club:', error);
  }
});


// Event listener for the cancel button
cancelBtn.addEventListener('click', function(event) {
  // Prevent default behavior (page reload)
  event.preventDefault();
  
  // Navigate back to the previous page
  window.history.back();
});

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
   // Function to show edit textarea and save button
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
  var editButton = document.getElementById('edit-button');
  var editedClubPresident = document.getElementById('edited-president-name');
  var editedContactInfo = document.getElementById('edited-president-email');
  var editedClubVicePresident = document.getElementById('edited-viPresident-name');
  var editedViceContactInfo = document.getElementById('edited-viPresident-email');
  var editedPhoneNumber = document.getElementById('edited-phone-number');
  var editedInstgramUsername = document.getElementById('edited-instgram-username');
  var editedClubEmail = document.getElementById('edited-email');
  
  if (editButton.textContent === 'Edit') {
      editedClubName.value = clubName.textContent.trim();
      editedDescription.value = clubDescription.textContent.trim();
      editedActivities.value = clubActivities.textContent.trim();
      editedClubPresident.value = ClubPresident.textContent.trim();
      editedContactInfo.value = ContactInfo.textContent.trim();
      editedClubVicePresident.value =  ClubVicePresident.textContent.trim();
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
      editButton.textContent = 'Save';

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



      // Resize textarea initially
      resizeTextarea(editedDescription);
      resizeTextarea(editedActivities);
  } else {
      clubName.textContent = editedClubName.value.trim();
      clubDescription.textContent = editedDescription.value.trim();
      clubActivities.textContent = editedActivities.value.trim();

      ClubPresident.textContent = editedClubPresident.value.trim();
      ContactInfo.textContent = editedContactInfo.value.trim();
      ClubVicePresident.textContent = editedClubVicePresident.value.trim();
      VicePresidentContactInfo.textContent = editedViceContactInfo.value.trim();

      phoneNumber.textContent = editedPhoneNumber.value.trim();
      instgramUsername.textContent = editedInstgramUsername.value.trim();
      clubEmail.textContent =  editedClubEmail.value.trim();

      // Update image if a new one is selected
      if (editedImage.files.length > 0) {
          var reader = new FileReader();
          reader.onload = function(e) {
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
      editButton.textContent = 'Edit';
      
      phoneNumber.style.display = 'inline';
      instgramUsername.style.display = 'inline';
      clubEmail.style.display = 'inline';
      editedPhoneNumber.style.display = 'none';
      editedInstgramUsername.style.display = 'none';
      editedClubEmail.style.display = 'none';

  }
}

// Event listener for edit button
document.getElementById('edit-button').addEventListener('click', toggleEdit);
