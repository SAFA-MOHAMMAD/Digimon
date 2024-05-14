let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
const cancel = document.getElementById('cancel');
var cancelButton = document.getElementById('cancel-button'); 

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); // calling the function(optional)
});
cancelButton.style.display = 'inline';

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replacing the icons class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); // replacing the icons class
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
// Get the form element
document.querySelector('form').addEventListener('submit', async function(event) {
  // Prevent default form submission behavior
  event.preventDefault();
  // Create FormData from the form element
  const form = event.target;
  const formData = new FormData(form);

  // Log the FormData contents to check what's being sent
  for (const [key, value] of formData.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
  }

  try {
      // Send the FormData to the server via a POST request
      const response = await fetch('/api/club/newClub', {
          method: 'POST',
          body: formData,
      });
      // Handle the response
      if (response.ok) {
          const createdClub = await response.json();
          window.location.href = './Admin_home.html';
          console.log('Club created successfully:', createdClub);
      } else {
          console.error('Failed to create club:', response.statusText);
      }
  } catch (error) {
      console.error('Error creating club:', error);
  }
});

cancel.addEventListener('click', function(event) {
  // Prevent default behavior (page reload)
  event.preventDefault();
  
  // Navigate back to the previous page
  window.history.back();
});
