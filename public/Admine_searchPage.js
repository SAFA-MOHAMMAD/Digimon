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

/* ============================= */

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
/* ============================= */

const selectBtn = document.querySelector(".select-btn"),
      items = document.querySelectorAll(".item");







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



// document.getElementById('submit').addEventListener('click', function(event) {
//   event.preventDefault(); // Prevent form submission

//   // Get the search query from the input field
//   const searchQuery = document.getElementById('search').value;

//   // Perform the search (e.g., make an AJAX request to the server)
//   performSearch(searchQuery);
// });
// document.addEventListener('DOMContentLoaded', function () {
//     const searchInput = document.getElementById('search');
//     const submitButton = document.getElementById('submit');

//     submitButton.addEventListener('click', function (e) {
//         e.preventDefault(); // Prevent default form submission

//         // Get the search term
//         const searchTerm = searchInput.value;

//         if (!searchTerm) {
//             alert('Please enter a search term.');
//             return;
//         }

//         // Redirect to the results page
//         window.location.href = `./Admine_searchPage.html/${searchTerm}`;
//     });
// });
