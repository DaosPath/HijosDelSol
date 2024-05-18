document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const modalClose = document.querySelector('.close');
    const bookCards = document.querySelectorAll('.book-card');
    const modalCover = document.getElementById('modal-cover');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalDownload = document.getElementById('modal-download');
    const bookList = document.getElementById('book-list');

    // Ensure the modal opens with the correct content
    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const cover = card.getAttribute('data-cover');
            const downloadLink = card.getAttribute('data-download');

            modalTitle.innerText = title;
            modalDescription.innerText = description;
            modalCover.src = cover;
            modalDownload.href = downloadLink;

            modal.classList.remove('hidden');
        });
    });

    // Ensure the modal closes correctly
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
