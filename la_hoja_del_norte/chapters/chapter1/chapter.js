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

    const maxImages = 24; // Número máximo de imágenes a cargar

    // Cargar imágenes automáticamente
    let imageIndex = 1;

    function loadImage() {
        if (imageIndex > maxImages) return;

        const imagePath = `img/image${imageIndex}.jpg`;
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            imagesContainer.appendChild(img);
            imageIndex++;
            loadImage();
        };
        img.onerror = () => {
            console.log(`No se pudo cargar la imagen: ${imagePath}`);
        };
    }

    loadImage();

    prevButton.addEventListener('click', () => {
        window.location.href = '../chapter0/index.html'; // Cambiar según la ruta del capítulo anterior
    });

    nextButton.addEventListener('click', () => {
        window.location.href = '../chapter2/index.html'; // Cambiar según la ruta del siguiente capítulo
    });

    prevButtonBottom.addEventListener('click', () => {
        window.location.href = '../chapter0/index.html'; // Cambiar según la ruta del capítulo anterior
    });

    nextButtonBottom.addEventListener('click', () => {
        window.location.href = '../chapter2/index.html'; // Cambiar según la ruta del siguiente capítulo
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
