let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); // calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replacing the icons class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); // replacing the icons class
  }
}

/* ================================================== */
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
/* ================================================== */



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
        // Parse query parameters from the URL
        const params = new URLSearchParams(window.location.search);
        
        // Retrieve and decode query parameters
        const clubLogo = params.get('clubLogo');
        const clubName = params.get('clubName');
        
        // Decode and trim the parameters to remove extra spaces
        const decodedClubName = decodeURIComponent(clubName).trim();
        const decodedclubLogo = decodeURIComponent(clubLogo).trim();
      
        // Return the processed parameters
        return {
            clubLogo:decodedclubLogo,
            clubName: decodedClubName,
        };
      }
      
      
      async function fetchchunkedPosts() {
        const clubName = getQueryParams().clubName;
        const clubLogo=getQueryParams().clubLogo
        console.log(clubName);
        try {
            // Fetch data from the server
            const response = await fetch(`/api/Post/posts/club/${clubName}`);
            const Posts = await response.json(); // Parse the JSON response
            console.log(Posts);
      
            // Get the gallery container where cards will be inserted
            const gallery = document.getElementById('post-gallery');
      
            // Iterate over the chunkedposts and create a card for each
            Posts.forEach((post, index) => {
                // Create a card element
                const card = document.createElement('div');
                card.classList.add('gallery-item', 'grid-colum-span');
                
                // Set the ID for each card, using `post-card-{index}` to distinguish them
                card.id = `post-card-${index}`;
      
                // Set the card content
                let imageUrl = '';
                if (post.postImage) {
                    // Convert backslashes to forward slashes in the image URL
                    imageUrl = post.postImage.replace(/\\/g, '/');
                }
      
                card.innerHTML = `
          <div class="postCard" style="background-image: url(${imageUrl});">
          <div class="dateBlock">
          <p class="day" id="post-day">${post.postDate.substring(8, 10)}th</p>
          <p class="month" id="post-month">${post.postDate.substring(5, 7)}</p>
          <p class="year" id="post-year">${post.postDate.substring(0, 4)}</p>
          </div>
          <div class="titleBlock">
          <h3 id="post-name">${post.postTitle}</h3>
          </div>
          </div>
      `;
      
                // Append the card to the gallery
                gallery.appendChild(card);
      
                // Add a click post listener to the card
                card.addEventListener("click", async function() {
                    // Fetch the specific post information
                    const postResponse = await fetch(`/api/Post/${post.postID}`);
                    const postData = await postResponse.json();
                    
                    // Redirect to the post page with the post data as query parameters
                    // Constructing the URL with query parameters
                    window.location.href = `./ClubManager_Post_details.html?postID=${encodeURIComponent(post.postID)}
                    &clubName=${encodeURIComponent(postData.clubName)}
                    &clubLogo=${encodeURIComponent(clubLogo)}
                    &postDescription=${encodeURIComponent(postData.postDescription)}
                    &postTitle=${encodeURIComponent(postData.postTitle)}
                    &postDate=${encodeURIComponent(postData.postDate)}
                    &postImage=${encodeURIComponent(postData.postImage)}`;
                });
            });
        } catch (error) {
            console.error('Error fetching chunkedposts:', error);
        }
      }
      
      // Fetch chunkedposts when the page loads
      window.addEventListener('load', fetchchunkedPosts);
      