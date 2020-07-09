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

const newsList = document.querySelector(".results");
const articleQty = document.querySelector(".article-numbers");
const nextPage = document.querySelector(".next-page");


window.addEventListener("load", async () => {
  try {
    let response = await axios.get(`${US_BILLIONAIRES_BASE_URL}${API_KEY}`);
    console.log("Successfully pulled");
    console.log("Total Results: ", response.data.totalResults);
    console.log(response.data.articles.length);
    numberOfArticles = response.data.articles.length


    for (let i = 0; i < 10; i += 1) {

    // for (let i = 0; i < response.data.articles.length; i += 1) {
      image = response.data.articles[i].urlToImage;
      articleTitle = response.data.articles[i].title;
      
      newsList.innerHTML += `<div class="result"><img class="article-image" src=${image} alt="news image" placeholder="../style/BN.png"><br><p class="article-title">${articleTitle}</p></div>`;

    }
    
    articleQty.innerHTML = `<div class="article-numbers"><h4 class="article-title">Showing 10 of ${numberOfArticles}</h4></div>`;

  } catch (error) {
    console.log("error");
  }
});
