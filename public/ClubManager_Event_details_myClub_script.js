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
var guestName = document.getElementById('guestName');
var EventDate = document.getElementById('EventDate');
var EventTime = document.getElementById('EventTime');
var EventLocation = document.getElementById('EventLocation');
var EventDescription = document.getElementById('EventDescription');

var editedPosterImage = document.getElementById('edited-posterImg');
var editedguestName1 = document.getElementById('edited-guestName1');
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

    editedguestName1.value = guestName.textContent.trim();
    editedEventDate.value = EventDate.textContent.trim();
    editedEventTime.value = EventTime.textContent.trim();
    editedEventLocation.value = EventLocation.textContent.trim();
    editedEventDescription.value = EventDescription.textContent.trim();

    editedPosterImage.value = ''; // Clear input value to prevent re-uploading same image
    

    editedPosterImage.style.display = 'block';
    guestName.style.display = 'none';
    editedguestName1.style.display = 'inline';
    
    
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
    var guestName = document.getElementById('guestName');
    var EventDate = document.getElementById('EventDate');
    var EventTime = document.getElementById('EventTime');
    var EventLocation = document.getElementById('EventLocation');
    var EventDescription = document.getElementById('EventDescription');

    var editedPosterImage = document.getElementById('edited-posterImg');
    var editedguestName1 = document.getElementById('edited-guestName1');
    var editedEventDate = document.getElementById('edited-EventDate');
    var editedEventTime = document.getElementById('edited-EventTime');
    var editedEventLocation = document.getElementById('edited-EventLocation');
    var editedEventDescription = document.getElementById('edited-EventDescription');

    guestName.textContent = editedguestName1.value.trim();
    
    
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
    guestName.style.display = 'inline';
    editedguestName1.style.display = 'none';
    
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




function getQueryParams() {
  console.log('getQueryParams function called');
  const params = new URLSearchParams(window.location.search);
  const idclubEvent = params.get('idclubEvent');
  const clubLogo = params.get('clubLogo');
  const clubName = params.get('clubName');
  const eventType = params.get('eventType');
  const eventName = params.get('eventName');
  const eventDate = params.get('eventDate');
  const eventSpeaker = params.get('eventSpeaker');
  const eventContent = params.get('eventContent');
  const eventPlace = params.get('eventPlace');
  const eventSpecialService = params.get('eventSpecialService');
  const eventImage = params.get('eventImage');
  const eventTime = params.get('eventTime');
  const eventApproval = params.get('eventApproval');
  console.log('idclubEvent:', idclubEvent, 'clubName:', clubName, 'eventName:', eventName);
  
  return {
    idclubEvent,
      clubLogo,
      clubName,
      eventType,
      eventName,
      eventDate,
      eventSpeaker,
      eventContent,
      eventPlace,
      eventSpecialService,
      eventImage,
      eventTime,
      eventApproval
  };
}
    // Function to display event information on the page
    function displayEventInfo() {
      const eventData = getQueryParams();
        // Update the HTML elements with the club data
      document.getElementById('clubLogo').src = eventData.clubLogo;
      document.getElementById('clubNameImg').textContent = eventData.clubName;
      document.getElementById('posterImg').src = eventData.eventImage;
      document.getElementById('guestName').textContent = eventData.eventSpeaker;
      document.getElementById('EventDate').textContent = eventData.eventDate;
      document.getElementById('EventTime').textContent = eventData.eventTime;
      document.getElementById('EventLocation').textContent = eventData.eventPlace;
      document.getElementById('EventDescription').textContent = eventData.eventContent;
      }
    
    // Call the displayEventInfo function when the page loads
    
    window.addEventListener('load', displayEventInfo);
    
    const eventData = getQueryParams();
    // Get the club ID 
    const idclubEvent = eventData.idclubEvent;
    // Function to handle the deletion of a club
    // Event listener for the delete button
    deleteBtn.addEventListener('click', async function(event) {
      // Prevent default behavior (page reload)
    event.preventDefault();
    try {
          const response = await fetch(`/api/Event/${idclubEvent}`, {
              method: 'DELETE'
          });
          
          if (response.ok) {
              alert('event deleted successfully.');
              // Redirect to home page or desired page after successful deletion
              window.location.href = `./ClubManager_Club-Page_Myclub.html`;
          } else {
              alert('Failed to delete event.');
          }
      } catch (error) {
          console.error('Error deleting event:', error);
      }
    });
    saveBtn.addEventListener('click', async function(event) {
      // Prevent default behavior (page reload)
      event.preventDefault();
      
      const formData = new FormData();
      
      try {
          // Gather updated information from the inputs
          const updatedData = {
              guestName: document.getElementById('edited-guestName1').value.trim(),
              eventDescription: document.getElementById('edited-EventDescription').value.trim(),
              eventDate: document.getElementById('edited-EventDate').value.trim(),
              eventTime: document.getElementById('edited-EventTime').value.trim(),
              eventPlace: document.getElementById('edited-EventLocation').value.trim(),
              // Include other fields as necessary
          };
          const EventPosterInput = document.getElementById('edited-posterImg');
          if (EventPosterInput.files && EventPosterInput.files.length > 0) {
            formData.append('eventImage', EventPosterInput.files[0]);
            console.log(`show value: ${EventPosterInput.files[0]}`);
        }
          // Append updated data to the form data
          for (const [key, value] of Object.entries(updatedData)) {
              formData.append(key, value);
          }
           // Send a PUT request to update the event data
          const response = await fetch(`/api/Event/${idclubEvent}`, {
              method: 'PUT',
              body: formData,
              headers: {
                  'Accept': 'application/json', // Specify the content type the server should respond with
              },
          });
          // Check the server response
          if (response.ok) {
              alert('Event updated successfully.');
              // Optionally, refresh the page or update the UI with the updated event data
          } else {
              alert('Failed to update event.');
          }
      } catch (error) {
          console.error('Error updating event:', error);
      }
  });
  