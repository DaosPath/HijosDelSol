window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const book = urlParams.get('book');
    if (book) {
        const iframe = document.getElementById('lectura-iframe');
        iframe.src = `pdf/${book}`; // Ajustar la ruta a tus archivos PDF
    }
});
