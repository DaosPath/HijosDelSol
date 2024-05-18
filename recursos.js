// recursos.js
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const modalClose = document.querySelector('.close');
    const bookCards = document.querySelectorAll('.book-card');
    const bookList = document.getElementById('book-list');

    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const cover = card.getAttribute('data-cover');
            const downloadLink = card.getAttribute('data-download');

            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-description').innerText = description;
            document.getElementById('modal-cover').src = cover;
            document.getElementById('modal-download').href = downloadLink;

            modal.classList.remove('hidden');
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Handle view transition
    window.addEventListener('popstate', () => {
        if (bookList) {
            bookList.classList.remove('fade-in');
            void bookList.offsetWidth;  // Trigger reflow
            bookList.classList.add('fade-in');
        }
    });

    // Initial load animation
    if (bookList) {
        bookList.classList.add('fade-in');
    }
});
