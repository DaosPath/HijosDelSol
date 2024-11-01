// reader.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    if (!bookId) {
        alert('No se ha especificado el libro a leer.');
        window.location.href = 'index.html';
        return;
    }

    // Fetch the book details to get the PDF URL
    fetch(`http://localhost:3000/books/${bookId}`)
        .then(response => response.json())
        .then(book => {
            if (book.pdfUrl) {
                document.getElementById('pdfViewer').src = book.pdfUrl;
            } else {
                alert('URL del PDF no disponible para este libro.');
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error al obtener los detalles del libro:', error);
            alert('Error al cargar el libro.');
            window.location.href = 'index.html';
        });

    // Fullscreen button functionality
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const pdfViewer = document.getElementById('pdfViewer');

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            pdfViewer.requestFullscreen().catch(err => {
                alert(`Error intentando poner en pantalla completa: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    });
});
