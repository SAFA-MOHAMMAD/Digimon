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
  console.log('getQueryParams function called');
  const params = new URLSearchParams(window.location.search);
  const postID = params.get('postID');
  const clubName = params.get('clubName');
  const postTitle = params.get('postTitle');
  const postDate = params.get('postDate');
  const postDescription = params.get('postDescription');
  const postImage = params.get('postImage');
  console.log('postID:', postID, 'clubName:', clubName, 'postTitle:', postTitle);
  
  return {
    postID,
      clubName,
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
  document.getElementById('posterImg').src = postData.postImage;
  document.getElementById('title').textContent = postData.postTitle;
  document.getElementById('releaseDate').textContent = postData.postDate;
  document.getElementById('descP').textContent = postData.postDescription;
  }
  
  // Call the displayEventInfo function when the page loads
  
  window.addEventListener('load', displayPostInfo);
