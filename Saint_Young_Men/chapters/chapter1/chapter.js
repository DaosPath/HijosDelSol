document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById('header');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const imagesContainer = document.getElementById('images-container');
    const prevChapterButton = document.getElementById('prev-chapter');
    const nextChapterButton = document.getElementById('next-chapter');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const prevChapterButtonBottom = document.getElementById('prev-chapter-bottom');
    const nextChapterButtonBottom = document.getElementById('next-chapter-bottom');
    const pageByPageButton = document.getElementById('page-by-page-button');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const chapterSelect = document.getElementById('chapter-select');
    const pageSelect = document.getElementById('page-select');

    let isDarkTheme = false;
    let isPageByPage = false;
    let currentPage = 1;
    const totalPages = 11;

    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        isDarkTheme = !isDarkTheme;
        toggleThemeButton.textContent = isDarkTheme ? 'Cambiar Tema' : 'Cambiar Tema';
    });

    function loadImages() {
        clearImages();
        const maxPagesToLoad = isPageByPage ? 1 : totalPages;
        for (let i = currentPage; i < currentPage + maxPagesToLoad && i <= totalPages; i++) {
            const img = document.createElement('img');
            img.src = `img/image${i}.webp`;
            imagesContainer.appendChild(img);
        }
    }

    function clearImages() {
        while (imagesContainer.firstChild) {
            imagesContainer.removeChild(imagesContainer.firstChild);
        }
    }

    function updateNavigationButtons() {
        prevPageButton.style.display = currentPage === 1 ? 'none' : 'inline-block';
        nextPageButton.style.display = currentPage >= totalPages ? 'none' : 'inline-block';
    }

    pageByPageButton.addEventListener('click', () => {
        isPageByPage = !isPageByPage;
        pageByPageButton.textContent = isPageByPage ? 'Cascada' : 'Por Página';
        currentPage = 1;
        clearImages();
        loadImages();
        updateNavigationButtons();
    });

    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    prevChapterButton.addEventListener('click', () => {
        window.location.href = '../chapter0/index.html';
    });

    nextChapterButton.addEventListener('click', () => {
        window.location.href = '../chapter2/index.html';
    });

    prevChapterButtonBottom.addEventListener('click', () => {
        window.location.href = '../chapter0/index.html';
    });

    nextChapterButtonBottom.addEventListener('click', () => {
        window.location.href = '../chapter2/index.html';
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            clearImages();
            loadImages();
            updateNavigationButtons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            clearImages();
            loadImages();
            updateNavigationButtons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    chapterSelect.addEventListener('change', (event) => {
        const selectedChapter = event.target.value;
        window.location.href = `../chapter${selectedChapter}/index.html`;
    });

    function fillPageSelect() {
        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            pageSelect.appendChild(option);
        }
    }

    pageSelect.addEventListener('change', (event) => {
        currentPage = parseInt(event.target.value);
        clearImages();
        loadImages();
        updateNavigationButtons();
    });

    loadImages();
    fillPageSelect();
    updateNavigationButtons();
});
