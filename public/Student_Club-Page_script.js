let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

// Function to set the club ID in the "see all" link
function setClubIDInSeeAllLink() {
  // Get the URL of the current page
  const currentUrl = window.location.href;
  
  // Parse the query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  
  // Get the club ID from the query parameters
  const clubID = params.get('clubID');
  const clubName = params.get('clubName');

  
  // Get the "see all" link element
  const seeAllLink = document.querySelector('a[href="Student_all-events.html"]');
  
  // Construct the new URL with the club ID as a query parameter
  const newUrl = `Student_all-events.html?clubID=${encodeURIComponent(clubID)}&clubName=${encodeURIComponent(clubName)}`;
  
  // Update the href attribute of the "see all" link with the new URL
  seeAllLink.href = newUrl;
}

// Call the function when the page loads to set the club ID in the "see all" link
window.addEventListener('load', setClubIDInSeeAllLink);

function setClubIDInSeeAllPost() {
  // Get the URL of the current page
  const currentUrl = window.location.href;
  
  // Parse the query parameters from the URL
  const params = new URLSearchParams(window.location.search);
  
  // Get the club ID from the query parameters
  const clubID = params.get('clubID');
  const clubName = params.get('clubName');

  
  // Get the "see all" link element
  const seeAllLink = document.querySelector('a[href="Student_allPosts.html"]');
  
  // Construct the new URL with the club ID as a query parameter
  const newUrl = `Student_allPosts.html?clubID=${encodeURIComponent(clubID)}&clubName=${encodeURIComponent(clubName)}`;
  
  // Update the href attribute of the "see all" link with the new URL
  seeAllLink.href = newUrl;
}
window.addEventListener('load', setClubIDInSeeAllPost);



function getQueryParams() {
  console.log('getQueryParams function called');
  const params = new URLSearchParams(window.location.search);
  const clubID = params.get('clubID');
  const clubName = params.get('clubName');
  const clubDescription = params.get('clubDescription');
  const clubPresident = params.get('clubPresident');
  const clubVicePresident = params.get('clubVicePresident');
  const clubActivitiesInfo = params.get('clubActivitiesInfo');
  const clubOfficialEmail = params.get('clubOfficialEmail');
  const clubPresidentEmail = params.get('clubPresidentEmail');
  const clubVicePresidentEmail = params.get('clubVicePresidentEmail');
  const clubLogo = params.get('clubLogo');
  console.log('clubID:', clubID, 'clubName:', clubName, 'clubDescription:', clubDescription);
  
  return {
      clubID,
      clubName,
      clubDescription,
      clubPresident,
      clubVicePresident,
      clubActivitiesInfo,
      clubOfficialEmail,
      clubPresidentEmail,
      clubVicePresidentEmail,
      clubLogo
  };
}
// Function to display club information on the page
function displayClubInfo() {
const clubData = getQueryParams();
  // Update the HTML elements with the club data
document.getElementById('club-name').textContent = clubData.clubName;
document.getElementById('club-description').textContent = clubData.clubDescription;
document.getElementById('club-president-name').textContent = clubData.clubPresident;
document.getElementById('club-viPresident-name').textContent = clubData.clubVicePresident;
document.getElementById('club-president-email').textContent = clubData.clubPresidentEmail;
document.getElementById('club-viPresident-email').textContent = clubData.clubVicePresidentEmail;
document.getElementById('club-info').textContent = clubData.clubDescription;
document.getElementById('club-activities').textContent = clubData.clubActivitiesInfo;
document.getElementById('club-logo').src = clubData.clubLogo;
}

// Call the displayClubInfo function when the page loads

window.addEventListener('load', displayClubInfo);

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

/* ================================== */

  document.querySelector('.event-scroll-button-right').addEventListener('click', function() {
    document.querySelector('.gallery').scrollBy({
      top: 0,
      left: 600, // Change this value to adjust the scroll distance
      behavior: 'smooth'
    });
  });
  
  document.querySelector('.event-scroll-button-left').addEventListener('click', function() {
    document.querySelector('.gallery').scrollBy({
      top: 0,
      left: -600, // Change this value to adjust the scroll distance
      behavior: 'smooth'
    });
  });



  document.querySelector('.post-scroll-button-right').addEventListener('click', function() {
    document.querySelector('.post-gallery').scrollBy({
      top: 0,
      left: 600, // Change this value to adjust the scroll distance
      behavior: 'smooth'
    });
  });
  
  document.querySelector('.post-scroll-button-left').addEventListener('click', function() {
    document.querySelector('.post-gallery').scrollBy({
      top: 0,
      left: -600, // Change this value to adjust the scroll distance
      behavior: 'smooth'
    });
  });
  