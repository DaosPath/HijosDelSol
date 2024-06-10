document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    incrementViews();
});

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

function applyTheme() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function incrementViews() {
    const viewsCount = document.getElementById('viewsCount');
    let currentViews = parseInt(localStorage.getItem('views') || '0');
    currentViews++;
    localStorage.setItem('views', currentViews);
    viewsCount.textContent = currentViews;
}

function searchChapters() {
    const input = document.getElementById('searchInput');
    const filter = normalizeText(input.value.toLowerCase());
    const chapterList = document.getElementById('chapterList');
    const chapters = chapterList.getElementsByTagName('li');

    for (let i = 0; i < chapters.length; i++) {
        let chapter = chapters[i];
        let textValue = normalizeText(chapter.textContent || chapter.innerText);
        if (textValue.toLowerCase().indexOf(filter) > -1) {
            chapter.style.display = "";
        } else {
            chapter.style.display = "none";
        }
    }
}

function normalizeText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function toggleComments() {
    const chapterListContainer = document.getElementById('chapterListContainer');
    const commentsContainer = document.getElementById('commentsContainer');
    const commentsButton = document.querySelector('.comments-button');
    const isCommentsVisible = commentsContainer.classList.contains('show');
    
    if (isCommentsVisible) {
        commentsContainer.classList.remove('show');
        chapterListContainer.classList.add('show');
        commentsButton.textContent = 'Comentarios';
    } else {
        commentsContainer.classList.add('show');
        chapterListContainer.classList.remove('show');
        commentsButton.textContent = 'Capítulos';
        
        if (!window.disqusLoaded) {
            window.disqusLoaded = true;
            var d = document, s = d.createElement('script');
            s.src = 'https://hijosdelsol.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        }
    }
}

document.querySelectorAll('.chapter-list ul li').forEach(item => {
    item.addEventListener('click', () => {
        window.location.href = item.querySelector('a').href;
    });
});
