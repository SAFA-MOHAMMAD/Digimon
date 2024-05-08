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
  const clubName = params.get('clubName');
  const clubLogo = params.get('clubLogo');
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
      clubLogo,
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
    document.getElementById('clubLogo').src = eventData.clubLogo;
    document.getElementById('posterImg').src = eventData.eventImage;
    document.getElementById('guestName').textContent = eventData.eventSpeaker;
    document.getElementById('InfoDate').textContent = eventData.eventDate;
    document.getElementById('infoTime').textContent = eventData.eventTime;
    document.getElementById('infoLocation').textContent = eventData.eventPlace;
    document.getElementById('descP').textContent = eventData.eventContent;
    }
    
    // Call the displayEventInfo function when the page loads
    
    window.addEventListener('load', displayEventInfo);
    
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

