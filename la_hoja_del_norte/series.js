document.addEventListener('DOMContentLoaded', () => {
    const followButton = document.querySelector('.follow-button');
    const firstChapterButton = document.querySelector('.first-chapter-button');
    const chapterList = document.getElementById('chapter-list');

    // Manejador de evento para el botón de seguir
    followButton.addEventListener('click', () => {
        alert('Has seguido la serie.');
    });

    // Manejador de evento para el botón del primer capítulo
    firstChapterButton.addEventListener('click', () => {
        window.location.href = 'chapters/chapter1.html';
    });

    // Función para agregar capítulos
    const addChapters = (start, end) => {
        for (let i = start; i <= end; i++) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="chapters/chapter${i}.html">Capítulo ${i}: Título del capítulo</a>`;
            chapterList.appendChild(li);
        }
    };

    // Agregar capítulos del 1 al 100
    addChapters(3, 100);

    // Manejador de eventos para la búsqueda de capítulos
    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Buscar capítulo...');
    searchInput.classList.add('search-input');
    chapterList.parentNode.insertBefore(searchInput, chapterList);

    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const chapters = chapterList.getElementsByTagName('li');

        for (let i = 0; i < chapters.length; i++) {
            const a = chapters[i].getElementsByTagName('a')[0];
            const txtValue = a.textContent || a.innerText;

            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                chapters[i].style.display = "";
            } else {
                chapters[i].style.display = "none";
            }
        }
    });

    // Función para cambiar el tema
    const toggleThemeButton = document.createElement('button');
    toggleThemeButton.textContent = 'Cambiar tema';
    toggleThemeButton.classList.add('toggle-theme-button');
    document.body.insertBefore(toggleThemeButton, document.body.firstChild);

    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });

    // Establecer el tema oscuro si está almacenado en el localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }

    document.body.addEventListener('classlistchange', () => {
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
});
