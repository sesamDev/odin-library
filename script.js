const addBookButton = document.getElementById('addBook');
const addToCollectionButton = document.getElementById('formButton');
const formContainer = document.getElementById('formContainer');
const viewLibraryButton = document.getElementById('viewLibraryButton');
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

function createBookCard(book, index) {
    let newBook = bookCardTemplate.cloneNode(true);
    newBook.removeAttribute('id');
    newBook.setAttribute('data-book', index)
    newBook.querySelector('#cardTitle').innerHTML = `Title: ${book['title']}`;
    newBook.querySelector('#cardAuthor').innerHTML = `Author: ${book['author']}`;
    newBook.querySelector('#cardScore').innerHTML = `Score: ${book['score']}`;
    newBook.querySelector('#cardRead').innerHTML = book['hasRead'] ? "Read" : "Not read";
    document.body.appendChild(newBook);
}


function createNewBook(content) {
    let book = new Book(content["title"], content["author"], content["has-read"], content["score"]);
    return book;
}

viewLibraryButton.addEventListener("click", function () {
    displayBooks();
})
addBookButton.addEventListener("click", function () {
    formContainer.classList.remove("hide");
})

addToCollectionButton.addEventListener("click", function () {
    addBookToLibrary(createNewBook(getFormValues()));
    formContainer.classList.add("hide");
    clearFormValues();
})

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

function createCard(index) {
    const div = document.createElement('div');
    div.setAttribute('class', "book-card");
    div.setAttribute('data-book', index);
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'card-content');
    div.appendChild(ul);
    const liTitle = document.createElement('li');
    liTitle.setAttribute('id', 'cardTitle');
    div.appendChild(liTitle);
    const liAuthor = document.createElement('li');
    liAuthor.setAttribute('id', 'cardAuthor');
    div.appendChild(liAuthor);
    const liScore = document.createElement('li');
    liScore.setAttribute('id', 'cardScore');
    div.appendChild(liScore);
    const liRead = document.createElement('li');
    liRead.setAttribute('id', 'cardRead');
    div.appendChild(liRead);
    document.body.appendChild(div);
}

{/* <div class="book-card" data-book-card="" data-book="0">
<ul class="card-content">
    <li id="cardTitle">Title: The hobbit</li>
    <li id="cardAuthor">Author: JRR Tolken</li>
    <li id="cardScore">Score: 10</li>
    <li id="cardRead">Not read</li>
</ul>
</div> */}