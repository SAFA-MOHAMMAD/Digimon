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
                  try {
                    const notificationResponse = await fetch('/api/Notification/notifications', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            message: 'Aproved Post',
                            Title: post.postTitle,
                            Image:post.postImage
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
                  
              });
    
              denyButton.addEventListener('click', async () => {
                const response = await fetch(`/api/Post/${post.postID}`, {
                  method: 'DELETE'
              });
              try {
                const notificationResponse = await fetch('/api/Notification/notifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'Deny Post',
                        Title: post.postTitle,
                        Image:post.postImage
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
      try {
          const response = await fetch('/api/Notification/getNotifications');
          const notifications = await response.json();
          
          // Get the notification box element
          const notificationBox = document.getElementById('box');
          
          // Clear the existing notifications
          notificationBox.innerHTML = '<h2>Notifications</h2>';
    
          // Loop through each notification and create HTML elements
          notifications.forEach(async notification => {
              // Create a link element
              const link = document.createElement('a');
              let destinationUrl = './Admin_Incoming_requessts.html'; // Default URL for non-club notifications
              // Check if the title matches a club name
              const data=(await isClubName(notification.Title)).found;
              console.log('Does the club exist?', data); // Should print true or false
    
              //const clubData=data.clubData;
              if (data===true) {
                console.log("enterd the is club function")
                  // If it's a club name, set the destination URL to the club page
                  const clubData=(await isClubName(notification.Title)).clubData;
                  console.log("the result is :",clubData.clubID)
    
                  destinationUrl = `/club?clubID=${clubData.clubID}
                  &clubName=${encodeURIComponent(clubData.clubName)}
                  &clubDescription=${encodeURIComponent(clubData.clubDescription)}
                  &clubPresident=${encodeURIComponent(clubData.clubPresident)}
                  &clubVicePresident=${encodeURIComponent(clubData.clubVicePresident)}
                  &clubActivitiesInfo=${encodeURIComponent(clubData.clubActivitiesInfo)}
                  &clubOfficialEmail=${encodeURIComponent(clubData.clubOfficialEmail)}
                  &clubPresidentEmail=${encodeURIComponent(clubData.clubPresidentEmail)}
                  &clubVicePresidentEmail=${encodeURIComponent(clubData.clubVicePresidentEmail)}
                  &clubLogo=${encodeURIComponent(clubData.clubLogo)}`;
              }
    
              // Set the href attribute of the link
              link.href = destinationUrl;
    
              // Create a div for the notification item
              const itemDiv = document.createElement('div');
              itemDiv.classList.add('notifi-item');
    
              // If notification has an image, create an image element
              if (notification.Image) {
                  const img = document.createElement('img');
                  img.classList.add('box-icon');
                  img.src = notification.Image; // Image URL from notification
                  img.alt = 'Notification image';
                  itemDiv.appendChild(img);
              }
    
              // Create a div for the notification text
              const textDiv = document.createElement('div');
              textDiv.classList.add('text');
    
              // Create a heading for the notification title
              const titleH4 = document.createElement('h4');
              titleH4.textContent = notification.Title;
    
              // Create a paragraph for the notification message
              const messageP = document.createElement('p');
              messageP.textContent = notification.message;
    
              // Append title and message to the text div
              textDiv.appendChild(titleH4);
              textDiv.appendChild(messageP);
    
              // Append text div to the item div
              itemDiv.appendChild(textDiv);
    
              // Append item div to the link
              link.appendChild(itemDiv);
    
              // Append link to the notification box
              notificationBox.appendChild(link);
          });
      } catch (error) {
          console.error('Error fetching notifications:', error);
      }
    }
    
    
    async function isClubName(name) {
      try {
          // Send a request to your server to check if a club with the given name exists
          const response = await fetch(`/api/club/name/${encodeURIComponent(name)}`);
          
          if (response.ok) {
              // If the response is successful, it means the club exists
              const clubData = await response.json();
              return {
                  found: true, // Indicate that the club is found
                  clubData: clubData // Include club data in the response
              };
          } else {
              // If the response is not successful, it means the club doesn't exist
              return { found: false }; // Indicate that the club is not found
          }
      } catch (error) {
          // Handle any errors that occur during the request
          console.error('Error checking club name:', error);
          return { found: false }; // Return false in case of an error
      }
    }
    
    // Execute the function when the window is loaded
    window.onload = function() {
      fetchchunkedNotification();
    };
    