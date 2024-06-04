document.addEventListener('DOMContentLoaded', () => {
    generateChapters();
    applyFollowStatus();
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

function followComic() {
    addBookmark();
    showPopup();
    applyFollowStatus();
}

function addBookmark() {
    const title = document.title;
    const url = window.location.href;
    if (window.sidebar && window.sidebar.addPanel) { // Firefox <=22
        window.sidebar.addPanel(title, url, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorites
        window.external.AddFavorite(url, title);
    } else if (window.opera && window.print) { // Opera <=12
        this.title = title;
        return true;
    } else { // webkit - safari/chrome
        alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
    }
}

function showPopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000);
}

function applyFollowStatus() {
    const isFollowing = localStorage.getItem('following');
    const followButton = document.querySelector('.follow-button');
    if (isFollowing) {
        followButton.textContent = 'Siguiendo';
        followButton.disabled = true;
    } else {
        followButton.addEventListener('click', () => {
            localStorage.setItem('following', 'true');
            followButton.textContent = 'Siguiendo';
            followButton.disabled = true;
        });
    }
}

function likeComic() {
    const likesCount = document.getElementById('likesCount');
    let currentLikes = parseInt(localStorage.getItem('likes') || '0');
    currentLikes++;
    localStorage.setItem('likes', currentLikes);
    likesCount.textContent = currentLikes;
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

function generateChapters() {
    const chapterList = document.getElementById('chapterList');
    for (let i = 1; i <= 10; i++) {
        let chapterItem = document.createElement('li');
        chapterItem.innerHTML = `<a href="chapters/chapter${i}/index.html">Capítulo ${i}: Título del capítulo</a>`;
        chapterList.appendChild(chapterItem);
    }
}
