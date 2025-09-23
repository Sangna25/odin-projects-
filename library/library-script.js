myLibrary=[];
function Book(title,author,pages,read){
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor ")
    }
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read
    this.info=function(){
        console.log(this.title+" by "+this.author+","+this.pages+"pages"+","+read);
    }
}
//Book Prototype
Book.prototype.toggleRead=function(){
    this.read=!this.read;
}

function addBookToLibrary(book){
    myLibrary.push(book)
}
const container=document.querySelector('#container');


// console.log(myLibrary);
// console.log(myLibrary[0].info())
function displayBooks(myLibrary){
    container.innerHTML=''
    for(let i=0;i<myLibrary.length;i++){
        let card=document.createElement('div');
       let title=document.createElement('h2');
       let author=document.createElement('p');
       let pages=document.createElement('p');
       title.textContent=myLibrary[i].title;
       author.textContent=myLibrary[i].author;
       pages.textContent=myLibrary[i].pages;
       
        let markBtn=document.createElement('button');
        let removeBtn=document.createElement('button');
        removeBtn.textContent="Remove";
        const currentBook=myLibrary[i];
        if(currentBook.read){
            markBtn.textContent="Mark as Unread";
        }
        else{
            markBtn.textContent="Mark as Read";

        }
        card.dataset.bookId= myLibrary[i].id;

        removeBtn.addEventListener('click',()=>{
            const bookId=card.dataset.bookId;
            const bookIndex=myLibrary.findIndex(book=>book.id=== bookId);
            myLibrary.splice(bookIndex,1);
            displayBooks(myLibrary);
               
    })

    markBtn.addEventListener('click',()=>{
        const bookId=card.dataset.bookId;
        const bookIndex=myLibrary.findIndex(book=> book.id===bookId);
        const book=myLibrary[bookIndex]
        book.toggleRead();
        displayBooks(myLibrary);
    })
    card.append(title,author,pages,removeBtn,markBtn);
     container.append(card);
    }
}
const dialog=document.querySelector('#book-dialog');
const newBtn =document.querySelector('#new-book');
newBtn.addEventListener('click',()=>{
    dialog.showModal();
});

const closeBtn=document.querySelector('#close-dialog');
closeBtn.addEventListener('click',()=>{
    dialog.close();
});
const form=document.querySelector('#add-book-form');
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const titleInput=document.querySelector('#title');
    const authorInput=document.querySelector('#author');
    const pageInput=document.querySelector('#pages');
    const readStatusInput=document.querySelector('input[name="readStatus"]:checked');
    const title=titleInput.value;
    const author=authorInput.value;
    const pages=pageInput.value;
    const readStatus=readStatusInput.value ==='true';

    const newBook= new Book(title,author,pages,readStatus);
    addBookToLibrary(newBook);
    dialog.close();
    form.reset();
    displayBooks(myLibrary);
})



displayBooks(myLibrary);