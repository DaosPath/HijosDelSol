// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Inicializar la aplicación de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta al archivo JSON que almacenará los libros
const dataFilePath = path.join(__dirname, 'books.json');

// Servir archivos estáticos, incluyendo PDFs y páginas HTML
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use(express.static(path.join(__dirname, 'public')));

// Función para leer los libros desde el archivo JSON
function readBooks() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo el archivo de libros:', error);
        return [];
    }
}

// Función para escribir los libros al archivo JSON
function writeBooks(books) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(books, null, 2), 'utf8');
    } catch (error) {
        console.error('Error escribiendo en el archivo de libros:', error);
    }
}

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor de Hijos del Sol funcionando');
});

// Ruta para obtener la lista de libros
app.get('/books', (req, res) => {
    const books = readBooks();
    res.json(books);
});

// Ruta para obtener detalles de un libro específico
app.get('/books/:id', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.json(book);
});

// Ruta para calificar un libro con clasificación espiritual
app.post('/books/:id/rate', (req, res) => {
    console.log('Cuerpo de la solicitud:', req.body); // Registro para depuración

    const { rating } = req.body; // Espera una propiedad 'rating' en el cuerpo de la solicitud
    const validRatings = ['Elevado', 'Transformador', 'Inspirador'];

    // Verificar que rating esté definido y sea válido
    if (!rating) {
        return res.status(400).json({ message: 'Clasificación no proporcionada' });
    }

    const formattedRating = rating.charAt(0).toUpperCase() + rating.slice(1).toLowerCase();

    if (!validRatings.includes(formattedRating)) {
        return res.status(400).json({ message: 'Clasificación inválida' });
    }

    // Leer y actualizar el libro
    const books = readBooks();
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex !== -1) {
        // Incrementar la cuenta de la clasificación seleccionada en minúsculas
        const ratingKey = formattedRating.toLowerCase();
        if (books[bookIndex].ratings.hasOwnProperty(ratingKey)) {
            books[bookIndex].ratings[ratingKey] += 1;
        } else {
            // Si la clasificación no existe en el libro, manejar el error
            return res.status(400).json({ message: 'Clasificación no válida para este libro' });
        }

        // Guardar los cambios en books.json
        writeBooks(books);

        res.json({ message: 'Clasificación agregada exitosamente', book: books[bookIndex] });
    } else {
        res.status(404).json({ message: 'Libro no encontrado' });
    }
});

// Ruta para obtener las calificaciones espirituales de un libro
app.get('/books/:id/ratings', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.json({ ratings: book.ratings });
});

// Ruta para calificar un libro con calificación numérica
app.post('/books/:id/numeric-rate', (req, res) => {
    const { rating } = req.body; // Espera una propiedad 'rating' en el cuerpo de la solicitud

    // Validar que rating es un número entre 1 y 5
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Calificación numérica inválida. Debe ser un número entre 1 y 5.' });
    }

    // Leer y actualizar el libro
    const books = readBooks();
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex !== -1) {
        // Agregar la calificación numérica
        books[bookIndex].numericRatings.push(rating);

        // Guardar los cambios en books.json
        writeBooks(books);

        res.json({ message: 'Calificación numérica agregada exitosamente', book: books[bookIndex] });
    } else {
        res.status(404).json({ message: 'Libro no encontrado' });
    }
});

// Ruta para obtener la calificación promedio de un libro
app.get('/books/:id/average-rating', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    const totalRatings = book.numericRatings.length;
    const sumRatings = book.numericRatings.reduce((acc, curr) => acc + curr, 0);
    const averageRating = totalRatings > 0 ? (sumRatings / totalRatings).toFixed(2) : 'No hay calificaciones';

    res.json({
        id: book.id,
        title: book.title,
        averageRating: averageRating
    });
});

// Ruta para agregar un comentario a un libro
app.post('/books/:id/comments', (req, res) => {
    const { name, comment } = req.body;
    if (!comment || !name) {
        return res.status(400).json({ message: 'Nombre y comentario no proporcionados' });
    }

    const books = readBooks();
    const bookIndex = books.findIndex(b => b.id === req.params.id);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    const timestamp = new Date().toISOString();
    const newComment = {
        id: `c${Date.now()}`, // Generar un ID único basado en el timestamp
        name,
        comment,
        timestamp,
        replyTo: null,
        replies: []
    };
    books[bookIndex].comments.push(newComment);

    // Guardar los cambios en books.json
    writeBooks(books);

    res.json({ message: 'Comentario agregado exitosamente', book: books[bookIndex] });
});

// Ruta para obtener los comentarios de un libro
app.get('/books/:id/comments', (req, res) => {
    const books = readBooks();
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.json({
        id: book.id,
        title: book.title,
        comments: book.comments
    });
});

// Ruta para agregar una respuesta a un comentario
app.post('/books/:id/comments/:commentId/reply', (req, res) => {
    const { name, comment } = req.body;
    const { id, commentId } = req.params;

    if (!comment || !name) {
        return res.status(400).json({ message: 'Nombre y respuesta no proporcionados' });
    }

    const books = readBooks();
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    const parentComment = books[bookIndex].comments.find(c => c.id === commentId);

    if (!parentComment) {
        return res.status(404).json({ message: 'Comentario padre no encontrado' });
    }

    // Verificar que el comentario padre no sea una respuesta (solo permitir una respuesta por comentario principal)
    if (parentComment.replyTo !== null) {
        return res.status(400).json({ message: 'No se puede responder a una respuesta.' });
    }

    const timestamp = new Date().toISOString();
    const newReply = {
        id: `c${Date.now()}-r`, // Generar un ID único para la respuesta
        name,
        comment, // Sin añadir '@nombre' automáticamente
        timestamp,
        replyTo: commentId
    };

    parentComment.replies.push(newReply);

    // Guardar los cambios en books.json
    writeBooks(books);

    res.json({ message: 'Respuesta agregada exitosamente', reply: newReply });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
