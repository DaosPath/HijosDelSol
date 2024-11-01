// script.js

// Función para crear estrellas basado en la calificación
function generateStars(rating) {
    const starContainer = document.createElement('span');
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.textContent = '★';
        if (i <= Math.round(rating)) {
            star.style.color = '#FFD700';
        } else {
            star.style.color = '#ccc';
        }
        starContainer.appendChild(star);
    }
    return starContainer;
}

// Función para crear elementos HTML de un libro
function createBookElement(book) {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book-item');

    // Título
    const title = document.createElement('div');
    title.classList.add('book-title');
    title.textContent = book.title;
    bookItem.appendChild(title);

    // Autor
    const author = document.createElement('div');
    author.classList.add('book-author');
    author.textContent = `Autor: ${book.author}`;
    bookItem.appendChild(author);

    // Descripción
    const description = document.createElement('div');
    description.classList.add('book-description');
    description.textContent = book.description;
    bookItem.appendChild(description);

    // Calificación Promedio
    const averageRating = document.createElement('div');
    averageRating.classList.add('average-rating');
    const stars = generateStars(book.averageRating);
    const ratingNumber = document.createElement('span');
    ratingNumber.classList.add('rating-number');
    ratingNumber.textContent = `(${book.averageRating})`;
    averageRating.appendChild(stars);
    averageRating.appendChild(ratingNumber);
    bookItem.appendChild(averageRating);

    // Evento para abrir el modal con detalles del libro
    bookItem.addEventListener('click', () => {
        openModal(book);
    });

    return bookItem;
}

// Función para mostrar libros
async function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (books.length === 0) {
        bookList.innerHTML = '<p>No se encontraron libros.</p>';
        return;
    }

    books.forEach(book => {
        const bookElement = createBookElement(book);
        bookList.appendChild(bookElement);
    });
}

// Función para obtener y mostrar libros desde el backend
async function fetchAndDisplayBooks() {
    try {
        const response = await fetch('http://localhost:3000/books');
        const books = await response.json();

        // Obtener calificación promedio para cada libro
        const booksWithAverage = await Promise.all(books.map(async (book) => {
            const avgResponse = await fetch(`http://localhost:3000/books/${book.id}/average-rating`);
            const avgData = await avgResponse.json();
            return {
                ...book,
                averageRating: avgData.averageRating
            };
        }));

        displayBooks(booksWithAverage);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
    }
}

