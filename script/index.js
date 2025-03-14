//get no content found image an dmessage div

//load categories
function loadCatagories() {
  //data fetchy korsi
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //Promise ke JSON a convert korsi
    .then((response) => response.json())
    //data diye display function ke call korsi
    .then((data) => 
    {
      displayCatagories(data.categories);
    });
}
loadCatagories();

//Display Categories Dynamically
function displayCatagories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let cat of categories) {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `<button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class='btn btn-sm'>${cat.category}</button>`;
    categoryContainer.appendChild(createDiv);
  }
}

//Load Videos from API
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}
loadVideos();

//Display Videos
const displayVideos=(videos) =>{
  const videoContainer = document.getElementById("video-Container");
  videoContainer.innerHTML = "";
  if(videos.length==0)
    {
     videoContainer.innerHTML=`
     <div class="flex flex-col col-span-4 justify-center">
           <img class="max-w-[200px] mx-auto my-20 mb-7" src="./images/Icon.png" alt="">
      <h2 class="text-2xl font-bold text-center">Oops!! Sorry, There is no content here</h2>
      </div>`;
      return;
    }
  videos.forEach((video) => {
    // console.log(video);

    const videoCard = document.createElement("div");

    videoCard.innerHTML = `<div class="card w-full max-w-sm md:max-w-md lg:max-w-lg">
  <figure>
    <img
      class="w-full h-[200px] object-cover rounded-lg"
      src="${video.thumbnail}"
      alt="Card Image"
    />
  </figure>
  <div class="flex justify-start gap-3 py-3 px-2">
    <div class="avatar">
      <div
        class="ring-primary ring-offset-base-100 w-8 h-8 rounded-full ring ring-offset-2">
        <img
          src="${video.authors[0].profile_picture}"alt="Avatar"/>
      </div>
    </div>
    <div class="card text">
      <h2 class="card-title">${video.title}</h2>
      <div class="flex gap-3 items-center">
        <p>${video.authors[0].profile_name}</p>
        <img
          class="w-5 h-5"
          src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png"
          alt="Verified"/>
      </div>
      <p class="text-sm text-gray-400">${video.others.views} views</p>
    </div>
  </div>
</div>`
    videoContainer.appendChild(videoCard);

  });
}

//loadcategory videos
const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayVideos(data.category));
}

