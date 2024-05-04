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
    