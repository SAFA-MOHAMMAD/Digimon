let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

function getQueryParams() {
  console.log('getQueryParams function called');
  const params = new URLSearchParams(window.location.search);
  const postID = params.get('postID');
  const clubName = params.get('clubName');
  const clubPresident = params.get('clubPresident');
  const postTitle = params.get('postTitle');
  const postDate = params.get('postDate');
  const postDescription = params.get('postDescription');
  const postImage = params.get('postImage');
  console.log('postID:', postID, 'clubName:', clubName, 'postTitle:', postTitle);
  
  return {
    postID,
      clubName,
      clubPresident,
      postTitle,
      postDate,
      postDescription,
      postImage,
  };
}
function displayPostInfo() {
  const postData = getQueryParams();
    // Update the HTML elements with the club data
  document.getElementById('post_title').textContent = postData.postTitle;
  document.getElementById('post-description').textContent = postData.postDescription;
  document.getElementById('posterImg').src = postData.postImage;
  }
  
  // Call the displayEventInfo function when the page loads
  
  window.addEventListener('load', displayPostInfo);













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

/* ========================================= */
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
/* ========================================= */


  // document.querySelector('.event-scroll-button-right').addEventListener('click', function() {
  //   document.querySelector('.gallery').scrollBy({
  //     top: 0,
  //     left: 600, // Change this value to adjust the scroll distance
  //     behavior: 'smooth'
  //   });
  // });
  
  // document.querySelector('.event-scroll-button-left').addEventListener('click', function() {
  //   document.querySelector('.gallery').scrollBy({
  //     top: 0,
  //     left: -600, // Change this value to adjust the scroll distance
  //     behavior: 'smooth'
  //   });
  // });
