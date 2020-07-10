const API_KEY = "ff27e3d379a647e0b68a8adb4f8abfcf";

const US_BUSINESS_BASE_URL =
  "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";

const BASE_URL = "http://newsapi.org/v2/everything?q=";

const US_BILLIONAIRES_BASE_URL = `${BASE_URL}billionaires&pageSize=50&sortBy=publishedAt&apiKey=`;

const US_INNOVATION_BASE_URL = `${BASE_URL}innovation&pageSize=50&sortBy=publishedAt&apiKey=`;

const US_LEADERSHIP_BASE_URL = `${BASE_URL}leadership&pageSize=50&sortBy=publishedAt&apiKey=`;

const US_RAISING_MONEY_BASE_URL = `${BASE_URL}raising-money&pageSize=50&sortBy=publishedAt&apiKey=`;

const US_SMALL_BUSINESS_BASE_URL = `${BASE_URL}small-business&pageSize=50&sortBy=publishedAt&apiKey=`;

const US_LIFESTYLE_BASE_URL = `${BASE_URL}lifestyle&pageSize=50&sortBy=publishedAt&apiKey=`;

//----------------------------------------

window.addEventListener("load", async () => {
  try {
    let response = await axios.get(`${US_BILLIONAIRES_BASE_URL}${API_KEY}`);
    console.log("Successfully pulled");
    console.log("Total Results: ", response.data.totalResults);

    const newsList = document.querySelector(".results");

    const articleArrays = response.data.articles;

    const articleArray = document.getElementById("results");
    const pagination_element = document.getElementById("pagination");

    let current_page = 1;
    let articlesshown = 10;

    //Split data into lists and renders initial page
    function DisplayList(items, wrapper, articlesshown_per_page, page) {
      newsList.innerHTML = "";
      page -= 1;

      let start = articlesshown_per_page * page;
      let end = start + articlesshown_per_page;
      let paginatedItems = items.slice(start, end);

      for (let i = 0; i < paginatedItems.length; i += 1) {
        let image = paginatedItems[i].urlToImage;
        let articleTitle =
          paginatedItems[i].title.length < 100 ?
          paginatedItems[i].title :
          `${paginatedItems[i].title.slice(0, 100)}...` 
        let articleSource = paginatedItems[i].source.name;

        newsList.innerHTML += `<div class="result">
        <img class="article-image" src=${image} alt="news image" placeholder="../style/BN.png">
        <br>
        <p class="article-title">${articleTitle}</p>
        <br>
        <p class="article-title">${articleSource}</p>
        </div>`;
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
        DisplayList(items, articleArray, articlesshown, current_page);

        let current_btn = document.querySelector(".pagenumbers button.active");
        current_btn.classList.remove("active");

        button.classList.add("active");
      });
      return button;
    }

    DisplayList(articleArrays, articleArray, articlesshown, current_page);
    SetupPagination(articleArrays, pagination_element, articlesshown);
  } catch (error) {
    console.log("error");
  }
});
