document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.getElementById('prev-chapter');
    const nextButton = document.getElementById('next-chapter');
    const prevButtonBottom = document.getElementById('prev-chapter-bottom');
    const nextButtonBottom = document.getElementById('next-chapter-bottom');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const body = document.body;
    const header = document.getElementById('header');
    const imagesContainer = document.getElementById('images-container');

    const maxImages = 15; // Número máximo de imágenes a cargar

    // Función para mostrar el GIF de carga
    function showLoadingGif() {
        const loadingGif = document.createElement('img');
        loadingGif.src = '../../../recursos/loading.gif'; // Cambia la ruta al GIF de carga
        loadingGif.classList.add('loading-gif');
        imagesContainer.appendChild(loadingGif);
        return loadingGif;
    }

    // Cargar imágenes automáticamente
    let imageIndex = 1;

    function loadImage() {
        if (imageIndex > maxImages) return;

        const imagePath = `img/image${imageIndex}.jpg`;
        const img = new Image();
        img.src = imagePath;
        const loadingGif = showLoadingGif();
        img.onload = () => {
            imagesContainer.removeChild(loadingGif);
            imagesContainer.appendChild(img);
            imageIndex++;
            loadImage();
        };
        img.onerror = () => {
            imagesContainer.removeChild(loadingGif);
        };
    }

    loadImage();

    prevButton.addEventListener('click', () => {
        window.location.href = '../index.html'; // Cambiar según la ruta del capítulo anterior
    });

    prevButtonBottom.addEventListener('click', () => {
        window.location.href = '../index.html'; // Cambiar según la ruta del capítulo anterior
    });

    nextButton.addEventListener('click', () => {
        window.location.href = '../2/index.html'; // Cambiar según la ruta del siguiente capítulo
    });

    nextButtonBottom.addEventListener('click', () => {
        window.location.href = '../2/index.html'; // Cambiar según la ruta del siguiente capítulo
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
