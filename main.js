const UNCOMPLETE_ID = "incompleteBookshelfList";
const COMPLETE_ID = "completeBookshelfList";

document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("inputBook");

    submitForm.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
    });
});

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

    if(daftar.status){
        const bookList = document.getElementById(COMPLETE_ID);
        bookList.append(book);
    }
    else{
        const bookList = document.getElementById(UNCOMPLETE_ID);
        bookList.append(book);
    }

    console.log(daftar);
}

function makeBookList(a, isCompleted){
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = a.judul;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = "Penulis : "+a.penulis;

    const bookYear = document.createElement("p");
    bookYear.innerText = "Tahun : " +a.tahun;

    const btn1 = document.createElement("button");
    btn1.classList.add("green");
    btn1.innerText = "Selesai dibaca";
    
    const btn2 = document.createElement("button");
    btn2.classList.add("red");
    btn2.innerText = "Hapus buku";

    const btn3 = document.createElement("button");
    btn3.classList.add("green");
    btn3.innerText = "Belum selesai";

    const act = document.createElement("div");
    act.classList.add("action");

    if(isCompleted){
        act.append(btn3, btn2);
    }
    else{
        act.append(btn1,btn2);
    }

    const art = document.createElement("article");
    art.classList.add("book_item");
    art.append(bookTitle,bookAuthor,bookYear,act);

    return art;
}

