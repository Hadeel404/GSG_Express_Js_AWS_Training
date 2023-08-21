import express from 'express';
import bookRouter from './routes/book_routes';

const app = express();
//const PORT = 8000;
const PORT = 80;
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server UP!');
});

app.get("/health", function (req, res) {
	res.sendStatus(200).send(" healthyyy");
})

app.use('/api/book', bookRouter);

app.use((req, res) => {
  res.status(404).send("Page not found 404");
});

app.listen(PORT, () => {
  console.log(`App is running and Listening on port ${PORT}`);
});