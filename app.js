const dateMain = document.getElementById("headline-date");
const headerDate = document.getElementById("header-date");
const newsList = document.getElementById("news-list");
const sideList = document.getElementById("side-list");
const search = document.getElementById("search");
const searchForm = document.getElementById("searchForm");

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
dateMain.innerHTML = `Top Headlines for ${today.toDateString()}`;
headerDate.innerHTML = `${today.toDateString()}`;


// searchForm == "" ? fetchNews() : searchNews();

fetchNews();
searchNews;
fetchTechNews();

async function fetchNews() {
    let apiKey = "2d501f81d2574b03aff509bf28d4fcfa";
    let url = `https://newsapi.org/v2/top-headlines?country=us&from=2021-07-07&sortBy=popularity&apiKey=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
    const data = await response.json();
    displayNews(data)
}

function searchNews(e) {
    e.preventDefault();

    const query = search.value;
    
    let apiKey = "2d501f81d2574b03aff509bf28d4fcfa";
    fetch(`https://newsapi.org/v2/everything?q=${query}&from=2021-07-11&sortBy=popularity&apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => 
        displayNews(data))
}

function displayNews(data) {
    data.articles.forEach((article) => {
        const newsItem = document.createElement("li");
        newsItem.classList.add("news-item");
        newsItem.innerHTML =
            `<img src="${article.urlToImage}" alt="${article.title}">
             <div class="article-text">
                <a href="${article.url}"><h4>${article.title}</h4></a>
                <h5>By ${article.author}</h5>
                <h6>Source: ${article.source.name}</h6>
            </div>
            `;
        newsList.appendChild(newsItem);
    })
}

function fetchTechNews() {
    let apiKey = "2d501f81d2574b03aff509bf28d4fcfa";

    fetch(`https://newsapi.org/v2/top-headlines?q=technology&from=2021-07-07&sortBy=popularity&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data =>

            data.articles.forEach((article) => {
                const newsItem = document.createElement("li");
                newsItem.classList.add("side-item");
                newsItem.innerHTML =
                `
                <img src="${article.urlToImage}" alt="${article.title}">
                <a href="${article.url}"><h4>${article.title}</h4></a>
                <h5>By ${article.author}</h5>
                <h6>Source: ${article.source.name}</h6>
                `;
                sideList.appendChild(newsItem);
            })
        )
}



searchForm.addEventListener("submit", searchNews);