// Función para abrir el modal con detalles del libro
async function openModal(book) {
    const modal = document.getElementById('bookModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalDescription = document.getElementById('modalDescription');
    const modalAverageRating = document.getElementById('modalAverageRating');
    const commentsContainer = document.getElementById('commentsContainer');
    const readButton = document.getElementById('readButton');
    const predominantTag = document.getElementById('predominantTag');

    // Asignar valores al modal
    modalTitle.textContent = book.title;
    modalAuthor.textContent = `Autor: ${book.author}`;
    modalDescription.textContent = book.description;
    modalAverageRating.innerHTML = ''; // Limpiar contenido previo

    const stars = generateStars(book.averageRating);
    const ratingNumber = document.createElement('span');
    ratingNumber.classList.add('rating-number');
    ratingNumber.textContent = `(${book.averageRating})`;
    modalAverageRating.appendChild(stars);
    modalAverageRating.appendChild(ratingNumber);

    // Configurar botón de 'Leer'
    readButton.onclick = () => {
        window.open(`reader.html?id=${book.id}`, '_blank');
    };

    // Obtener y calcular la etiqueta predominante
    try {
        const ratingsResponse = await fetch(`http://localhost:3000/books/${book.id}/ratings`);
        const ratingsData = await ratingsResponse.json();

        let predominant = '';
        let maxCount = 0;

        for (const [key, value] of Object.entries(ratingsData.ratings)) {
            if (value > maxCount) {
                maxCount = value;
                predominant = key.charAt(0).toUpperCase() + key.slice(1);
            }
        }

        if (predominant) {
            predominantTag.textContent = `Este libro es ${predominant}`;
            predominantTag.className = `predominant-tag ${predominant}`;
        } else {
            predominantTag.textContent = '';
        }
    } catch (error) {
        console.error('Error al obtener las calificaciones espirituales:', error);
        predominantTag.textContent = '';
    }

    // Obtener comentarios
    try {
        const commentsResponse = await fetch(`http://localhost:3000/books/${book.id}/comments`);
        const commentsData = await commentsResponse.json();
        commentsContainer.innerHTML = '';

        if (commentsData.comments.length === 0) {
            commentsContainer.innerHTML = '<p>No hay comentarios aún.</p>';
        } else {
            commentsData.comments.forEach(commentObj => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('comment-name');
                nameDiv.textContent = commentObj.name;
                commentDiv.appendChild(nameDiv);

                const timestamp = document.createElement('div');
                timestamp.classList.add('comment-timestamp');
                const date = new Date(commentObj.timestamp);
                timestamp.textContent = date.toLocaleString();
                commentDiv.appendChild(timestamp);

                const commentText = document.createElement('div');
                commentText.textContent = commentObj.comment;
                commentDiv.appendChild(commentText);

                // Botón de responder solo si no es una respuesta
                if (!commentObj.replyTo) {
                    const replyButton = document.createElement('button');
                    replyButton.classList.add('reply-button');
                    replyButton.textContent = 'Responder';
                    replyButton.onclick = () => openReplyModal(commentObj, book.id);
                    commentDiv.appendChild(replyButton);
                }

                // Mostrar respuestas si existen
                if (commentObj.replies && commentObj.replies.length > 0) {
                    const repliesDiv = document.createElement('div');
                    repliesDiv.classList.add('comment-replies');

                    commentObj.replies.forEach(reply => {
                        const replyDiv = document.createElement('div');
                        replyDiv.classList.add('comment');

                        const replyNameDiv = document.createElement('div');
                        replyNameDiv.classList.add('comment-name');
                        replyNameDiv.textContent = reply.name;
                        replyDiv.appendChild(replyNameDiv);

                        const replyTimestamp = document.createElement('div');
                        replyTimestamp.classList.add('comment-timestamp');
                        const replyDate = new Date(reply.timestamp);
                        replyTimestamp.textContent = replyDate.toLocaleString();
                        replyDiv.appendChild(replyTimestamp);

                        const replyText = document.createElement('div');
                        replyText.textContent = reply.comment;
                        replyDiv.appendChild(replyText);

                        repliesDiv.appendChild(replyDiv);
                    });

                    commentDiv.appendChild(repliesDiv);
                }

                commentsContainer.appendChild(commentDiv);
            });
        }
    } catch (error) {
        console.error('Error al obtener los comentarios:', error);
        commentsContainer.innerHTML = '<p>Error al cargar comentarios.</p>';
    }

    // Mostrar el modal
    modal.style.display = 'block';

    // Configurar eventos para botones de calificación espiritual
    const spiritualButtons = document.querySelectorAll('.spiritual-buttons button');
    spiritualButtons.forEach(button => {
        button.onclick = async (e) => {
            e.stopPropagation();
            const spiritualRating = button.getAttribute('data-rating');
            if (!spiritualRating) return;

            try {
                const response = await fetch(`http://localhost:3000/books/${book.id}/rate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rating: spiritualRating })
                });

                const result = await response.json();

                if (response.ok) {
                    alert(result.message);
                    // Actualizar el modal
                    openModal(book);
                    // Actualizar la lista principal
                    fetchAndDisplayBooks();
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error al enviar la calificación espiritual:', error);
            }
        };
    });
}

// Función para abrir el modal de respuesta
function openReplyModal(comment, bookId) {
    const replyModal = document.getElementById('replyModal');
    const replyToName = document.getElementById('replyToName');
    const replyTextarea = document.getElementById('replyTextarea');
    const replyNameInput = document.getElementById('replyName');

    replyToName.textContent = comment.name;
    replyTextarea.value = ''; // Dejar el campo vacío

    // Almacenar el ID del comentario al que se está respondiendo y el ID del libro
    replyModal.setAttribute('data-parent-id', comment.id);
    replyModal.setAttribute('data-book-id', bookId);

    replyModal.style.display = 'block';
}

// Función para cerrar cualquier modal
function closeModal(modal) {
    modal.style.display = 'none';
}

// Eventos para cerrar los modales
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = () => {
        const modal = closeBtn.parentElement.parentElement;
        closeModal(modal);
    };
});

// Evento para cerrar los modales al hacer clic fuera del contenido
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            closeModal(modal);
        }
    });
}

// Función de búsqueda
async function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const bookList = document.getElementById('bookList');
    const books = bookList.getElementsByClassName('book-item');

    for (let bookItem of books) {
        const title = bookItem.querySelector('.book-title').textContent.toLowerCase();
        const author = bookItem.querySelector('.book-author').textContent.toLowerCase();
        const description = bookItem.querySelector('.book-description').textContent.toLowerCase();

        if (title.includes(query) || author.includes(query) || description.includes(query)) {
            bookItem.style.display = 'flex';
        } else {
            bookItem.style.display = 'none';
        }
    }
}

// Evento de entrada en el buscador
document.getElementById('searchInput').addEventListener('input', searchBooks);

// Mostrar todos los libros al cargar la página
window.onload = () => {
    fetchAndDisplayBooks();

    // Configurar botones para abrir modales de Calificar y Comentar
    const openRatingModalBtn = document.getElementById('openRatingModal');
    const openCommentModalBtn = document.getElementById('openCommentModal');

    openRatingModalBtn.onclick = () => {
        const ratingModal = document.getElementById('ratingModal');
        ratingModal.style.display = 'block';
    };

    openCommentModalBtn.onclick = () => {
        const commentModal = document.getElementById('commentModal');
        commentModal.style.display = 'block';
    };
};

// Función para manejar la calificación numérica
document.getElementById('submitStarRating').onclick = async (e) => {
    e.stopPropagation();
    const starRating = document.querySelector('.star-rating input[name="rating"]:checked');
    if (!starRating) {
        alert('Por favor, selecciona una calificación numérica.');
        return;
    }

    const numericRating = parseInt(starRating.value);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        alert('Calificación numérica inválida.');
        return;
    }

    // Obtener el libro actual desde el modal principal
    const modal = document.getElementById('bookModal');
    const title = document.getElementById('modalTitle').textContent;
    // Aquí se asume que el título es único para identificar el libro
    // En una implementación real, sería mejor usar un ID
    try {
        const booksResponse = await fetch('http://localhost:3000/books');
        const books = await booksResponse.json();
        const book = books.find(b => b.title === title);
        if (!book) {
            alert('Libro no encontrado.');
            return;
        }

        const response = await fetch(`http://localhost:3000/books/${book.id}/numeric-rate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: numericRating })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            // Limpiar selección de estrellas
            document.querySelectorAll('.star-rating input[name="rating"]').forEach(input => input.checked = false);
            // Cerrar rating modal
            const ratingModal = document.getElementById('ratingModal');
            closeModal(ratingModal);
            // Actualizar el modal principal
            openModal(book);
            // Actualizar la lista principal
            fetchAndDisplayBooks();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error al enviar la calificación numérica:', error);
    }
};

// Función para manejar el envío de comentarios
document.getElementById('submitComment').onclick = async (e) => {
    e.stopPropagation();
    const comment = document.getElementById('commentTextarea').value.trim();
    const name = document.getElementById('commentName').value.trim();
    if (!comment || !name) {
        alert('Por favor, ingresa tu nombre y comentario.');
        return;
    }

    // Obtener el libro actual desde el modal principal
    const modal = document.getElementById('bookModal');
    const title = document.getElementById('modalTitle').textContent;
    // Aquí se asume que el título es único para identificar el libro
    // En una implementación real, sería mejor usar un ID
    try {
        const booksResponse = await fetch('http://localhost:3000/books');
        const books = await booksResponse.json();
        const book = books.find(b => b.title === title);
        if (!book) {
            alert('Libro no encontrado.');
            return;
        }

        const response = await fetch(`http://localhost:3000/books/${book.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, comment })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            // Limpiar el textarea y el nombre
            document.getElementById('commentTextarea').value = '';
            document.getElementById('commentName').value = '';
            // Cerrar comment modal
            const commentModal = document.getElementById('commentModal');
            closeModal(commentModal);
            // Actualizar el modal principal
            openModal(book);
            // Actualizar la lista principal
            fetchAndDisplayBooks();
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error al enviar el comentario:', error);
    }
};

// Función para manejar el envío de respuestas
document.getElementById('submitReply').onclick = async (e) => {
    e.stopPropagation();
    const replyComment = document.getElementById('replyTextarea').value.trim();
    const name = document.getElementById('replyName').value.trim();
    if (!replyComment || !name) {
        alert('Por favor, ingresa tu nombre y respuesta.');
        return;
    }

    // Obtener el ID del comentario padre y el ID del libro desde el modal de respuesta
    const replyModal = document.getElementById('replyModal');
    const parentId = replyModal.getAttribute('data-parent-id');
    const bookId = replyModal.getAttribute('data-book-id');
    if (!parentId || !bookId) {
        alert('No se pudo determinar el comentario o el libro al que estás respondiendo.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/books/${bookId}/comments/${parentId}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, comment: replyComment }) // Sin añadir '@' automáticamente
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            // Limpiar el textarea y el nombre
            document.getElementById('replyTextarea').value = '';
            document.getElementById('replyName').value = '';
            // Cerrar reply modal
            closeModal(replyModal);
            // Actualizar el modal principal
            // Obtener el libro actualizado para refrescar los comentarios
            const booksResponse = await fetch('http://localhost:3000/books');
            const books = await booksResponse.json();
            const book = books.find(b => b.id === bookId);
            if (book) {
                openModal(book);
                // Actualizar la lista principal
                fetchAndDisplayBooks();
            }
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error al enviar la respuesta:', error);
    }
}
