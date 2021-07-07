const dateHeader = document.getElementById("headline-date");
const newsList = document.getElementById("news-list");

fetchNews();

async function fetchNews() {
    let apiKey = "2d501f81d2574b03aff509bf28d4fcfa";
    let url = `https://newsapi.org/v2/top-headlines?q=Apple&from=2021-07-07&sortBy=popularity&apiKey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
    const news = await response.json();
    news.articles.forEach((article) => {
        const newsItem = document.createElement("li");
        newsItem.classList.add("news-item");
        newsItem.innerHTML =
            `
            <h5>${article.author}</h5>
            <p>${article.description}</p>
            <h6>${article.source.name}</h6>
            `;
        newsList.appendChild(newsItem);
        console.log(news);
    })

}