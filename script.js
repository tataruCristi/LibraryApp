const modalBtn = document.querySelector('#modalBtn');
const modalBg = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.modal-close');
const addBtn = document.querySelector('#addBookBtn');



modalBtn.addEventListener('click', () => {
    modalBg.classList.add('bg-active');
})

modalClose.addEventListener('click', () => {
    modalBg.classList.remove('bg-active');
})

addBookBtn.addEventListener('click', () => {
    modalBg.classList.remove('bg-active');
    library.addBook(getBookFromInput());
    createBookCard(getBookFromInput());
    clearInputs();
})

const getBookFromInput = () => {
    const titleInput = document.querySelector('#bookTitle').value;
    const authorInput = document.querySelector('#bookAuthor').value;
    const pagesInput = document.querySelector('#pages').value;
    const isRead = document.querySelector('#isRead').checked;
    
    return new Book(titleInput, authorInput, pagesInput, isRead);
}

const clearInputs = () => {
    document.querySelector('#bookTitle').value = '';
    document.querySelector('#bookAuthor').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#isRead').checked = false;
}



class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        if(!this.books.some((book) => book.title === newBook.title)){
            this.books.push(newBook);
        }
    }

    showBooks() {
        console.log(this.books);
    }

    getBook(title) {
        for (let book of this.books) {
            if(title === book.title) {
                return book;
            }
        }
    }

    deleteBook(title) {
        const filtered = this.books.filter(value => value.title !== title);
        this.books = filtered;
    }
}

const book1 = new Book("Carte 1", "Autor 1", 50, true);
const book2 = new Book("Carte 2", "Autor 2", 55, false);
const book3 = new Book("Carte 3", "Autor 3", 60, false);

const library = new Library();

// library.addBook(book1);
// library.addBook(book2);
// library.addBook(book3);




const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('h3')
    const author = document.createElement('h3')
    const pages = document.createElement('h3')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')
  
    bookCard.classList.add('book-card')
    readBtn.classList.add('btn')
    removeBtn.classList.add('btn')
    removeBtn.classList.add('btn-red')
    readBtn.addEventListener('click', toggleRead);
    removeBtn.addEventListener('click', (e) => {
        const title = e.target.closest('div').firstChild.innerHTML.replaceAll('"', '');
        library.deleteBook(title);
        updateBooksGrid();
    });
  
    title.textContent = `"${book.title}"`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    removeBtn.textContent = 'Remove'
  
    if (book.isRead) {
      readBtn.textContent = 'Read'
      readBtn.classList.add('btn-light-green')
    } else {
      readBtn.textContent = 'Not read'
      readBtn.classList.add('btn-light-red')
    }
  
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(readBtn)
    bookCard.appendChild(removeBtn)
    booksGrid.appendChild(bookCard)
}

const updateBooksGrid = () => {
    resetBooksGrid();
    for (let book of library.books) {
        createBookCard(book);
    }
}

const resetBooksGrid = () => {
      booksGrid.innerHTML = '';
}

const toggleRead = (e) => {
    const title = e.target.closest('div').firstChild.innerHTML.replaceAll('"', '')
    const book = library.getBook(title);
    if(book.isRead) {
        book.isRead = false;
    } else {
        book.isRead = true;
    }
    updateBooksGrid();
}

updateBooksGrid();