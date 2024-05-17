document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('mousemove', (event) => {
        const boxRect = box.getBoundingClientRect();
        const mouseX = event.clientX - boxRect.left;
        const mouseY = event.clientY - boxRect.top;
        const rotateY = (mouseX / boxRect.width - 0.5) * 5; 
        const rotateX = (mouseY / boxRect.height - 0.5) * -5; 
        box.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`; 
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)'; 
    });
});

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

if (isMobileDevice()) {
    document.body.classList.add('mobile');
}
