function searchBook() {
    const book = document.getElementById("search").value;
    const bookName = book.trim().replace(/ /g, '+');
    console.log(book);
    console.log(bookName);

    fetch(`https://openlibrary.org/search.json?title=${bookName}`)
        .then((resultJson) => {
            console.log(resultJson)
            document.getElementById("author").innerHTML = `${resultJson.author_name}`;
        });
}
