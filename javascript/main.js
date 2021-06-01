class Book {
  constructor(title, author, total, read, rate) {
    this.title = title;
    this.author = author;
    this.total = total;
    this.read = read;
    this.rate = rate;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.total}</td>
      <td>${book.read}</td>
      <td class='star'><span>★</span></div>${book.rate}</td>
      <td class='action'><a href="#" class="delete">X<a></td>
    `;
  
    list.appendChild(row);
  }

  

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('total').value = '';
    document.getElementById('read').value = '';
    document.querySelector('input[name="rate"]:checked').value = '';
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui  = new UI;

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        total = document.getElementById('total').value,
        left = document.getElementById('read').value,
        rate =  document.querySelector('input[name="rate"]:checked').value;
      

  const book = new Book(title, author, total, left , rate);

  const ui = new UI();

  console.log(ui);


  if(title === '' || author === '' || total === '' || read =='' || rate== '') {
  
    ui.showAlert('Please fill in all fields', 'error');
  } else {
   
    ui.addBookToList(book);

    Store.addBook(book);

    ui.showAlert('Book Added!', 'success');
  
    ui.clearFields();
  }

  e.preventDefault();
});


document.getElementById('book-list').addEventListener('click', function(e){

  const ui = new UI();

  ui.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});
