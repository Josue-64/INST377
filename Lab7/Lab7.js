async function searchBook() {
    const book = document.getElementById("search").value;
    const bookName = book.trim().replace(/ /g, '+');
    let bookTitle = [];
    let authorName = [];

    document.getElementById("book_name").innerHTML = "";
    document.getElementById("author").innerHTML = "";

   
    document.getElementById("loading").style.display = "block";

    const resultJson = await fetch(`https://openlibrary.org/search.json?title=${bookName}`).then((result) => result.json()); // ✅ Fixed variable name


    resultJson.docs.forEach((book) => {
        bookTitle.push(book.title);
        authorName.push(book.author_name);
    });

    for (let i = 0; i < bookTitle.length; i++) {
        document.getElementById("book_name").innerHTML += `<li>${bookTitle[i]}</li>`;
        document.getElementById("author").innerHTML += `<li>${authorName[i]}</li>`;
    }
    document.getElementById("loading").style.display = "none";
    document.getElementById("row_header").style.display= "flex";
}