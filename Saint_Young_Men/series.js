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
    const filter = input.value.toLowerCase();
    const chapterList = document.getElementById('chapterList');
    const chapters = chapterList.getElementsByTagName('li');

    for (let i = 0; i < chapters.length; i++) {
        let chapter = chapters[i];
        let textValue = chapter.textContent || chapter.innerText;
        if (textValue.toLowerCase().indexOf(filter) > -1) {
            chapter.style.display = "";
        } else {
            chapter.style.display = "none";
        }
    }
}

function openComments() {
    const commentsPopup = document.getElementById('commentsPopup');
    commentsPopup.classList.add('show');
    if (!window.disqusLoaded) {
        window.disqusLoaded = true;
        var d = document, s = d.createElement('script');
        s.src = 'https://hijosdelsol.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    }
}

function closeComments() {
    const commentsPopup = document.getElementById('commentsPopup');
    commentsPopup.classList.remove('show');
}

// Add event listeners to the chapter list items
document.querySelectorAll('.chapter-list ul li').forEach(item => {
    item.addEventListener('click', () => {
        window.location.href = item.querySelector('a').href;
    });
});
