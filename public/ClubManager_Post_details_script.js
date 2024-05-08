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
  const postID = params.get('postID');
  const clubName = params.get('clubName');
  const clubLogo = params.get('clubLogo');
  const postTitle = params.get('postTitle');
  const postDate = params.get('postDate');
  const postDescription = params.get('postDescription');
  const postImage = params.get('postImage');
  console.log('postID:', postID, 'clubName:', clubName, 'postTitle:', postTitle);
  
  return {
    postID,
      clubName,
      clubLogo,
      postTitle,
      postDate,
      postDescription,
      postImage,
  };
}
function displayPostInfo() {
  const postData = getQueryParams();
    // Update the HTML elements with the club data
  document.getElementById('clubNameImg').textContent = postData.clubName;
  document.getElementById('clubLogo').src = postData.clubLogo;
  document.getElementById('posterImg').src = postData.postImage;
  document.getElementById('title').textContent = postData.postTitle;
  document.getElementById('releaseDate').textContent = postData.postDate;
  document.getElementById('descP').textContent = postData.postDescription;
  }
  
  // Call the displayEventInfo function when the page loads
  
  window.addEventListener('load', displayPostInfo);
