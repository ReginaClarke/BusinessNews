const API_KEY = "ff27e3d379a647e0b68a8adb4f8abfcf";

const BASE_URL = "http://newsapi.org/v2/everything?q=";

const US_INNOVATION_BASE_URL = `${BASE_URL}innovation&pageSize=60&sortBy=publishedAt&apiKey=`;

//----------------------------------------

window.addEventListener("load", async () => {
  try {
    let response = await axios.get(`${US_INNOVATION_BASE_URL}${API_KEY}`);
    console.log("API data successfully pulled");
    console.log("Total Results: ", response.data.totalResults);

    const newsList = document.querySelector(".results");
    const articleArrays = response.data.articles;
    const pagination_element = document.getElementById("pagination");

    let current_page = 1;
    let articlesshown = 10;

    //Split data into lists and renders initial page
    function DisplayList(items, articlesshown_per_page, page) {
      newsList.innerHTML = "";
      page -= 1;

      let start = articlesshown_per_page * page;
      let end = start + articlesshown_per_page;
      let paginatedItems = items.slice(start, end);

      for (let i = 0; i < paginatedItems.length; i += 1) {
        let image = paginatedItems[i].urlToImage;
        let articleTitle =
          paginatedItems[i].title.length < 100
            ? paginatedItems[i].title
            : `${paginatedItems[i].title.slice(0, 90)}...`;
        let articleSource = paginatedItems[i].source.name;

        newsList.innerHTML += `<div class="result">
        <img class="article-image modal-content modal-onClick" src=${image} alt="news image" placeholder="../style/BN.png">
        <br>
        <p class="article-title">${articleTitle}</p>
        <br>
        <p class="article-title">${articleSource}</p>
        </div>`;
      }

      const modalBtn = document.querySelectorAll(".modal-onClick");

      modalBtn.forEach((artImg) => {
        artImg.addEventListener("click", () => {
          openModal(artImg.src);
        });
      });
    }

    // Get DOM Elements
    const modal = document.querySelector("#my-modal");
    const modalImage = document.querySelector(".modal-image");
    const closeBtn = document.querySelector(".close");

    // Events
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", outsideClick);

    // Open
    function openModal(artImg) {
      modal.style.display = "block";
      modalImage.src = artImg;
      console.log(artImg);
    }

    //---------------- MODAL ---------------------//

    // Close
    function closeModal() {
      modal.style.display = "none";
    }

    // Close If Outside Click
    function outsideClick(e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    }
    //setup pagination buttons
    function SetupPagination(items, wrapper, articlesshown_per_page) {
      wrapper.innerHTML = "";
      let page_count = Math.ceil(items.length / articlesshown_per_page);
      for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i, items);
        wrapper.appendChild(btn);
      }
    }

    // show current list
    function PaginationButton(page, items) {
      let button = document.createElement("button");
      button.innerText = page;

      if (current_page == page) button.classList.add("active");

      button.addEventListener("click", function () {
        current_page = page;
        DisplayList(items, articlesshown, current_page);

        let current_btn = document.querySelector(".pagenumbers button.active");
        current_btn.classList.remove("active");

        button.classList.add("active");
      });
      return button;
    }

    DisplayList(articleArrays, articlesshown, current_page);
    SetupPagination(articleArrays, pagination_element, articlesshown);
  } catch (error) {
    console.log(error);
  }
});
