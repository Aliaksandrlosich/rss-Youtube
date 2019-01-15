export default class Pagination {
  constructor(cardsContainer, searchBar) {
    this.cardsContainer = cardsContainer;
    this.searchBar = searchBar;
    this.page = 0;
  }

  addPagesNumbers() {
    const pages = Array.from(document.querySelectorAll(".page"));
    pages.map((li, i) => {
      const pageNum = this.page - 1 + i;
      li.innerHTML = `<span class="hidden">${pageNum > 0 ? pageNum : ''}</span>`;
    });
  }

  deletePagesDisplay() {
    const body = document.querySelector("body");
    const footer = document.querySelector("footer");
    if (footer) {
      body.removeChild(footer);
    }
  }

  addEvents() {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.addEventListener("click", (event) => {
      if (event.target.getAttribute("id") === "next") {
        if (this.page < this.cardsContainer.pagesArray.length - 1) {
          this.page += 1;
          if (this.page >= (this.cardsContainer.pagesArray.length / 2) && this.searchBar.nextPage) {
            this.searchBar.search();
          }
          this.cardsContainer.update();
        }
      }
      if (event.target.getAttribute("id") === "prev") {
        if (this.page > 0) {
          this.page -= 1;
          this.cardsContainer.update();
        }
      }
      if ((event.target.getAttribute("class") === "page") && parseInt(event.target.innerText)) {
        this.page = event.target.innerText - 1;
        if (this.page >= (this.cardsContainer.pagesArray.length / 2) && this.searchBar.nextPage) {
          this.searchBar.search();
        }
        this.cardsContainer.update();
      }
    });
    paginationContainer.addEventListener("mousedown", (event) => {
      if (event.target.getAttribute("class") === "page") {
        event.target.childNodes[0].classList.toggle("hidden");
      }
    });
  }

  cratePaginationContainer() {
    this.deletePagesDisplay();
    const footer = document.createElement("footer");
    const ul = document.createElement("ul");
    ul.classList.add("pagination");
    const liPrev = document.createElement("li"),
          liNext = document.createElement("li"),
          liPage1 = document.createElement("li"),
          liPage2 = document.createElement("li"),
          liPage3  = document.createElement("li");
    liPage3.classList.add("page");
    liPage2.classList.add("page");
    liPage1.classList.add("page", "page-1");

    liNext.setAttribute("id","next");
    liNext.classList.add("fas", "fa-angle-right");
    liPrev.classList.add("fas", "fa-angle-left");
    liPrev.setAttribute("id","prev");

    const liPage2Clone = liPage2.cloneNode();
    const liPage3Clone = liPage3.cloneNode();
    document.body.appendChild(footer);
    
    ul.appendChild(liPrev);
    ul.appendChild(liPage3Clone);
    ul.appendChild(liPage2Clone);
    ul.appendChild(liPage1);
    ul.appendChild(liPage2);
    ul.appendChild(liPage3);
    ul.appendChild(liNext);
    footer.appendChild(ul);
  }

  init() {
    this.cratePaginationContainer();
    this.addPagesNumbers();
    this.addEvents();
  }
}