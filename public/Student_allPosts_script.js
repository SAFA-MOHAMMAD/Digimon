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

/* =========================================== */


  const selectBtn = document.querySelector(".select-btn"),
             items = document.querySelectorAll(".item");
   
       selectBtn.addEventListener("click", ()=> {
         selectBtn.classList.toggle("open");
       });
       items.forEach(item => {
         item.addEventListener("click", () =>{
           item.classList.toggle("checked");
         
           let checked = document.querySelectorAll(".checked"),
             btnText = document.querySelector(".btn-text");
   
             if(checked && checked.length > 0){
                btnText.innerText = `${checked.length} selected`;
               }else{
                 btnText.innerText = "select";
               }
   
         });
       })

       
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
        const clubLogo = getQueryParams().clubLogo;
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
                    const postResponse = await fetch(`/api/post/${post.postID}`);
                    const postData = await postResponse.json();
                    
                    // Redirect to the post page with the post data as query parameters
                    // Constructing the URL with query parameters
                    window.location.href = `./Student_Post_details.html?postID=${encodeURIComponent(post.postID)}
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


      document.addEventListener('DOMContentLoaded', function () {
        const clubName = getQueryParams().clubName;
        const clubLogo=getQueryParams().clubLogo;
        console.log('Search function entered')
        // Get the search input field and submit button elements
        const searchInput = document.getElementById('date');
        const submitButton = document.getElementById('submit');
      
        // Add an event listener to the submit button
        submitButton.addEventListener('click', async function (e) {
            e.preventDefault(); // Prevent the form from submitting the traditional way
      console.log('submitButton clicked')
            // Get the search term from the input field
            const searchTerm = searchInput.value;
      console.log(searchTerm)
            // Check if search term is empty
            if (!searchTerm) {
                alert('Please enter a search term.');
                return;
            }
      
            try {
                // Send an HTTP GET request to the search API endpoint
                const response = await fetch(`/api/Post/search/${searchTerm}/${clubName}`);
                const PostData = await response.json();
                console.log(PostData)
                
      
                // Check if the response is OK (status code 200)
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
      
                // Parse the response JSON
               // const results = await response.json();
      
                // Display the search results in the results container
                // const resultsContainer = document.getElementById('results-container');
                
      
                const resultsContainer = document.getElementById('results-container');
                resultsContainer.innerHTML = ' ';
      
                
                const galleryContainer =document.getElementById('post-gallery');
      
                galleryContainer.innerHTML = ' ';
                          // Display results as cards
                          PostData.forEach(post => {
                            const card = document.createElement('div');
                            card.classList.add('gallery-item', 'grid-colum-span');
                             // Add a card class for styling
                              // Populate the card with club information
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
                        </div>`;
                              // Add the card to the results container
                              resultsContainer.appendChild(card);
                              card.addEventListener("click", async function() {
                                // Fetch the specific post information
                                const postResponse = await fetch(`/api/post/${post.postID}`);
                                const postData = await postResponse.json();
                                
                                // Redirect to the post page with the post data as query parameters
                                // Constructing the URL with query parameters
                                window.location.href = `./Student_Post_details.html?postID=${encodeURIComponent(post.postID)}
                                    &clubName=${encodeURIComponent(postData.clubName)}
                                    &clubLogo=${encodeURIComponent(clubLogo)}
                                    &postDescription=${encodeURIComponent(postData.postDescription)}
                                    &postTitle=${encodeURIComponent(postData.postTitle)}
                                    &postDate=${encodeURIComponent(postData.postDate)}
                                    &postImage=${encodeURIComponent(postData.postImage)}`;
                            });
                            })
      
                // Create a list of results
                // results.forEach((result) => {
                //     const listItem = document.createElement('div');
                //     listItem.textContent = result.clubName; // Customize this as needed
                //     resultsContainer.appendChild(listItem);
                // });
      
            } catch (error) {
                console.error('Error fetching search results:', error);
                alert('An error occurred while fetching search results.');
            }
        });
      });