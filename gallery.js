
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
            photos.forEach((photo, index) => {
                const card = document.createElement('cat-card');
                card.setAttribute('img-url', photo.url);
                card.setAttribute('cat-name', `Cat Friend #${index + 1}`);
                photoGrid.appendChild(card);
            });
        }
    }

    displayCatPhotos();
});
