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