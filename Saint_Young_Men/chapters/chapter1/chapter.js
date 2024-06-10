document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById('header');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const imagesContainer = document.getElementById('images-container');
    const prevChapterButton = document.getElementById('prev-chapter');
    const nextChapterButton = document.getElementById('next-chapter');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const chapterSelect = document.getElementById('chapter-select');
    const pageSelect = document.getElementById('page-select');

    let isDarkTheme = false;
    let currentPage = 1;
    const totalPages = 11; // Puedes cambiar esto según sea necesario
    const isPageByPage = true; // Cambia esto a `false` si quieres usar el modo cascada

    // Cambiar tema
    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        isDarkTheme = !isDarkTheme;
        toggleThemeButton.textContent = 'Cambiar Tema';
    });

    // Cargar imágenes
    function loadImages() {
        clearImages();
        const maxPagesToLoad = isPageByPage ? 1 : totalPages;
        for (let i = currentPage; i < currentPage + maxPagesToLoad && i <= totalPages; i++) {
            const img = document.createElement('img');
            img.src = `img/image${i}.webp`;
            imagesContainer.appendChild(img);
        }
    }

    // Limpiar imágenes
    function clearImages() {
        while (imagesContainer.firstChild) {
            imagesContainer.removeChild(imagesContainer.firstChild);
        }
    }

    // Actualizar botones de navegación
    function updateNavigationButtons() {
        prevPageButton.style.display = currentPage === 1 ? 'none' : 'inline-block';
        nextPageButton.style.display = currentPage >= totalPages ? 'none' : 'inline-block';
        pageSelect.value = currentPage;
    }

    // Pantalla completa
    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Navegación entre capítulos
    prevChapterButton.addEventListener('click', () => {
        window.location.href = '../chapter0/index.html';
    });

    nextChapterButton.addEventListener('click', () => {
        window.location.href = '../chapter2/index.html';
    });

    // Navegación entre páginas
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            clearImages();
            loadImages();
            updateNavigationButtons();
        }
        scrollToTop();
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            clearImages();
            loadImages();
            updateNavigationButtons();
        }
        scrollToTop();
    });

    // Desplazarse hacia arriba
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Rellenar selector de páginas
    function populatePageSelect() {
        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            pageSelect.appendChild(option);
        }
    }

    // Cambiar de página desde el selector
    pageSelect.addEventListener('change', (event) => {
        currentPage = parseInt(event.target.value, 10);
        clearImages();
        loadImages();
        updateNavigationButtons();
        scrollToTop();
    });

    // Cambiar de capítulo desde el selector
    chapterSelect.addEventListener('change', (event) => {
        const selectedChapter = event.target.value;
        window.location.href = `../chapter${selectedChapter}/index.html`;
    });

    // Navegación con teclas
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            prevPageButton.click();
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            nextPageButton.click();
        }
    });

    // Navegación táctil
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    imagesContainer.addEventListener('click', handleImageClick);

    let xDown = null;

    function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        xDown = firstTouch.clientX;
    }

    function handleTouchMove(evt) {
        if (!xDown) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let xDiff = xDown - xUp;

        if (xDiff > 0) {
            // Izquierda
            nextPageButton.click();
        } else {
            // Derecha
            prevPageButton.click();
        }
        xDown = null;
    }

    // Navegación al hacer clic en las imágenes
    function handleImageClick(event) {
        const clickX = event.clientX;
        const screenWidth = window.innerWidth;

        if (clickX < screenWidth / 2) {
            prevPageButton.click();
        } else {
            nextPageButton.click();
        }
    }

    populatePageSelect();
    loadImages();
    updateNavigationButtons();
});
