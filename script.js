

class Book{

  constructor(bookName,bookAuthor,bookISBN)
  {
    this.bookName=bookName;
    this.bookAuthor=bookAuthor;
    this.bookISBN=bookISBN;
    this.addBook();
  }

  addBook()
  {
    var books=[];
    if(localStorage.getItem("bookApp")===null)
    {
      books.push(this);
      localStorage.setItem("bookApp",JSON.stringify(books));
    }
    else{
      books=JSON.parse(localStorage.getItem("bookApp"));
      books.push(this);
      localStorage.setItem("bookApp",JSON.stringify(books));
    }
  }

  static deleteBook(tr)
  {
    tr=tr.parentElement.parentElement;
    let bookISBN=tr.childNodes[2].innerText;
    let books=localStorage.getItem("bookApp");
    books=JSON.parse(books);
    books=books.filter((ele) => ele.bookISBN !== bookISBN);
    localStorage.setItem("bookApp",JSON.stringify(books));
    document.getElementById("books").removeChild(tr);
  }
}



function buildUI()
{
  let books=localStorage.getItem("bookApp");
  if(books===null)
  {
    books=[];
  }
  books=JSON.parse(books);
  books.forEach((ele,index)=>
  {
    tr=document.createElement("tr");
    tr.innerHTML=`<td>${ele.bookName}</td><td>${ele.bookAuthor}</td><td>${ele.bookISBN}</td><td><button type="button" class="btn-close" aria-label="Close" onclick="Book.deleteBook(this)"></button></td>`;
    document.getElementById("books").appendChild(tr);
  })
}

buildUI();

function updateUI(event)
{
  event.preventDefault();
  bookName=document.getElementById("book-name").value;
  bookAuthor=document.getElementById("book-author").value;
  bookISBN=document.getElementById("book-isbn").value;

  var newbook=new Book(bookName,bookAuthor,bookISBN);
  tr=document.createElement("tr");
  tr.innerHTML=`<td>${bookName}</td><td>${bookAuthor}</td><td>${bookISBN}</td><td><button type="button" class="btn-close" aria-label="Close" onclick="Book.deleteBook(this)"></button></td>`;
  document.getElementById("books").appendChild(tr);
}