const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "0an5btthu5o9",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "aVPGEhKxou-fCpQN_RdRBX8AZ5j1wY3LkthQKdD6eRU",
});

// VARABLE
const container = document.querySelector(".content");
const SubContainer = document.querySelector(".sub-parent-2 .sub-containers");
const latest = document.querySelector(".latest-div");

// GET DATA
class Data {
  async getData() {
    try {
      let contentful = await client.getEntries({
        content_type: "blog",
      });

      const data = await fetch("articles.json");
      const result = await data.json();

      let $articles = contentful.items;
      $articles = $articles.map((_article) => {
        // console.log(_article)
        const title = _article.fields.title;
        const publisherName = _article.fields.publisherName;
        const article = _article.fields.article.content[0].content[0].value;
        const image = _article.fields.publisherPhotoOrImage.fields.file.url;
        const date = _article.fields.date
        return { title, article, publisherName, image, date };
      });
      return $articles;
    } catch (err) {
      console.log(err);
    }
  }
}

// DSIPLAY DATA TO UI
class UI {
  displayArticles(articles) {
    let result = "";
    articles.forEach((article) => {
      result += `<div class="article-container">
          <div class="article">
            <div class="top-side">
              <img src=${article.image} alt="image" class="publisher-profile">
              <div>
                <h3><span>by:</span> ${article.publisherName} </h3>
                <p>${article.date}</p>
              </div>
            </div>
            <div class="headline-div">
              <h1>${article.title}</h1>
            </div>
          </div>
          <div class="article-description">
            <p>${article.article}</p>
            <div class="share-div">
              <a href="https://wa.me/?text=${article.title}${article.article}"><span>share</span>&nbsp;
                <i class="fas fa-share"></i>
              </a>
            </div>
          </div>
        </div>`;
    });
    container.innerHTML = result;
  }
  displayLatest(articles) {
    let result = "";
    let newArr = articles.slice(0, 1);
    newArr.forEach((article) => {
      result += `<article class="article-div">
              <div class="headline-imgage">
                <img src=${article.image} alt="image" class="headline-img" />
              </div>
              <div class="description">
                <h1 class="title">${article.title}</h1>
                <p>${article.article.substr(0, 200)} ...</p>
                <a href="articles.html"><button class="btn">read more</button></a>
              </div>
            </article>`;
    });
    SubContainer.insertAdjacentHTML("afterbegin", result);
  }
  displayBrif(articles) {
    let result = "";
    let newArr = articles.slice(1, 2);
    newArr.forEach((article) => {
      result = `<div class="wrapper">
                <div class="top">
                  <img
                    src=${article.image}
                    alt="image"
                    class="publisher_img"
                  />
                  <div>
                    <h2>${article.publisherName}</h2>
                    <p>${article.date}</p>
                  </div>
                </div>
                <div class="desc">
                  <p>${article.article.substr(0, 200)} ...</p>
                  <a href="articles.html"><button class="btn">read more</button></a>
                </div>
              </div>`;
    });
    latest.insertAdjacentHTML("afterbegin", result);
  }
}

// EVENT LISTERNER
window.addEventListener("load", function () {
  const data = new Data();
  const ui = new UI();

  data.getData().then((article) => {
    ui.displayArticles(article);
    ui.displayLatest(article);
    ui.displayBrif(article);
  });
});
