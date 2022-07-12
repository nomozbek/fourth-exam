"use strict";

//Get elements from index.html
let btnLogout = document.querySelector(".book__logout-btn");
let localToken = window.localStorage.getItem("token");
let searchInput = document.querySelector(".search__input");
let cardList = document.querySelector(".card__list");
let totalResult = document.querySelector(".books__total-resul-num");
let bookmarkList = document.querySelector(".bookmark__list");
let orderBtn = document.querySelector(".books__order-btn");
let pagenationList = document.querySelector(".pagenation__list");
const elPrevBtn = document.querySelector(".prev__btn");
const elNextBtn = document.querySelector(".next__btn");
let pagenationListWrap = document.querySelector(".pagenation__list-wrap");
let searchInputValue;
let indexNum;
let mainArr;

//Login page
if (!localToken) {
  window.location.replace("login.html");
}

//Logout button
btnLogout.addEventListener("click", function () {
  window.localStorage.removeItem("token");
  window.location.replace("login.html");
});

//Bokmark button
const renderBookmarks = function (arr, element) {
  arr.forEach((item) => {
    // Create element wwith bookmark item
    let htmlBookmark = `
    <li class="bookmark__item">
      <div class="bookmark__item-text">
        <h5 class="bookmark__item-heading">${item.volumeInfo?.title}</h5>
        <p class="bookmark__item-desc">${item.volumeInfo?.authors}</p>
      </div>
      <div class="bookmark__item-btns">
        <a class="bookmark__read-btn" target="_blank" href="${item.volumeInfo?.previewLink}">
          <img src="./images/bookmark-read.svg" alt="" width="24" height="24">
        </a>
        <button  class="bookmark__delete-btn">
          <img src="./images/bookmark-delete.svg" data--data-bookmark="${item.id}" class="bookmark__delete-btn-img" alt="" width="24" height="24">
        </button>
      </div>
    </li>
    `;
    element.insertAdjacentHTML("beforeend", htmlBookmark);
  });
};

cardList.addEventListener("click", function (evt) {
  if (evt.target.matches(".btn__bookmark")) {
    const moreBtnDataset = evt.target.dataset.bookmark;
    mainArr.forEach((data) => {
      if (data.id == moreBtnDataset) {
        if (!bookmarksArr.includes(data)) {
          bookmarksArr.push(data);

          bookmarkList.innerHTML = null;
          renderBookmarks(bookmarksArr, bookmarkList);
          window.localStorage.setItem(
            "localBookmarks",
            JSON.stringify(bookmarksArr)
          );
        }
      }
    });
  }
});

//Bookmark delete button 
bookmarkList.addEventListener("click", function (evt) {
  const isBookmarkDeleteBtn = evt.target.matches(".bookmark__delete-btn-img");

  if (isBookmarkDeleteBtn) {
    const bookmarkDeleteBtnDataset = evt.target.dataset.DataBookmark;

    const foundBookIndex = bookmarksArr.findIndex(
      (item) => item.id == bookmarkDeleteBtnDataset
    );
    bookmarksArr.splice(foundBookIndex, 1);

    bookmarkList.innerHTML = null;
    renderBookmarks(bookmarksArr, bookmarkList);
    window.localStorage.setItem("localBookmarks", JSON.stringify(bookmarksArr));
  }
});

// Bookmark placement local storage
const localBookmarks = JSON.parse(
  window.localStorage.getItem("localBookmarks")
);
let bookmarksArr = localBookmarks || [];

