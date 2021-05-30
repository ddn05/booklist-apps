const STORAGE_KEY = "bookshelf_apps";

let books = [];

function cekStorage(){
    if(typeof(Storage) === undefined){
        alert("Browser anda tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData(){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadData(){
    const serData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serData);

    if(data !== null){
        books = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateData(){
    if(cekStorage()){
        saveData();
    }
}

function findBook(bookId){
    for(book of books){
        if(book.id === bookId){
            return book;
        }
        return null;
    }
}

function findBookIndex(bookId){
    let index = 0;
    for(book of books){
        if(book.id === bookId){
            return index;
        }
        index++;
    }
    return -1;
}