let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
const deleteBtn = document.getElementById('deleteBtn');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

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

// const selectBtn = document.querySelector(".select-btn"),
//            items = document.querySelectorAll(".item");
 
//      selectBtn.addEventListener("click", ()=> {
//        selectBtn.classList.toggle("open");
//      });
//      items.forEach(item => {
//        item.addEventListener("click", () =>{
//          item.classList.toggle("checked");
       
//          let checked = document.querySelectorAll(".checked"),
//            btnText = document.querySelector(".btn-text");
 
//            if(checked && checked.length > 0){
//               btnText.innerText = `${checked.length} selected`;
//              }else{
//                btnText.innerText = "select";
//              }
 
//        });
//      })

function getQueryParams() {
      console.log('getQueryParams function called');
      const params = new URLSearchParams(window.location.search);
      const idclubEvent = params.get('idclubEvent');
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
    document.getElementById('clubNameImg').textContent = eventData.clubName;
    document.getElementById('posterImg').src = eventData.eventImage;
    document.getElementById('guestName').textContent = eventData.eventSpeaker;
    document.getElementById('InfoDate').textContent = eventData.eventDate;
    document.getElementById('infoTime').textContent = eventData.eventTime;
    document.getElementById('infoLocation').textContent = eventData.eventPlace;
    document.getElementById('descP').textContent = eventData.eventContent;
    // document.getElementById('club-activities').textContent = eventData.clubActivitiesInfo;
    // document.getElementById('club-logo').src = eventData.clubLogo;
    }
    
    // Call the displayEventInfo function when the page loads
    
    window.addEventListener('load', displayEventInfo);
    
    // Event listener for edit button
    // Get the buttons from the HTML
    const eventData = getQueryParams();
    // Get the club ID 
    const idclubEvent = eventData.idclubEvent;
    // Function to handle the deletion of a club
    // Event listener for the delete button
    deleteBtn.addEventListener('click', async function(event) {
      // Prevent default behavior (page reload)
    console.log('Cancel button clicked');
    event.preventDefault();
    try {
          const response = await fetch(`/api/Event/${idclubEvent}`, {
              method: 'DELETE'
          });
          
          if (response.ok) {
              alert('event deleted successfully.');
              // Redirect to home page or desired page after successful deletion
              window.location.href = `Admin_all-events.html?clubName=${encodeURIComponent(eventData.clubName)}`;
          } else {
              alert('Failed to delete event.');
          }
      } catch (error) {
          console.error('Error deleting event:', error);
      }
    });
    
    
    // saveBtn.addEventListener('click', async function(event) {
    //   // Prevent default behavior (page reload)
    //   event.preventDefault();
    //   const formData = new FormData();
    //   try {
    //       // Gather updated information from the inputs
    //       const updatedData = {
    //           clubName: document.getElementById('edited-club-name').value.trim(),
    //           clubDescription: document.getElementById('edited-description').value.trim(),
    //           clubActivities: document.getElementById('edited-activities').value.trim(),
    //           clubPresident: document.getElementById('edited-president-name').value.trim(),
    //           clubPresidentEmail: document.getElementById('edited-president-email').value.trim(),
    //           clubVicePresident: document.getElementById('edited-viPresident-name').value.trim(),
    //           clubVicePresidentEmail: document.getElementById('edited-viPresident-email').value.trim(),
    //           // Include other fields as necessary
    //           //clubLogo: document.getElementById('edited-image').files[0] // Only append file if provided
    //       };
    //       const clubLogoInput = document.getElementById('edited-image');
    //       //console.log('clubLogo input:', clubLogoInput);
    //       //console.log('clubLogo files:', clubLogoInput.files);
    //       if (clubLogoInput.files && clubLogoInput.files.length > 0) {
    //         formData.append('clubLogo', clubLogoInput.files[0]);
    //         console.log(`show value: ${clubLogoInput.files[0]}`);
    //     }
        
    //       console.log('Updated data:', updatedData);
    //       // Create a FormData object to handle file upload if there's a new image
    //       //const formData = new FormData();
    
    //     console.log('Initialized formData:', formData);
    // for (const [key, value] of Object.entries(updatedData)) {
    //     formData.append(key, value);
    //     console.log(`Appended key: ${key}, value: ${value}`);
    //     //console.log('FormData object:', formData);
    // }
    // for (const [key, value] of formData) {
    //   console.log(`show key: ${key}, show value: ${value}`);
    //   //console.log('FormData object:', formData);
    // }
    //       console.log('Update query conditions:', { clubID });
    //       // Send a PUT request to the server with the updated data
    //       const response = await fetch(`/api/Club/${clubID}`, {
    //           method: 'PATCH',
    //           body: formData,
    //           headers: {
    //           'Accept': 'application/json' // Specify the content type the server should respond with
    //           }
    //       });
    //       // Check the server response
    //       if (response.ok) {
    //           alert('Club updated successfully.');
    
    //           // Refresh the page data
    //           const updatedClub = await response.json();
    //           // Update the URL with the new data using pushState
    //     //       const newUrl = `/Club?clubID=${updatedClub.clubID}
    //     // &clubName=${encodeURIComponent(updatedClub.clubName)}
    //     // &clubDescription=${encodeURIComponent(updatedClub.clubDescription)}
    //     // &clubPresident=${encodeURIComponent(updatedClub.clubPresident)}
    //     // &clubVicePresident=${encodeURIComponent(updatedClub.clubVicePresident)}
    //     // &clubActivitiesInfo=${encodeURIComponent(updatedClub.clubActivitiesInfo)}
    //     // &clubOfficialEmail=${encodeURIComponent(updatedClub.clubOfficialEmail)}
    //     // &clubPresidentEmail=${encodeURIComponent(updatedClub.clubPresidentEmail)}
    //     // &clubVicePresidentEmail=${encodeURIComponent(updatedClub.clubVicePresidentEmail)}
    //     // &clubLogo=${encodeURIComponent(updatedClub.clubLogo)}`;
    //     // console.log('Updated club:', updatedClub);
    //     // window.location.replace(newUrl);
    // // Replace the current URL with the new URL
    // //window.location.href = './Admin_home.html';
    //           // Optionally, reload the page if needed
    //           // window.location.reload();
    //       } else {
    //           alert('Failed to update club.');
    //       }
    //   } catch (error) {
    //       console.error('Error updating club:', error);
    //   }
    // });
    
    // Event listener for the cancel button
    cancelBtn.addEventListener('click', function(event) {
      // Prevent default behavior (page reload)
      event.preventDefault();
      
      // Navigate back to the previous page
      window.location.href = `Admin_all-events.html?clubName=${encodeURIComponent(eventData.clubName)}`;
    });
    