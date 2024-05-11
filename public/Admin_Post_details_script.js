let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
const deleteBtn = document.getElementById('deleteBtn');
const saveBtn = document.getElementById('save-button');


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

// Ensure that the toggleEdit function is defined before this line
document.getElementById('edit-button').addEventListener('click', toggleEdit);



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
  document.getElementById('postTitle').textContent = postData.postTitle;
  document.getElementById('releaseDate').textContent = postData.postDate;
  document.getElementById('postDescription').textContent = postData.postDescription;
  }
  
  // Call the displayEventInfo function when the page loads
  
  window.addEventListener('load', displayPostInfo);
  
  // Event listener for edit button
  // Get the buttons from the HTML
  const postData = getQueryParams();
  // Get the club ID 
  const postID = postData.postID;
  // Function to handle the deletion of a club
  // Event listener for the delete button
  deleteBtn.addEventListener('click', async function(event) {
    // Prevent default behavior (page reload)
  console.log('Cancel button clicked');
  event.preventDefault();
  try {
        const response = await fetch(`/api/Post/${postID}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('post deleted successfully.');
            // Redirect to home page or desired page after successful deletion
            window.location.href =  `Admin_allPosts.html?clubName=${encodeURIComponent(postData.clubName)}
            &clubLogo=${encodeURIComponent(eventData.clubLogo)}`;        
          } else {
            alert('Failed to delete post.');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
  });
  
  
  saveBtn.addEventListener('click', async function(event) {
    // Prevent default behavior (page reload)
    event.preventDefault();
    const formData = new FormData();
    try {
        // Gather updated information from the inputs
        const updatedData = {
          postTitle: document.getElementById('edited-postTitle').value.trim(),
          postDescription: document.getElementById('edited-postDescription').value.trim(),
        };
        const postLogoInput = document.getElementById('edited-posterImg');
        if (postLogoInput.files && postLogoInput.files.length > 0) {
          formData.append('postImage', postLogoInput.files[0]);
          console.log(`show value: ${postLogoInput.files[0]}`);
      }
        console.log('Updated data:', updatedData);
      console.log('Initialized formData:', formData);
  for (const [key, value] of Object.entries(updatedData)) {
      formData.append(key, value);
      console.log(`Appended key: ${key}, value: ${value}`);
  }
  for (const [key, value] of formData) {
    console.log(`show key: ${key}, show value: ${value}`);
  }
        console.log('Update query conditions:', { postID });
        // Send a PUT request to the server with the updated data
        const response = await fetch(`/api/Post/${postID}`, {
            method: 'PUT',
            body: formData,
            headers: {
            'Accept': 'application/json' // Specify the content type the server should respond with
            }
        });
        // Check the server response
        if (response.ok) {
            alert('Post updated successfully.');
            // Refresh the page data
            const updatedClub = await response.json();
        } else {
            alert('Failed to update Post.');
        }
    } catch (error) {
        console.error('Error updating Post:', error);
    }
  });
  


