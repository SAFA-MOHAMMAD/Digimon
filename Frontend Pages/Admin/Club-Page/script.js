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

  /* ======================================================= */
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
  /* ======================================================= */

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
  

  document.getElementById('club-card').addEventListener("click", function() {
    window.location.href = "../eve";
  });

  
//   document.addEventListener("DOMContentLoaded", function () {
//     // Get the buttons from the HTML form
//     const deleteBtn = document.querySelector('.deleteBtn');
//     const cancelBtn = document.querySelector('.cancelBtn');
//     const saveBtn = document.querySelector('.saveBtn');
    
//     // The club ID (you may need to pass this dynamically from the club data)
//     const clubId = 'YOUR_CLUB_ID'; // Replace with the actual club ID or pass it dynamically

//     // Event listener for the delete button
//     deleteBtn.addEventListener('click', async function (event) {
//         event.preventDefault(); // Prevent form submission

//         try {
//             // Make a DELETE request to the server to delete the club
//             const response = await fetch(`/api/clubs/${clubId}`, {
//                 method: 'DELETE'
//             });

//             if (response.ok) {
//                 alert('Club has been deleted successfully.');
//                 // Add code here to handle UI updates or redirections after successful deletion
//             } else {
//                 alert('Failed to delete club.');
//             }
//         } catch (error) {
//             console.error('Error deleting club:', error);
//             alert('An error occurred while deleting the club.');
//         }
//     });

//     // Event listener for the save button
//     saveBtn.addEventListener('click', async function (event) {
//         event.preventDefault(); // Prevent form submission

//         // Collect form data for the update
//         const formData = new FormData(document.querySelector('form'));

//         try {
//             // Make a PUT request to the server to update the club
//             const response = await fetch(`/api/clubs/${clubId}`, {
//                 method: 'PUT',
//                 body: formData,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (response.ok) {
//                 const updatedClub = await response.json();
//                 alert('Club has been updated successfully.');
//                 // Add code here to handle UI updates or redirections after successful update
//             } else {
//                 alert('Failed to update club.');
//             }
//         } catch (error) {
//             console.error('Error updating club:', error);
//             alert('An error occurred while updating the club.');
//         }
//     });

//     // Event listener for the cancel button
//     cancelBtn.addEventListener('click', function (event) {
//         event.preventDefault(); // Prevent form submission

//         // Add code here to cancel changes or navigate back to a previous page
//         alert('Changes have been cancelled.');
//     });
// });
