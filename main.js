
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

const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

// Check for preferred theme
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
    body.classList.add('dark-mode');
}

themeSwitcher.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// Image Classification
const modelURL = "https://teachablemachine.withgoogle.com/models/46rzOa_lH/";
let model;

const imageUpload = document.getElementById("image-upload");
const classifyButton = document.getElementById("classify-button");
const imagePreview = document.getElementById("image-preview");
const predictionContainer = document.getElementById("prediction-container");

async function init() {
    const modelPath = modelURL + "model.json";
    const metadataPath = modelURL + "metadata.json";
    model = await tmImage.load(modelPath, metadataPath);
    console.log("Model loaded");
}

imageUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

classifyButton.addEventListener("click", async () => {
    if (!model) {
        predictionContainer.innerHTML = "Model not loaded yet. Please wait.";
        return;
    }
    if (imagePreview.src === "") {
        predictionContainer.innerHTML = "Please upload an image first.";
        return;
    }
    const predictions = await model.predict(imagePreview);
    displayPredictions(predictions);
});

function displayPredictions(predictions) {
    predictionContainer.innerHTML = ""; // Clear previous predictions
    let highestPrediction = { className: "", probability: 0 };

    predictions.forEach(prediction => {
        if (prediction.probability > highestPrediction.probability) {
            highestPrediction = prediction;
        }
    });

    const result = document.createElement("p");
    result.innerHTML = `I am ${Math.round(highestPrediction.probability * 100)}% sure this is a ${highestPrediction.className}.`;
    predictionContainer.appendChild(result);
}

// Initialize the model when the script loads
init();