//Render books
const renderBooks = function (arr, element) {
  element.innerHTML = null;
  arr.forEach((item) => {
    const htmlCard = `
      <li class="card__item">
        <div class="card main__card">
          <div class="card__header">
            <img class="card__header-img" src="${item.volumeInfo?.imageLinks.thumbnail}" alt="...">
          </div>
          <div class="card-body">
            <h3 class="card-title">${item.volumeInfo?.title}</h3>
            <p class="card-text mb-1">${item.volumeInfo?.authors}</p>
            <p class="card-text">${item.volumeInfo?.publishedDate}</p>
            <div class="card__btns">
              <button type="button" data-bookmark="${item.id}" class="btn btn-warning btn__bookmark">Bookmark</button>
              <button type="button" data-bookmark="${item.id}" class="btn btn-info btn__more type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"">More Info</button>
            </div>
            <a class="btn btn-secondary btn__read w-100" href="${item.volumeInfo?.previewLink}"        target="_blank">Read</a>
          </div>
        </div>
      </li>
        `;

    //Create element to create modals
    let newModal = document.createElement("div");
    let newModalHeader = document.createElement("div");
    let newModalHeaderHeading = document.createElement("h5");
    let newModalHeaderBtn = document.createElement("button");
    let newModalBody = document.createElement("div");
    let newModalImg = document.createElement("img");
    let newModalDesc = document.createElement("p");
    let newModaTexts = document.createElement("div");
    let newModalAutor = document.createElement("p");
    let newModalAutorText = document.createElement("span");
    let newModalPub = document.createElement("p");
    let newModalPubText = document.createElement("span");
    let newModalPubSher = document.createElement("p");
    let newModalPubSherText = document.createElement("span");
    let newModalFooter = document.createElement("div");
    let newModalFooterBtn = document.createElement("a");

    //Add addributes
    newModal.setAttribute("class", "offcanvas offcanvas-end");
    newModal.setAttribute("tabindex", "-1");
    newModal.setAttribute("id", "offcanvasRight");
    newModal.setAttribute("aria-labelledby", "offcanvasRightLabel");
    newModalHeader.setAttribute("class", "offcanvas-header modal__header");
    newModalHeaderHeading.setAttribute("id", "offcanvasRightLabel modal__heading");
    newModalHeaderBtn.setAttribute("type", "button");
    newModalHeaderBtn.setAttribute("class", "btn-close text-reset");
    newModalHeaderBtn.setAttribute("data-bs-dismiss", "offcanvas");
    newModalHeaderBtn.setAttribute("aria-label", "Close");
    newModalBody.setAttribute("class", "offcanvas-body modal__body");
    newModalImg.setAttribute("class", "modal__img");
    newModalDesc.setAttribute("class", "modal__desc");
    newModaTexts.setAttribute("class", "modal__texts");
    newModalAutor.setAttribute("class", "modal__autor");
    newModalAutorText.setAttribute("class", "modal__autor-text");
    newModalPub.setAttribute("class", "modal__autor");
    newModalPubText.setAttribute("class", "modal__autor-text");
    newModalPubSher.setAttribute("class", "modal__autor");
    newModalPubSherText.setAttribute("class", "modal__autor-text");
    newModalFooter.setAttribute("class", "modal__footer");
    newModalFooterBtn.setAttribute("target", "_blank");
    newModalFooterBtn.setAttribute("class", "btn btn-secondary");

    //Add text content to our modals
    newModalAutor.textContent = " Author : ";
    newModalPub.textContent = " Published : ";
    newModalPubSher.textContent = " Publishers : ";
    newModalFooterBtn.textContent = "Read";

    cardList.addEventListener("click", function (evt) {
      if (evt.target.matches(".btn__more")) {
        const moreBtnDataset = evt.target.dataset.bookmark;
        mainArr.forEach((data) => {
          if (data.id == moreBtnDataset) {
            newModalHeaderHeading.textContent = data.volumeInfo?.title;
            newModalImg.setAttribute( "src", `${data.volumeInfo?.imageLinks.thumbnail}`);
            newModalDesc.textContent = data.volumeInfo?.description;
            newModalAutorText.textContent =
              data.volumeInfo?.authors.join(",  ");
            newModalPubText.textContent = data.volumeInfo?.publishedDate;
            newModalPubSherText.textContent = data.volumeInfo?.publisher;
            newModalFooterBtn.setAttribute(
              "href",
              `${data.volumeInfo?.previewLink}`
            );
          }
        });
      }
    });

    element.insertAdjacentHTML("beforeend", htmlCard);

    //Append modal to html
    element.appendChild(newModal);
    newModal.appendChild(newModalHeader);
    newModalHeader.appendChild(newModalHeaderHeading);
    newModalHeader.appendChild(newModalHeaderBtn);
    newModal.appendChild(newModalBody);
    newModalBody.appendChild(newModalImg);
    newModalBody.appendChild(newModalDesc);
    newModalBody.appendChild(newModaTexts);
    newModaTexts.appendChild(newModalAutor);
    newModalAutor.appendChild(newModalAutorText);
    newModaTexts.appendChild(newModalPub);
    newModalPub.appendChild(newModalPubText);
    newModaTexts.appendChild(newModalPubSher);
    newModalPubSher.appendChild(newModalPubSherText);
    newModal.appendChild(newModalFooter);
    newModalFooter.appendChild(newModalFooterBtn);

  });
};

//Get API 
const getBooks = async function () {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=search+${searchInputValue}&startIndex=${indexNum}`
    );

    const data = await response.json();
    totalResult.textContent = data.totalItems;
    mainArr = data.items;

    //Main validator function
    if (data.totalItems > 0) {
      renderBooks(data.items, cardList);
    } else {
      cardList.innerHTML = null;
      let newErrTex = document.createElement("p");
      newErrTex.setAttribute("class", "err-tex text-center text-danger w-100");
      newErrTex.textContent = "Book is not found";
      cardList.appendChild(newErrTex);
    }

    let totalResultItems = data.totalItems;
    let totalPageResult = Math.ceil(totalResultItems / 10);
    pagenationList.innerHTML = null;

    //Pagenation buttons
    for (let i = 0; i <= totalPageResult; i++) {
      let mainNum = 1 + i;
      let htmlLi = `<li class="page-item page-link page__btn">${mainNum}</li>`;

      if (indexNum == i * 10) {
        htmlLi = `<li class="page-item page-link active__page">${mainNum}</li>`;
      } else {
        htmlLi = `<li class="page-item page-link">${mainNum}</li>`;
      }

      pagenationList.insertAdjacentHTML("beforeend", htmlLi);
    }


    indexNum === 0 ? (elPrevBtn.disabled = true) : (elPrevBtn.disabled = false);
    disabletBtn[1] === totalPageResult
      ? (elNextBtn.disabled = true)
      : (elNextBtn.disabled = false);
  } catch (err) {
    cardList.innerHTML = null;
    // pagenationList.innerHTML = null;
    let newErrTex = document.createElement("p");
    newErrTex.setAttribute("class", "err-tex text-center text-danger w-100");
    newErrTex.textContent = "There is not enough information on this page, so please go to the next page";
    cardList.appendChild(newErrTex);
  }
};

let disabletBtn = [];


// Search Input Value 
searchInput.addEventListener("change", function (evt) {
  searchInputValue = searchInput.value;
  indexNum = 0;
  getBooks();
});

// Order Buttton 
orderBtn.addEventListener("click", function () {
  searchInputValue = searchInputValue + "=relevance";
  getBooks();
});

// Prew Button 
elPrevBtn.addEventListener("click", () => {
  indexNum = indexNum - 10;
  getBooks();
});

// Next Button 
elNextBtn.addEventListener("click", () => {
  indexNum = indexNum + 10;
  getBooks();
});

// Pagenation Task 
pagenationList.addEventListener("click", function (evt) {
  let counter = Number(evt.target.textContent * 10)
  disabletBtn.push(counter)
  indexNum = counter;
  getBooks();
});
