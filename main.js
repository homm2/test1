
const photoGrid = document.querySelector('.photo-grid');

async function getCatPhotos() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cat photos:', error);
    }
}

async function displayCatPhotos() {
    const photos = await getCatPhotos();
    if (photos) {
        photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.url;
            img.alt = 'A cute cat';
            photoGrid.appendChild(img);
        });
    }
}

displayCatPhotos();
