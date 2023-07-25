"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Sample_data_1 = __importDefault(require("../data/Sample_data"));
const router = express_1.default.Router();
// 1- Retrieve all books with pagination and sorting options: |sorting thing|
router.get('/', (req, res) => {
    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const filteredItems = Sample_data_1.default.slice((page - 1) * pageSize, page * pageSize);
    res.send({
        page,
        pageSize,
        total: Sample_data_1.default.length,
        items: filteredItems
    });
});
// 2- Retrieve a specific book with it's details: |done|
router.get('/:id', (req, res) => {
    const id = req.params.id; // returns the id as a string
    const reqId = parseInt(id); // parsing the id inot a number since the id here is a number not a string.
    const book = Sample_data_1.default.find(theBook => theBook.id === reqId);
    if (book) {
        res.status(200).send(book);
    }
    else {
        res.status(404).send("book Does not exist");
    }
});
// 3- Add a new book with validating the input data and handle any error:
router.post('/', (req, res) => {
    const { title, author, publicationYear } = req.body;
    const newBook = {
        id: Sample_data_1.default[Sample_data_1.default.length - 1].id + 1,
        title: title,
        author: author,
        publicationYear: publicationYear,
    };
    console.log("dtaa length is :" + Sample_data_1.default.length);
    console.log("book  is :" + newBook.author + " " + newBook.title);
    Sample_data_1.default.push(newBook);
    res.status(201).send('Book has been Created');
});
// 4- Update a book by id :
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, publicationYear } = req.body;
    const book = Sample_data_1.default.find(theBook => theBook.id === id);
    if (book) {
        //console.log(data[reqId-1]);
        Sample_data_1.default[id - 1] = {
            id: id,
            title: title,
            author: author,
            publicationYear: publicationYear,
        };
        res.status(200).send("this " + book.title + " has been updated successfully");
    }
    else {
        res.status(404).send("book Does not exist");
    }
    res.status(201).send("Book has been Updated successfully");
});
// 5- Delete a book: |done|
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Sample_data_1.default.splice(id - 1, 1);
    res.status(201).send("Book has been deleted");
});
// 6- Query books by name: |Done|
router.get('/find/:title', (req, res) => {
    const title = req.params.title;
    //console.log(" title  "+title);
    const bookTitleToSearch = '' + title;
    //console.log("t=  "+title)
    //const book = data.find(theBook => theBook.title.toLowerCase() === title);
    const filterdeBooks = Sample_data_1.default.filter(theBook => theBook.title.toLowerCase() === bookTitleToSearch.toLowerCase());
    if (filterdeBooks.length > 0) {
        res.status(200).json(filterdeBooks);
    }
    else {
        res.status(404).send("book with this title does not exist");
    }
});
// 7- Query books by publishing year: |Done|
router.get('/find/year/:publicationYear', (req, res) => {
    const publicationYear = req.params.publicationYear;
    //console.log(" publicationYear  "+ publicationYear);
    const searchedPublicationYear = parseInt(publicationYear);
    const filterdeBooks = Sample_data_1.default.filter(theBook => theBook.publicationYear === searchedPublicationYear);
    if (filterdeBooks.length > 0) {
        res.status(200).json(filterdeBooks);
    }
    else {
        res.status(404).send("book with this title does not exist");
    }
});
exports.default = router;
