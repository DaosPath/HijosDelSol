document.addEventListener('DOMContentLoaded', () => {
    const followButton = document.querySelector('.follow-button');
    const firstChapterButton = document.querySelector('.first-chapter-button');
    const chapterList = document.getElementById('chapter-list');

    followButton.addEventListener('click', () => {
        alert('Has seguido la serie.');
    });

    firstChapterButton.addEventListener('click', () => {
        window.location.href = 'chapters/chapter1.html';
    });

    // Agregar capítulos
    for (let i = 3; i <= 100; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="chapters/chapter${i}.html">Capítulo ${i}: Título del capítulo</a>`;
        chapterList.appendChild(li);
    }
});
