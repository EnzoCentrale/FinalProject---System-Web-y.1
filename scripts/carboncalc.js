document.addEventListener('DOMContentLoaded', () => {
    const modelURL = "https://teachablemachine.withgoogle.com/models/2oQIS7hpQ/";
    const modelJsonURL = "https://teachablemachine.withgoogle.com/models/2oQIS7hpQ/" + "model.json";
    const metadataJsonURL = "https://teachablemachine.withgoogle.com/models/2oQIS7hpQ/" + "metadata.json";

    let model;
    let isModelLoaded = false;

    // Carbon footprint data for each class (in kg CO2 per item)
    const carbonData = {
        "T-Shirt": 2.1,
        "T-shirt": 2.1, 
        "t-shirt": 2.1, 
        "Jeans": 23.0,
        "Sneakers": 13.6,
        "Jacket": 30.0,
        "Accessories": 5.5,
        "Pants": 18.0,
        "Shoes": 14.0
    };

    const items = document.querySelectorAll('.item');
    const totalOutput = document.querySelector('.result .output');
    let itemCarbonValues = new Array(items.length).fill(0);

    // Function to load the model
    async function loadModel() {
        if (typeof tmImage === 'undefined') {
            console.error("Error: Teachable Machine library not found");
            items.forEach(item => {
                const detectionText = item.querySelector('.detection-text');
                detectionText.textContent = 'Error: Libraries missing.';
                detectionText.style.color = 'red';
            });
            return;
        }

        try {
            model = await tmImage.load(modelJsonURL, metadataJsonURL);
            isModelLoaded = true;
            console.log("Model loaded successfully");
            
            // Debug: Log the classes found in the model to help match with our data 
            console.log("Model classes detected:", model.getClassLabels());

            // Update UI for all items now that model is loaded
            items.forEach(item => {
                const detectionText = item.querySelector('.detection-text');
                if (detectionText.textContent.includes('Loading model...')) {
                    detectionText.textContent = 'Upload an image to see its carbon footprint.';
                }
            });
        } catch (error) {
            console.error("Error loading model:", error);
            items.forEach(item => {
                const detectionText = item.querySelector('.detection-text');
                detectionText.textContent = 'Error: Could not load model.';
                detectionText.style.color = 'red';
            });
        }
    }

    function updateTotal() {
        const total = itemCarbonValues.reduce((sum, value) => sum + value, 0);
        totalOutput.textContent = `${total.toFixed(2)} kg CO2`;
    }

    items.forEach((item, index) => {
        const imageInput = item.querySelector('.image-input');
        const previewImage = item.querySelector('.preview-image');
        const detectionText = item.querySelector('.detection-text');
        const itemResult = item.querySelector('.item-result');

        detectionText.textContent = 'Loading model...';

        imageInput.addEventListener('change', async (event) => {
            if (!isModelLoaded) {
                detectionText.textContent = 'Model is still loading, please wait.';
                return;
            }
            if (event.target.files && event.target.files[0]) {
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = async (e) => {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    detectionText.textContent = 'Analyzing...';

                    previewImage.onload = async () => {
                        const predictions = await model.predict(previewImage);
                        const topPrediction = predictions.reduce((prev, current) => (prev.probability > current.probability) ? prev : current);
                        const className = topPrediction.className;
                        // Debug: Check exactly what the model sees in the console
                        console.log(`Detected class: "${className}"`);

                        const probability = (topPrediction.probability * 100).toFixed(1);
                        const carbonValue = carbonData[className] || 0; // Default to 0 if class not in our data

                        detectionText.textContent = `Detected: ${className} (${probability}%)`;
                        // Updated to show the estimate clearly
                        itemResult.textContent = `Estimate: ${carbonValue.toFixed(2)} kg CO2`;
                        itemCarbonValues[index] = carbonValue;
                        updateTotal();
                    };
                };

                reader.readAsDataURL(file);
            }
        });
    });

    // Initial call to load the model
    loadModel();
});
