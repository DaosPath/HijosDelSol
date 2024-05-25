window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const book = urlParams.get('book');
    if (book) {
        const iframe = document.getElementById('prelectura-iframe');
        iframe.src = `prelectura/${book}.pdf`; // Ajustar la ruta a tus archivos PDF
    }
});
