function validateForm() {
    const textbox = document.getElementById("textbox").value;
    var validation = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (validation.test(textbox)) {
        alert("No special characters!!!!!");
    } else {
        window.location.href = "success_page.html";
    }
}