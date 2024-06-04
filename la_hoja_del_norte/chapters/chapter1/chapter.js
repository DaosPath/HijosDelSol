document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.getElementById('prev-chapter');
    const nextButton = document.getElementById('next-chapter');
    const prevButtonBottom = document.getElementById('prev-chapter-bottom');
    const nextButtonBottom = document.getElementById('next-chapter-bottom');
    const pageSeriesButton = document.getElementById('page-series');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const body = document.body;
    const header = document.getElementById('header');
    const imagesContainer = document.getElementById('images-container');

    const isFirstChapter = true; // Cambiar a true si es el primer capítulo
    const isLastChapter = false; // Cambiar a true si es el último capítulo

    // Cargar imágenes automáticamente
    let imageIndex = 1;
    let imagesLoaded = false;
    while (!imagesLoaded) {
        const imagePath = `img/image${imageIndex}.jpg`;
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            imagesContainer.appendChild(img);
        };
        img.onerror = () => {
            imagesLoaded = true;
        };
        imageIndex++;
    }

    if (isFirstChapter) {
        prevButton.innerText = 'Página de Serie';
        prevButtonBottom.innerText = 'Página de Serie';
        prevButton.addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
        prevButtonBottom.addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
    } else {
        prevButton.addEventListener('click', () => {
            window.location.href = '../chapter1/index.html'; // Cambiar según la ruta del capítulo anterior
        });
        prevButtonBottom.addEventListener('click', () => {
            window.location.href = '../chapter1/index.html'; // Cambiar según la ruta del capítulo anterior
        });
    }

    if (isLastChapter) {
        nextButton.innerText = 'Página de Serie';
        nextButtonBottom.innerText = 'Página de Serie';
        nextButton.addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
        nextButtonBottom.addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
    } else {
        nextButton.addEventListener('click', () => {
            window.location.href = '../chapter2/index.html'; // Cambiar según la ruta del siguiente capítulo
        });
        nextButtonBottom.addEventListener('click', () => {
            window.location.href = '../chapter2/index.html'; // Cambiar según la ruta del siguiente capítulo
        });
    }

    pageSeriesButton.addEventListener('click', () => {
        window.location.href = '../../index.html';
    });

    toggleThemeButton.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
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

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            header.style.top = '-70px';
        } else {
            header.style.top = '0';
        }
        lastScrollTop = st <= 0 ? 0 : st;
    });
});
