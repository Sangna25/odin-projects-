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
function addBookToLibrary(book){
    myLibrary.push(book)
}
const container=document.querySelector('#container');
const book=new Book('Hobbit','J.R.R Tolkien',295,'not read yet');
addBookToLibrary(book);
// console.log(myLibrary);
// console.log(myLibrary[0].info())
function displayBooks(myLibrary){
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
        markBtn.textContent="Mark as Read";
        card.append(title,author,pages,removeBtn,markBtn);
        container.append(card);
        card.dataset.bookId= myLibrary[i].id

    }
}
const dialog=document.querySelector('#book-dialog');
const newBtn =document.querySelector('#new-book');
newBtn.addEventListener('click',()=>{
    dialog.showModal()
});

const closeBtn=document.querySelector('#close-dialog');
closeBtn.addEventListener('click',()=>{
    dialog.close();
});
const form=document.querySelector('#add-book-form');
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log('Form Submitted!');

})



displayBooks(myLibrary);