
const carbonData = {
  tshirt: 6.5,       // approx. 6.5 kg CO2 for a typical T-shirt (https://www.arbor.eco/carbon-footprint/t-shirt?utm_source=chatgpt.com)
  jeans: 16.4,       // approx. 16.4 kg CO2 for a pair of jeans  (https://www.carbonfact.com/carbon-footprint/jeans?utm_source=chatgpt.com)
  jacket: 29.7,      // approx. 29.7 kg CO2 for a jacket (https://www.carbonfact.com/carbon-footprint?utm_source=chatgpt.com)
  shoes: 27.2,       // approx. 27.2 kg CO2 for shoes (https://www.carbonfact.com/carbon-footprint?utm_source=chatgpt.com)
  accessory: 5.8     // approx. 5.8 kg CO2 for a generic accessory – (https://www.carbonfact.com/carbon-footprint?utm_source=chatgpt.com)
};

const dropdowns = document.querySelectorAll(".dropdown");
const output = document.querySelector(".output");


function updateCarbonFootprint() {
    let total = 0;

dropdowns.forEach(dropdown => {
    const value = dropdown.value;
    if (carbonData[value]) {
        total += carbonData[value];
    }
});
    output.textContent = total > 0 ? `${total.toFixed(1)} CO2/kg` : "CO2/KG";
}

// Add event listeners
dropdowns.forEach(dropdown => {
    dropdown.addEventListener("change", updateCarbonFootprint);
});