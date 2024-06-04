document.addEventListener('DOMContentLoaded', function() {
    const chapters = [
        { title: 'Capítulo 1: El Comienzo', link: 'chapter1.html' },
        { title: 'Capítulo 2: El Despertar', link: 'chapter2.html' },
        // Añade más capítulos aquí
    ];

    const chapterList = document.getElementById('chapter-list');

    chapters.forEach(chapter => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = chapter.link;
        a.textContent = chapter.title;
        li.appendChild(a);
        chapterList.appendChild(li);
    });
});
