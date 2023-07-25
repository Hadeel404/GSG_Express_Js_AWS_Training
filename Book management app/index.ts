import express from 'express';
import bookRouter from './routes/book_routes';

const app = express();
const PORT = 8000;
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server UP!');
});

app.use('/api/book', bookRouter);

app.use((req, res) => {
  res.status(404).send("Page not found 404");
});

app.listen(PORT, () => {
  console.log(`App is running and Listening on port ${PORT}`);
});