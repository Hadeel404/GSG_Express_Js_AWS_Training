import express from 'express';
import data from '../data/Sample_data'
import Book from '../types/book_types.js';

const router = express.Router();

// 1- Retrieve all books with pagination and sorting options: |sorting thing|
router.get('/', (req: Book.Request, res: Book.Response) => {
  
  const page = parseInt(req.query.page || '1');
  const pageSize = parseInt(req.query.pageSize || '10');
  const filteredItems = data.slice((page - 1) * pageSize, page * pageSize);
  res.send({
    page,
    pageSize,
    total: data.length,
    items: filteredItems
  });
});

// 2- Retrieve a specific book with it's details: |done|
router.get('/:id', (req, res) => {
  const id = req.params.id; // returns the id as a string
  const reqId = parseInt(id); // parsing the id inot a number since the id here is a number not a string.
  const book = data.find(theBook => theBook.id === reqId);
  if (book) {
    res.status(200).send(book);
  } else {
    res.status(404).send("book Does not exist");
  }
});

// 3- Add a new book with validating the input data and handle any error:
router.post('/', (req: Book.Request, res: Book.Response) => {
  const {title, author , publicationYear } = req.body;
  const newBook: Book.Item = {
    id: data[data.length - 1].id + 1, // since the id is in the ascending order, i can just increment the id of the last book by 1
    title: title,
    author: author,
    publicationYear: publicationYear,
  };
  console.log("dtaa length is :"+data.length);
  console.log("book  is :"+ newBook.author + " " +newBook.title);


  data.push(newBook);
  res.status(201).send('Book has been Created');
});

// 4- Update a book by id :
router.put('/:id', (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id)
  const {title, author , publicationYear } = req.body;
  const book = data.find(theBook => theBook.id === id);
  if (book) {
    //console.log(data[reqId-1]);
    data[id-1]={
      id: id,
      title : title,
      author : author,
      publicationYear: publicationYear,
    }
    res.status(200).send("this "+ book.title + " has been updated successfully");
  } else {
    res.status(404).send("book Does not exist");
  }
  res.status(201).send("Book has been Updated successfully")
});

// 5- Delete a book: |done|
router.delete('/:id', (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id)
  data.splice(id - 1, 1)
  res.status(201).send("Book has been deleted")
});

// 6- Query books by name: |Done|
router.get('/find/:title',  (req ,res)  => {
  const title = req.params.title;
  //console.log(" title  "+title);
  const bookTitleToSearch : String = ''+ title;
  //console.log("t=  "+title)
  //const book = data.find(theBook => theBook.title.toLowerCase() === title);
  const filterdeBooks = data.filter(theBook=> theBook.title.toLowerCase() === bookTitleToSearch.toLowerCase());
  if(filterdeBooks.length>0){
    res.status(200).json(filterdeBooks);
  }else{
    res.status(404).send("book with this title does not exist");
  }
});

// 7- Query books by publishing year: |Done|
router.get('/find/year/:publicationYear',  (req ,res)  => {
  const publicationYear = req.params.publicationYear;
  //console.log(" publicationYear  "+ publicationYear);
  const searchedPublicationYear: Number =  parseInt(publicationYear);
  const filterdeBooks = data.filter(theBook=> theBook.publicationYear === searchedPublicationYear);
  if(filterdeBooks.length>0){
    res.status(200).json(filterdeBooks);
  }else{
    res.status(404).send("book with this title does not exist");
  }
});
export default router;