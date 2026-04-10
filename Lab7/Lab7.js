function searchBook() {
    const book = document.getElementById("search").value;
    const bookName = book.trim().replace(/ /g, '+');
    let bookTitle = [];
    let authorName = [];

    fetch(`https://openlibrary.org/search.json?title=${bookName}`)
        .then((result) => result.json())
        .then((resultJson) => {
            resultJson.docs.forEach((book) => {
                bookTitle.push(book.title);
                authorName.push(book.author_name);
            });
            for (let i = 0; i < bookTitle.length; i++) {
            document.getElementById("book_name").innerHTML += `<li>${bookTitle[i]}</li>`;
            document.getElementById("author").innerHTML += `<li>${authorName[i]}</li>`;
            }
        });
}