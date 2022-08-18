const addBookButton = document.getElementById('addBook');
const addToCollectionButton = document.getElementById('formButton');
const formContainer = document.getElementById('formContainer');
// const viewLibraryButton = document.getElementById('viewLibraryButton');
const bookCards = document.querySelectorAll('[data-book-card]');
const bookCardTemplate = document.getElementById('bookCardTemplate');

let myLibrary = [
    {
        "title": "The hobbit",
        "author": "JRR Tolken",
        "hasRead": false,
        "score": 10
    },
];

function Book(title, author, hasRead, score) {
    this.title = title;
    this.author = author;
    this.hasRead = Boolean(hasRead);
    this.score = score;
};



function addBookToLibrary(book) {
    myLibrary.push(book);
};

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        createBookCard(myLibrary[i], i);
    }
}

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
    console.log('click');
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
    btnDiv.appendChild(readButton);
    btnDiv.appendChild(removeButton);
    document.querySelector('.main-content').appendChild(div);
};

function addCardToView() {
    createCard(myLibrary.length);
    addBookToLibrary(createnewCardText(getFormValues()));
    populateBookCard(myLibrary.length - 1);
    formContainer.classList.add("hide");
    clearFormValues();
};

{/* 
        <div class="book-card">
            <p id="cardTitle">Title: The hobbit</p>
            <p id="cardAuthor">Author: JRR Tolken</p>
            <p id="cardScore">Score: 10</p>
            <p id="cardRead">Not read</p>
            <div class="button-container">
                <button>Read</button>
                <button>Remove</button>
            </div>
        </div>



<div class="book-card" data-book-card="" data-book="0">
<ul class="card-content">
    <li id="cardTitle">Title: The hobbit</li>
    <li id="cardAuthor">Author: JRR Tolken</li>
    <li id="cardScore">Score: 10</li>
    <li id="cardRead">Not read</li>
</ul>
</div> */}