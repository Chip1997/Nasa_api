const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultDiv = document.getElementById('result');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const query = searchInput.value;
    searchImages(query);
});

function searchImages(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function displayResults(data) {
    resultDiv.innerHTML = ''; 

    if (data.collection && data.collection.items.length > 0) {
        data.collection.items.slice(0, 5).forEach(item => { 
            const title = item.data[0].title;
            const description = item.data[0].description;
            const imageUrl = item.links[0].href;

            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.classList.add('centered-image'); 

            const titleElement = document.createElement('h3');
            titleElement.textContent = title;

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description;

            const container = document.createElement('div');
            container.classList.add('result-item'); 
            container.appendChild(imageElement);
            container.appendChild(titleElement);
            container.appendChild(descriptionElement);

            resultDiv.appendChild(container);
        });

        if (data.collection.items.length > 5) {
            const showMoreButton = document.createElement('button');
            showMoreButton.textContent = 'Mostrar mas';
            showMoreButton.addEventListener('click', function() {
                showMoreResults(data.collection.items.slice(5)); // 
                showMoreButton.style.display = 'none'; // 
            });

            resultDiv.appendChild(showMoreButton);
        }
    } else {
        resultDiv.textContent = 'No se encontraron resultados.';
    }
}

function showMoreResults(items) {
    items.forEach(item => {
        const title = item.data[0].title;
        const description = item.data[0].description;
        const imageUrl = item.links[0].href;

        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('centered-image'); 
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;

        const container = document.createElement('div');
        container.classList.add('result-item'); 
        container.appendChild(imageElement);
        container.appendChild(titleElement);
        container.appendChild(descriptionElement);

        resultDiv.appendChild(container);
    });
}