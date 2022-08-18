const addBookButton = document.getElementById('addBook');
const addToCollectionButton = document.getElementById('formButton');
const formContainer = document.getElementById('formContainer');
//const bookCards = document.querySelectorAll('[data-book-card]');

let myLibrary = [];

function Book(title, author, hasRead, score) {
    this.title = title;
    this.author = author;
    this.hasRead = Boolean(hasRead);
    this.score = score;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
};

function populateBookCard(index) {
    let newCardText = document.querySelector(`[data-book='${index}']`);
    newCardText.querySelector('#cardTitle').innerHTML = `Title: ${myLibrary[index]['title']}`;
    newCardText.querySelector('#cardAuthor').innerHTML = `Author: ${myLibrary[index]['author']}`;
    newCardText.querySelector('#cardScore').innerHTML = `Score: ${myLibrary[index]['score']}`;
    newCardText.querySelector('#cardRead').innerHTML = myLibrary[index]['hasRead'] ? "Read" : "Not read";
}


function createnewCardText(content) {
    let book = new Book(content["title"], content["author"], content["has-read"], content["score"]);
    return book;
}

// viewLibraryButton.addEventListener("click", function () {
//     displayBooks();
// })
addBookButton.addEventListener("click", function () {
    formContainer.classList.remove("hide");
})

addToCollectionButton.addEventListener("click", addCardToView);

function getFormValues() {
    var elements = document.getElementById("formContainer").elements;
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        item.name == "has-read" ? console.log(obj[item.name] = item.checked) : obj[item.name] = item.value;
    }

    return JSON.parse(JSON.stringify(obj));
};

function clearFormValues() {
    var elements = document.getElementById("formContainer").elements;
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        item.value = "";
    }

};

//Setup new card elements
function createCard(index) {
    const div = document.createElement('div');
    div.setAttribute('class', "book-card");
    div.setAttribute('data-book', index);
    const pTitle = document.createElement('p');
    pTitle.setAttribute('id', 'cardTitle');
    div.appendChild(pTitle);
    const pAuthor = document.createElement('p');
    pAuthor.setAttribute('id', 'cardAuthor');
    div.appendChild(pAuthor);
    const pScore = document.createElement('p');
    pScore.setAttribute('id', 'cardScore');
    div.appendChild(pScore);
    const pRead = document.createElement('p');
    pRead.setAttribute('id', 'cardRead');
    div.appendChild(pRead);
    const btnDiv = document.createElement('div');
    btnDiv.setAttribute('class', 'button-container')
    div.appendChild(btnDiv);
    const readButton = document.createElement('button');
    const removeButton = document.createElement('button')
    readButton.innerText = "Read";
    removeButton.innerText = "Remove";
    removeButton.setAttribute('class', "remove-button");
    btnDiv.appendChild(readButton);
    readButton.addEventListener('click', e => {
        markAsRead(e);
    })
    btnDiv.appendChild(removeButton);
    removeButton.addEventListener('click', e => {
        removeCard(e)
    });
    document.querySelector('.main-content').appendChild(div);
};

function addCardToView() {
    createCard(myLibrary.length);
    addBookToLibrary(createnewCardText(getFormValues()));
    populateBookCard(myLibrary.length - 1);
    formContainer.classList.add("hide");
    clearFormValues();
};

function removeCard(e) {
    targetedCard = e.currentTarget.parentNode.parentNode;
    delete myLibrary[targetedCard.dataset.book]; //dataset.book return a number which corresponds to the book in myLibrary array
    targetedCard.remove();
}

function markAsRead(e) {
    targetedCard = e.currentTarget.parentNode.parentNode;
    targetedCard.querySelector("#cardRead").innerText = "Read";

};