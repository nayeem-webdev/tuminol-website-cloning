async function fetchCategories() {
  let result;
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    const data = await response.json();
    result = data;
    displayCategories(data);
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
  } finally {
    console.log("Fetch attempt completed");
  }
}

// let categoriesAPI = fetchCategories()
// console.log(categoriesAPI)

function displayCategories(data) {
  data.categories.forEach((dat) => {
    let container = document.getElementById("btn-container");
    let btn = document.createElement("button");
    btn.classList.add(
      "bg-zinc-100",
      "rounded-lg",
      "font-bold",
      "text-sm",
      "py-2",
      "px-3",
      "hover:bg-zinc-200",
      "focus:bg-black",
      "focus:text-white"
    );
    btn.setAttribute("id", dat.category_id);
    btn.innerText = dat.category;
    container.appendChild(btn);
  });
}
fetchCategories();

async function fetchVideo() {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/videos"
    );
    const data = await response.json();
    displayVideo(data);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log("videos Fetched Successfully");
  }
}

function displayVideo(data) {
  data.videos.forEach((vid) => {
    let videoContainer = document.getElementById("videoContainer");
    let videoDiv = document.createElement("div");
    videoDiv.classList.add("aspect-w-123", "aspect-h-100", "cursor-pointer");
    videoDiv.innerHTML = `
    <div>
        <img
                      class="rounded-2xl w-full"
                      src=${vid.thumbnail}
                      alt="Thumbnail"
                    />
                  </div>
                  <div class="flex mt-2">
                    <div class="flex-shrink-0 mr-3">
                      <img
                        class="h-9 w-9 rounded-full"
                        src=${vid.authors[0].profile_picture}
                        alt="Profile Image"
                      />
                    </div>
                    <div class="flex-1 overflow-hidden">
                      <h1 class="text-[#0f0f0f] font-bold text-base line-clamp-2">
                        Let's Learn Web Development | Manish Paul | Learn With
                        Manish
                      </h1>
                      <p class="text-[#606060] text-sm truncate flex items-center">
                        ${vid.authors[0].profile_name} ${
      vid.authors[0].verified
        ? `
                        <img class="ml-1 h-4 w-4 rounded-full"
                        src='https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png'
                        alt="Profile Image"
                      />`
        : ""
    }
                      </p>
                      <p class="text-[#606060] text-sm">${
                        vid.others.views
                      } views · ${calculateTime(vid.others.posted_date)}</p>
                    </div>
                    <div class="flex-shrink-0 mx-1">
                      <img src="./assets/icon three dot.svg" alt="" />
                    </div>
                </div>
    `;
    videoContainer.appendChild(videoDiv);
  });
}

fetchVideo();

// functions
const calculateTime = (time) => {
  if (time >= 31536000) {
    let year = Math.floor(time / 31536000);
    return `${year} ${year <= 1 ? "year ago" : "years ago"}`;
  } else if (time >= 2628288) {
    let month = Math.floor(time / 2628288);
    return `${month} ${month <= 1 ? "month ago" : "months ago"}`;
  } else if (time >= 604800) {
    let week = Math.floor(time / 604800);
    return `${week} ${week <= 1 ? "week ago" : "weeks ago"}`;
  } else if (time >= 86400) {
    let day = Math.floor(time / 86400);
    return `${day} ${day <= 1 ? "day ago" : "days ago"}`;
  } else if (time >= 3600) {
    let hour = Math.floor(time / 3600);
    return `${hour} ${hour <= 1 ? "hour ago" : "hours ago"}`;
  } else if (time >= 60) {
    let minute = Math.floor(time / 60);
    return `${minute} ${minute <= 1 ? "minute ago" : "minutes ago"}`;
  } else if (time >= 1) {
    return `${time} ${time <= 1 ? "second ago" : "seconds ago"}`;
  } else {
    return "";
  }
};
