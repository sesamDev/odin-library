const addBookButton = document.getElementById('addBook');
const addToCollectionButton = document.getElementById('formButton');
const formContainer = document.getElementById('formContainer');


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

function displayBooks() {
    myLibrary.forEach(book => {
        console.log(book);
    });
}

addBookButton.addEventListener("click", function () {
    formContainer.classList.remove("hide");
})

addToCollectionButton.addEventListener("click", function () {
    addBookToLibrary(getFormValues());
    formContainer.classList.add("hide");
    clearFormValues();
})

function getFormValues() {
    var elements = document.getElementById("formContainer").elements;
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        item.name == "has-read" ? obj[item.name] = item.checked : obj[item.name] = item.value;
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