document.addEventListener('DOMContentLoaded', () => {
    const followButton = document.querySelector('.follow-button');
    const firstChapterButton = document.querySelector('.first-chapter-button');

    followButton.addEventListener('click', () => {
        alert('Has seguido la serie.');
    });

    firstChapterButton.addEventListener('click', () => {
        window.location.href = 'chapters/chapter1/';
    });
});
