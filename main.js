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
    makeBookList(daftar, daftar.status);

    console.log(daftar);

}

function makeBookList(a, isCompleted){
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = a.judul;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = "Penulis : "+a.penulis;

    const bookYear = document.createElement("p");
    bookYear.innerText = "Tahun : " +a.tahun;

    const btn2 = document.createElement("button");
    btn2.classList.add("red");
    btn2.innerText = "Hapus buku";

    const btn3 = document.createElement("button");
    btn3.classList.add("green");
    btn3.innerText = "Belum Selesai";

    const act = document.createElement("div");
    act.classList.add("action");

    if(isCompleted){
        const bookList = document.getElementById(COMPLETE_ID);
        const art = document.createElement("article");

        art.classList.add("book_item");
        art.append(bookTitle,bookTitle,bookYear,act);
        act.append(btn3, btn2);
        bookList.append(art);

        return bookList;
    }
    else{
        const bookList = document.getElementById(UNCOMPLETE_ID);
        const art = document.createElement("article");
        
        art.classList.add("book_item");
        art.append(bookTitle,bookTitle,bookYear,act);
        act.append(selesaiButton(a),btn2);
        bookList.append(art);

        return bookList;
    }
}

function selesaiButton(a){
    const btn = document.createElement("button");
    btn.classList.add("green");
    btn.innerText = "Selesai Dibaca";

    btn.addEventListener("click", function(){
        const task = a.id;
        const bookList = document.getElementById(COMPLETE_ID);
        bookList.append(makeBookList(a, true));
        console.log(task);
    });

    return btn;
}