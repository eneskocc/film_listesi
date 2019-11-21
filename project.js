const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-films");


const ui = new UI();
const storage = new Storage();

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}


function addFilm(e) {

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        //hata 
        ui.displayMassages("tüm alanları duldurunuz...", "danger");
    } else {
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm);
        ui.displayMassages("başarı ile eklendi...", "success");
    }


    ui.clearInputs(titleElement, directorElement, urlElement);


    e.preventDefault();
}


function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMassages("silme işlemi başarılı...", "success");
    }

}

function clearAllFilms() {

    if (confirm("Silmek istedinize emin misiniz?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
    
}