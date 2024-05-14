let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

// closeBtn.addEventListener("click", ()=>{
//   sidebar.classList.toggle("open");
//   menuBtnChange();//calling the function(optional)
// });

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
    // })


    async function fetchNotApprovedPosts() {
      try {
          // Fetch data from the server
          const response = await fetch(`/api/Post/getAllNotAprovePosts`);
          const posts = await response.json(); // Parse the JSON response
    
          const mainGrid = document.getElementById('home-section');
    
          // Clear previous content from the mainGrid container
          mainGrid.innerHTML = '';
    
          // Iterate over the posts and create a card for each
          posts.forEach(async (post) => {
              // Fetch club data for each post
              const clubResponse = await fetch(`/api/Club/name/${post.clubName}`);
              const clubData = await clubResponse.json();
    
              // Create a container for each post card
              const cardContainer = document.createElement('div');
    
              // Set the content of the post card using post and club data
              cardContainer.innerHTML = `
              <div class="mainGrid" id="mainGrid">
                  <div class="clubInfo">
                      <img src="${clubData.clubLogo || 'images/default-logo.png'}" alt="clubLogo">
                      <h4 class="clubName">${clubData.clubName}</h4>
                      <p>${clubData.clubDescription || 'No description available'}</p>
                  </div>
    
                  <div class="postInfo">
                  <p id="postName">${post.postTitle}</p>
                  <br>
                  <p id="postDesc">${post.postDescription}</p>
                </div>
          
    
                  <div class="buttons">
                  <form action="">
                  <div><button type="button" class="approve" data-post-id="${post.postID}">Approve</button></div>
                  <div><button type="button" class="deny" data-post-id="${post.postID}">Deny</button></div>
                      <a href="Admin_post request infromation.html?postID=${post.postID}
                      &clubName=${encodeURIComponent(clubData.clubName)}
                      &postTitle=${encodeURIComponent(post.postTitle)}
                      &postDescription=${encodeURIComponent(post.postDescription)}
                      &postDate=${encodeURIComponent(post.postDate)}
                      &postImage=${encodeURIComponent(post.postImage)}
                      &postApproval=${encodeURIComponent(post.PostApproval)}"><div>
                          <button type="button" class="seeMore">See more details</button>
                          </div></a>
                      </form>
                  </div>
                  <hr>
    
              `;
    
              // Append each card container as a separate row in the mainGrid container
              mainGrid.appendChild(cardContainer);
    
              // Add post listeners for the Approve and Deny buttons
              const approveButton = cardContainer.querySelector('.approve');
              const denyButton = cardContainer.querySelector('.deny');
    
              approveButton.addEventListener('click', async () => {
                  await handleApproval(post.postID, true);
              });
    
              denyButton.addEventListener('click', async () => {
                const response = await fetch(`/api/Post/${post.postID}`, {
                  method: 'DELETE'
              });
              window.location.reload();
              });
          });
      } catch (error) {
          console.error('Error fetching not approved posts:', error);
      }
    }
    
    // Function to handle the approval or denial of posts
    async function handleApproval(postID, isApproved) {
      try {
          const response = await fetch(`/api/post/approvePost/${postID}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                PostApproval: isApproved,
              }),
          });
    
          if (response.ok) {
              // Refresh the page to show updated list of not approved posts
              fetchNotApprovedPosts();
          } else {
              console.error('Failed to update post approval:', response.statusText);
          }
      } catch (error) {
          console.error('Error updating post approval:', error);
      }
    }
    
    // Fetch not approved posts when the page loads
    window.addEventListener('load', fetchNotApprovedPosts);
    


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