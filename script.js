document.addEventListener("DOMContentLoaded", function() {
    const contentDiv = document.getElementById('content');
    const recursosLink = document.getElementById('recursos-link');

    recursosLink.addEventListener('click', function(event) {
        event.preventDefault();
        fetch('/recursos.html')
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
                window.history.pushState({page: 'recursos'}, 'Recursos', '/recursos');
            })
            .catch(error => console.error('Error al cargar los recursos:', error));
    });

    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page === 'recursos') {
            fetch('/recursos.html')
                .then(response => response.text())
                .then(data => {
                    contentDiv.innerHTML = data;
                })
                .catch(error => console.error('Error al cargar los recursos:', error));
        } else {
            window.location.href = '/';
        }
    });
});
