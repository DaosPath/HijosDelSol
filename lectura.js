window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const book = urlParams.get('book');
    if (book) {
        const iframe = document.getElementById('lectura-iframe');
        iframe.src = `pdf/${book}`;
    }

    const fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn.addEventListener('click', () => {
        const iframe = document.getElementById('lectura-iframe');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) { /* Firefox */
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { /* IE/Edge */
            iframe.msRequestFullscreen();
        }
    });
});
