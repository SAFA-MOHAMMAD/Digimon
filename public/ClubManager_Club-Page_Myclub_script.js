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

document.getElementById('club-card').addEventListener("click", function () {
  window.location.href = "../eve";
});
