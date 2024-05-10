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

// Function to show edit textarea and save button
// Function to resize textarea based on content
function resizeTextarea(textarea) {
  textarea.style.height = 'auto'; // Reset height to auto
  textarea.style.height = (textarea.scrollHeight) + 'px'; // Set height to scrollHeight
}

// Function to show edit textarea and save button
function toggleEdit() {

  var PosterImage = document.getElementById('posterImg');
  var postTitle = document.getElementById('postTitle');
  var postDescription = document.getElementById('postDescription');

  var editedPosterImage = document.getElementById('edited-posterImg');
  var editedpostTitle = document.getElementById('edited-postTitle');
  var editedpostDescription = document.getElementById('edited-postDescription');
  

  var cancelButton = document.getElementById('cancel-button');
  var editButton = document.getElementById('edit-button');
  var saveButton = document.getElementById('save-button');

  if (editButton.textContent === 'Edit') {
      editButton.style.display = 'none';
      saveButton.style.display = 'inline';
      cancelButton.style.display = 'inline';

      editedpostTitle.value = postTitle.textContent.trim();
      editedpostDescription.value = postDescription.textContent.trim(); 
      editedPosterImage.value = ''; // Clear input value to prevent re-uploading same image
      
      

      editedPosterImage.style.display = 'block';
      editedpostTitle.style.display = 'block';
      editedpostDescription.style.display = 'block';
      postTitle.style.display = 'none';
      postDescription.style.display = 'none';

      // Resize textarea initially
      resizeTextarea(editedpostTitle);
      resizeTextarea(editedpostDescription);

  } 

}

function saveEdit() {
      var PosterImage = document.getElementById('posterImg');
      var postTitle = document.getElementById('postTitle');
      var postDescription = document.getElementById('postDescription');

      var editedPosterImage = document.getElementById('edited-posterImg');
      var editedpostTitle = document.getElementById('edited-postTitle');
      var editedpostDescription = document.getElementById('edited-postDescription');


      postTitle.textContent = editedpostTitle.value.trim();
      postDescription.textContent = editedpostDescription.value.trim();

      if (editedPosterImage.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function(e) {
          PosterImage.src = e.target.result;
        };
        reader.readAsDataURL(editedPosterImage.files[0]);
      }
      
      editedPosterImage.style.display = 'none';
      editedpostTitle.style.display = 'none';
      editedpostDescription.style.display = 'none';
      postTitle.style.display = 'block';
      postDescription.style.display = 'block';

      var editButton = document.getElementById('edit-button');
      var cancelButton = document.getElementById('cancel-button');
      var saveButton = document.getElementById('save-button');

      editButton.style.display = 'inline';
      saveButton.style.display = 'none';
      cancelButton.style.display = 'none';
    
}


function cancelEdit() {
  var editButton = document.getElementById('edit-button');
  editButton.textContent = 'Edit'; // Reset edit button text
  toggleEdit(); // Call toggleEdit to reset changes
}

// Event listener for edit button
document.getElementById('edit-button').addEventListener('click', toggleEdit);

// Event listener for save button
document.getElementById('save-button').addEventListener('click', saveEdit);
