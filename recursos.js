document.getElementById('search-input').addEventListener('input', filterBooks);

function filterBooks() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const books = document.querySelectorAll('.book-card');

    books.forEach(book => {
        const title = book.getAttribute('data-title').toLowerCase();
        const genre = book.getAttribute('data-genre').toLowerCase();

        if (title.includes(searchInput) || genre.includes(searchInput)) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}

// Modal functionality
const modal = document.getElementById('myModal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalDownload = document.getElementById('modal-download');
const modalCover = document.getElementById('modal-cover');
const span = document.getElementsByClassName('close')[0];

document.querySelectorAll('.book-card').forEach(book => {
    book.addEventListener('click', () => {
        modalTitle.textContent = book.getAttribute('data-title');
        modalDescription.textContent = book.getAttribute('data-description');
        modalDownload.href = book.getAttribute('data-download');
        modalCover.src = book.getAttribute('data-cover');
        modal.style.display = 'flex';
        modal.classList.remove('hidden');
    });
});

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Fade-in effect
document.body.classList.add('fade-in');
