
document.addEventListener('DOMContentLoaded', () => {
    const photoGrid = document.querySelector('.photo-grid');

    async function getCatPhotos() {
        try {
            // Fetching more images for a more substantial gallery
            const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=20');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching cat photos:', error);
        }
    }

    async function displayCatPhotos() {
        if (!photoGrid) return; // Don't run if there's no photo grid on the page

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
});
