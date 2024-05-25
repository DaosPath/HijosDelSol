window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const book = urlParams.get('book');
    if (book) {
        const iframe = document.getElementById('lectura-iframe');
        iframe.src = `pdf/${book}`;
    }
});

let currentPage = 1;
const iframe = document.getElementById('lectura-iframe');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
});

nextPageButton.addEventListener('click', () => {
    currentPage++;
    updatePage();
});

function updatePage() {
    const iframe = document.getElementById('lectura-iframe');
    iframe.src = `${iframe.src.split('#')[0]}#page=${currentPage}`;
}
