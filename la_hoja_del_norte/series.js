document.addEventListener('DOMContentLoaded', () => {
    generateChapters();
    applyFollowStatus();
    applyTheme();
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
    localStorage.setItem('following', 'true');
    applyFollowStatus();
}

function applyFollowStatus() {
    const isFollowing = localStorage.getItem('following');
    const followButton = document.querySelector('.follow-button');
    if (isFollowing) {
        followButton.textContent = 'Siguiendo';
        followButton.disabled = true;
    }
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
    for (let i = 1; i <= 100; i++) {
        let chapterItem = document.createElement('li');
        chapterItem.innerHTML = `<a href="chapters/chapter${i}/">Capítulo ${i}: Título del capítulo</a>`;
        chapterList.appendChild(chapterItem);
    }
}
