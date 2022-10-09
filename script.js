const bookCards = document.querySelectorAll("[data-book-card]");

class Book {
  constructor(title, author, hasRead, score) {
    this.title = title;
    this.author = author;
    this.hasRead = hasRead;
    this.score = score;
  }
}

class FormValidation {
  static form = document.querySelector("form");
  static title = document.getElementById("inputTitle");
  static author = document.getElementById("inputAuthor");
  static score = document.getElementById("inputScore");

  static applyValidation() {
    this.initValidationHandlers();
  }

  static initValidationHandlers() {
    this.handleAuthorValidation();
    this.handleTitleValidation();
    this.handleScoreValidation();
    this.errorMessage();
  }
  static handleTitleValidation() {
    this.title.addEventListener("input", () => {
      if (!this.title.validity.valid) {
        this.title.setCustomValidity("Title needs to be entered.");
        this.title.reportValidity();
      }
    });
  }

  static handleAuthorValidation() {
    this.author.addEventListener("input", () => {
      if (!this.author.validity.valid) {
        this.author.setCustomValidity("Author needs to be entered.");
        this.author.reportValidity();
      }
    });
  }

  static handleScoreValidation() {
    this.score.addEventListener("input", () => {
      if (!this.score.validity.valid) {
        this.score.setCustomValidity("Score needs to be entered.");
        this.score.reportValidity();
      }
    });
  }

  static formValid() {
    return this.title.validity.valid;
  }

  static errorMessage() {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = "Missing information";
    errorMsg.classList.add("error-msg");
    errorMsg.classList.add("hide");
    document.querySelector(".form-card").appendChild(errorMsg);
  }

  static showError() {
    const errorMsg = document.querySelector(".error-msg");
    console.log(errorMsg);
    errorMsg.classList.remove("hide");
  }

  static hideError() {
    const errorMsg = document.querySelector(".error-msg");
    console.log(errorMsg);

    errorMsg.classList.add("hide");
  }
}

class Library {
  static collection = [];
  //Document queries
  static formContainer = document.getElementById("formContainer");

  static loadLibrary() {
    this.initAllButtons();
    console.log(bookCards);
    FormValidation.applyValidation();
  }

  static toggleForm() {
    formContainer.classList.toggle("hide");
  }
  //Buttons
  static initAllButtons() {
    this.initAddBookButton();
    this.initAddToCollectionButton();
  }
  static initAddBookButton() {
    const addBookButton = document.getElementById("addBook");
    addBookButton.addEventListener("click", this.toggleForm);
  }
  static initAddToCollectionButton() {
    const addToCollectionButton = document.getElementById("formButton");
    addToCollectionButton.addEventListener("click", () => {
      if (FormValidation.formValid()) {
        this.addCardToView();
        FormValidation.hideError();
      } else {
        FormValidation.showError();
        console.log("Form not valid");
      }
    });
  }

  // Setup new card elements
  static createCard(index) {
    const div = document.createElement("div");
    div.setAttribute("class", "book-card");
    div.setAttribute("data-book", index);
    const pTitle = document.createElement("p");
    pTitle.setAttribute("id", "cardTitle");
    div.appendChild(pTitle);
    const pAuthor = document.createElement("p");
    pAuthor.setAttribute("id", "cardAuthor");
    div.appendChild(pAuthor);
    const pScore = document.createElement("p");
    pScore.setAttribute("id", "cardScore");
    div.appendChild(pScore);
    const pRead = document.createElement("p");
    pRead.setAttribute("id", "cardRead");
    div.appendChild(pRead);
    const btnDiv = document.createElement("div");
    btnDiv.setAttribute("class", "button-container");
    div.appendChild(btnDiv);
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");
    readButton.innerText = "Read";
    removeButton.innerText = "Remove";
    removeButton.setAttribute("class", "remove-button");
    btnDiv.appendChild(readButton);
    readButton.addEventListener("click", (e) => {
      this.markAsRead(e);
    });
    btnDiv.appendChild(removeButton);
    removeButton.addEventListener("click", (e) => {
      this.removeCard(e);
    });
    document.querySelector(".main-content").appendChild(div);
  }

  static addCardToView() {
    console.log("click");
    this.createCard(this.collection.length);
    this.addBookToLibrary();
    this.populateBookCard(this.collection.length - 1);
    this.toggleForm();
    this.clearFormValues();
  }

  static populateBookCard(index) {
    let newCardText = document.querySelector(`[data-book='${index}']`);
    newCardText.querySelector("#cardTitle").innerHTML = `Title: ${this.collection[index]["title"]}`;
    newCardText.querySelector("#cardAuthor").innerHTML = `Author: ${this.collection[index]["author"]}`;
    newCardText.querySelector("#cardScore").innerHTML = `Score: ${this.collection[index]["score"]}`;
    newCardText.querySelector("#cardRead").innerHTML = this.collection[index]["hasRead"] ? "Read" : "Not read";
  }
  static clearFormValues() {
    let elements = document.getElementById("formContainer").elements;
    for (var i = 0; i < elements.length; i++) {
      let item = elements.item(i);
      item.value = "";
    }
  }
  static addBookToLibrary() {
    let book = this.createnewCardText();
    this.collection.push(book);
  }

  static createnewCardText() {
    let content = this.getFormValues();
    let book = new Book(content["title"], content["author"], content["has-read"], content["score"]);
    return book;
  }

  static getFormValues() {
    var elements = document.getElementById("formContainer").elements;
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
      var item = elements.item(i);
      item.name == "has-read" ? console.log((obj[item.name] = item.checked)) : (obj[item.name] = item.value);
    }

    return JSON.parse(JSON.stringify(obj));
  }
  static markAsRead(e) {
    const targetedCard = e.currentTarget.parentNode.parentNode;
    targetedCard.querySelector("#cardRead").innerText = "Read";
  }

  static removeCard(e) {
    let targetedCard = e.currentTarget.parentNode.parentNode;
    delete this.collection[targetedCard.dataset.book]; //dataset.book return a number which corresponds to the book in myLibrary array
    targetedCard.remove();
  }
}

Library.loadLibrary();
