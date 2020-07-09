// require("dotenv").config();

const API_KEY = "ff27e3d379a647e0b68a8adb4f8abfcf";
//process.env.NEWS_API_KEY;

const US_BUSINESS_BASE_URL =
  "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=";

const BASE_URL = "http://newsapi.org/v2/everything?q=";

const US_BILLIONAIRES_BASE_URL = `${BASE_URL}billionaires&from=2020-07-01&sortBy=publishedAt&apiKey=`;

const US_INNOVATION_BASE_URL = `${BASE_URL}innovation&from=2020-07-01&sortBy=publishedAt&apiKey=`;

const US_LEADERSHIP_BASE_URL = `${BASE_URL}leadership&from=2020-07-01&sortBy=publishedAt&apiKey=`;

const US_RAISING_MONEY_BASE_URL = `${BASE_URL}raising-money&from=2020-07-01&sortBy=publishedAt&apiKey=`;

const US_SMALL_BUSINESS_BASE_URL = `${BASE_URL}small-business&from=2020-07-01&sortBy=publishedAt&apiKey=`;

const US_LIFESTYLE_BASE_URL = `${BASE_URL}lifestyle&&from=2020-07-01&sortBy=publishedAt&apiKey=`;

// console.log(`${US_RAISING_MONEY_BASE_URL}${API_KEY}`);

//----------------------------------------

const newDiv = document.querySelectorAll("Results");

window.onload = function () {
  getNews;
};

const getNews = async () => {
  await axios
    .get(`${US_RAISING_MONEY_BASE_URL}${API_KEY}`)
    .then(function (response) {
      console.log("success");
      console.log(response.data.totalResults);

      const articles = response.data.articles.map((article, index) => {
        return article;
      });
      console.log(articles);
      // newDiv.innerHTML = `<div id="newsresults" key="index">
      //   ${articles.title}
      //   </div>`;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
};
getNews();

//---------------------------------
