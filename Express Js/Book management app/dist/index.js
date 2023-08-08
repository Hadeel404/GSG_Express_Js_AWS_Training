"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = __importDefault(require("./routes/book_routes"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Server UP!');
});
app.use('/api/book', book_routes_1.default);
app.use((req, res) => {
    res.status(404).send("Page not found 404");
});
app.listen(PORT, () => {
    console.log(`App is running and Listening on port ${PORT}`);
});
