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
// Function to show edit textarea and save button
// Function to resize textarea based on content
function resizeTextarea(textarea) {
textarea.style.height = 'auto'; // Reset height to auto
textarea.style.height = (textarea.scrollHeight) + 'px'; // Set height to scrollHeight
}

// Function to show edit textarea and save button
function toggleEdit() {

var PosterImage = document.getElementById('posterImg');
var guestName1 = document.getElementById('guestName1');
var guestContact1 = document.getElementById('guestContact1');
var guestName2 = document.getElementById('guestName2');
var guestContact2 = document.getElementById('guestContact2');
var EventDate = document.getElementById('EventDate');
var EventTime = document.getElementById('EventTime');
var EventLocation = document.getElementById('EventLocation');
var EventDescription = document.getElementById('EventDescription');

var editedPosterImage = document.getElementById('edited-posterImg');
var editedguestName1 = document.getElementById('edited-guestName1');
var editedguestContact1 = document.getElementById('edited-guestContact1');
var editedguestContact2 = document.getElementById('edited-guestContact2');
var editedguestName2 = document.getElementById('edited-guestName2');
var editedEventDate = document.getElementById('edited-EventDate');
var editedEventTime = document.getElementById('edited-EventTime');
var editedEventLocation = document.getElementById('edited-EventLocation');
var editedEventDescription = document.getElementById('edited-EventDescription');

var cancelButton = document.getElementById('cancel-button');
var editButton = document.getElementById('edit-button');
var saveButton = document.getElementById('save-button');

if (editButton.textContent === 'Edit') {
    editButton.style.display = 'none';
    saveButton.style.display = 'inline';
    cancelButton.style.display = 'inline';

    editedguestName1.value = guestName1.textContent.trim();
    editedguestContact1.value = guestContact1.textContent.trim(); 
    editedguestName2.value = guestName2.textContent.trim();
    editedguestContact2.value = guestContact2.textContent.trim();
    editedEventDate.value = EventDate.textContent.trim();
    editedEventTime.value = EventTime.textContent.trim();
    editedEventLocation.value = EventLocation.textContent.trim();
    editedEventDescription.value = EventDescription.textContent.trim();

    editedPosterImage.value = ''; // Clear input value to prevent re-uploading same image
    

    editedPosterImage.style.display = 'block';
    guestName1.style.display = 'none';
    editedguestName1.style.display = 'inline';
    guestContact1.style.display = 'none';
    editedguestContact1.style.display = 'inline';
    
    guestName2.style.display = 'none';
    editedguestName2.style.display = 'inline';
    guestContact2.style.display = 'none';
    editedguestContact2.style.display = 'inline';
    
    EventDate.style.display = 'none';
    editedEventDate.style.display = 'inline';
    EventTime.style.display = 'none';
    editedEventTime.style.display = 'inline';
    EventLocation.style.display = 'none';
    editedEventLocation.style.display = 'inline';

    EventDescription.style.display = 'none';
    editedEventDescription.style.display = 'block';



    // Resize textarea initially
    resizeTextarea(editedEventDescription);

  }
}

function saveEdit(){
    var PosterImage = document.getElementById('posterImg');
    var guestName1 = document.getElementById('guestName1');
    var guestContact1 = document.getElementById('guestContact1');
    var guestName2 = document.getElementById('guestName2');
    var guestContact2 = document.getElementById('guestContact2');
    var EventDate = document.getElementById('EventDate');
    var EventTime = document.getElementById('EventTime');
    var EventLocation = document.getElementById('EventLocation');
    var EventDescription = document.getElementById('EventDescription');

    var editedPosterImage = document.getElementById('edited-posterImg');
    var editedguestName1 = document.getElementById('edited-guestName1');
    var editedguestContact1 = document.getElementById('edited-guestContact1');
    var editedguestContact2 = document.getElementById('edited-guestContact2');
    var editedguestName2 = document.getElementById('edited-guestName2');
    var editedEventDate = document.getElementById('edited-EventDate');
    var editedEventTime = document.getElementById('edited-EventTime');
    var editedEventLocation = document.getElementById('edited-EventLocation');
    var editedEventDescription = document.getElementById('edited-EventDescription');

    guestName1.textContent = editedguestName1.value.trim();
    guestContact1.textContent = editedguestContact1.value.trim();
    
    guestName2.textContent = editedguestName2.value.trim();
    guestContact2.textContent = editedguestContact2.value.trim();
    
    EventDate.textContent = editedEventDate.value.trim();
    EventTime.textContent = editedEventTime.value.trim();
    EventLocation.textContent = editedEventLocation.value.trim();
    EventDescription.textContent = editedEventDescription.value.trim();
    
  

    if (editedPosterImage.files.length > 0) {
      var reader = new FileReader();
      reader.onload = function(e) {
        PosterImage.src = e.target.result;
      };
      reader.readAsDataURL(editedPosterImage.files[0]);
    }
    
    editedPosterImage.style.display = 'none';
    editedPosterImage.style.display = 'block';
    guestName1.style.display = 'inline';
    editedguestName1.style.display = 'none';
    guestContact1.style.display = 'inline';
    editedguestContact1.style.display = 'none';
  
    guestName2.style.display = 'inline';
    editedguestName2.style.display = 'none';
    guestContact2.style.display = 'inline';
    editedguestContact2.style.display = 'none';
    
    EventDate.style.display = 'inline';
    editedEventDate.style.display = 'none';
    EventTime.style.display = 'inline';
    editedEventTime.style.display = 'none';
    EventLocation.style.display = 'inline';
    editedEventLocation.style.display = 'none';

    EventDescription.style.display = 'block';
    editedEventDescription.style.display = 'none';

    var editButton = document.getElementById('edit-button');
    var cancelButton = document.getElementById('cancel-button');
    var saveButton = document.getElementById('save-button');

    editButton.style.display = 'inline';
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
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

