const UNCOMPLETE_ID = "incompleteBookshelfList";
const COMPLETE_ID = "completeBookshelfList";
const BOOK_ID = "bookId";

document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
    });

    if(cekStorage()){
        loadData();
    }
});

document.addEventListener("onddatasaved", () => {
    console.log("Data berhasil disimpan");
});

document.addEventListener("ondataloaded", () => {
    refreshData();
});

function refreshData(){
    for(book of books){
        const newBook = makeBookList(book, book.status);
        newBook[BOOK_ID] = book.id;

        if(book.status){
            const bookList = document.getElementById(COMPLETE_ID);
            bookList.append(newBook);
        }
        else{
            const bookList = document.getElementById(UNCOMPLETE_ID);
            bookList.append(newBook);
        }
    }
}

function refreshData2(){
    for(book of books){
        const newBook = makeBookList(book, book.status);
        newBook[BOOK_ID] = book.judul;

        if(book.status){
            const bookList = document.getElementById(COMPLETE_ID);
            bookList.append(newBook);
        }
        else{
            const bookList = document.getElementById(UNCOMPLETE_ID);
            bookList.append(newBook);
        }
    }
}

function addBook(){
    const title = document.querySelector("#inputBookTitle");
    const author = document.querySelector("#inputBookAuthor");
    const year = document.querySelector("#inputBookYear");
    const st = document.querySelector("#inputBookIsComplete");
    const daftar = {
        id: +new Date,
        judul: title.value,
        penulis: author.value,
        tahun: year.value,
        status: st.checked
    }

    const book = makeBookList(daftar, daftar.status);

    book[BOOK_ID] = daftar.id;
    books.push(daftar);

    if(daftar.status){
        const bookList = document.getElementById(COMPLETE_ID);
        bookList.append(book);
    }
    else{
        const bookList = document.getElementById(UNCOMPLETE_ID);
        bookList.append(book);
    }

    console.log(daftar);
    updateData();
}

function makeBookList(a, isCompleted){
    const id = document.createElement("p");
    id.setAttribute("hidden",true)
    id.classList.add("id");
    id.innerText = a.id;

    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("judul");
    bookTitle.innerText = a.judul;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("penulis");
    bookAuthor.innerText = "Penulis : "+a.penulis;

    const bookYear = document.createElement("p");
    bookYear.classList.add("tahun");
    bookYear.innerText = "Tahun : " +a.tahun;

    const art = document.createElement("article");
    art.classList.add("book_item");

    if(isCompleted){
        art.append(id,bookTitle,bookAuthor,bookYear,undoButton(),removeButton());
    }
    else{
        art.append(id,bookTitle,bookAuthor,bookYear,finishButton(),removeButton());
    }

    return art;
}

function createButton(buttonClass, text, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonClass);
    button.innerText = text;
    button.addEventListener("click", function(event){
        eventListener(event);
    });
    
    return button;
}

function addToCompleted(taskElement){
    const listCompleted = document.getElementById(COMPLETE_ID);
    const nPenulis = taskElement.querySelector(".penulis").innerText.length;
    const nTahun = taskElement.querySelector(".tahun").innerText.length;

    const daftar = {
        id: taskElement.querySelector(".id").innerText,
        judul: taskElement.querySelector(".judul").innerText,
        penulis: taskElement.querySelector(".penulis").innerText.substr(10,nPenulis),
        tahun: taskElement.querySelector(".tahun").innerText.substr(8,nTahun),
        status: true
    }

    const newBook = makeBookList(daftar,daftar.status);
    const book = findBook(taskElement[BOOK_ID]);
    book.status = daftar.status;

    newBook[BOOK_ID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateData();
}

function finishButton(){
    return createButton("green", "Selesai dibaca", function(event){
        addToCompleted(event.target.parentElement);
    });
}

function undoFromCompleted(taskElement){
    const listCompleted = document.getElementById(UNCOMPLETE_ID);
    const nPenulis = taskElement.querySelector(".penulis").innerText.length;
    const nTahun = taskElement.querySelector(".tahun").innerText.length;

    const daftar = {
        id: taskElement.querySelector(".id").innerText,
        judul: taskElement.querySelector(".judul").innerText,
        penulis: taskElement.querySelector(".penulis").innerText.substr(10,nPenulis),
        tahun: taskElement.querySelector(".tahun").innerText.substr(8,nTahun),
        status: false
    }

    const newBook = makeBookList(daftar,daftar.status);
    const book = findBook(taskElement[BOOK_ID]);
    book.status = daftar.status;

    newBook[BOOK_ID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateData();
}

function undoButton(){
    return createButton("green", "Belum Selesai", function(event){
        undoFromCompleted(event.target.parentElement);
    });
}

function removeButton(){
    return createButton("red", "Hapus Buku", function(event){
        const task = event.target.parentElement;
        const bookPosition = findBookIndex(task[BOOK_ID]);
        books.splice(bookPosition,1);

        task.remove();
        updateData();
    });
}

function searchBook(){
    const inputSearch = document.getElementById("searchBookTitle").value;
    const searchBook = document.getElementById("searchBook");

    searchBook.addEventListener("submit", function(event){
        event.preventDefault();
        findBookTitle(inputSearch);
        refreshData2();
    });
}