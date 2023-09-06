const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");

for (var i = 0; i < 100; i++) {
  console.log("Vamo arriba el manya " + i);
}
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const query = searchInput.value;
  searchImages(query);
});

function searchImages(query) {
  const url = `https://images-api.nasa.gov/search?q=${query}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

let currentIndex = 0;
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
        const itemsToShow = data.collection.items.slice(currentIndex, currentIndex + 5);

        itemsToShow.forEach(item => {
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

        currentIndex += 5;

        if (currentIndex < data.collection.items.length) {
            const showMoreButton = document.createElement('button');
            showMoreButton.textContent = 'Mostrar más';
            showMoreButton.addEventListener('click', function () {
                showMoreResults(data.collection.items.slice(currentIndex, currentIndex + 5));
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

    currentIndex += 5;
}