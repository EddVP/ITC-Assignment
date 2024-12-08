function addListeners() {
    document.getElementById("computetaxbtn").addEventListener("click", computeTax);
}

function computeTax() {
    const tiInput = document.getElementById("ti");
    const resultElement = document.getElementById("result");
    const loader = document.getElementById("loader");

    if (!tiInput || !resultElement || !loader) {
        console.error("Input, result element, or loader not found.");
        return;
    }

    const ti = parseFloat(tiInput.value);

    // Validate input
    if (isNaN(ti) || ti <= 0) {
        resultElement.textContent = "Please enter a valid income amount.";
        loader.style.display = "none";
        return;
    }

    // Show loader and clear result
    loader.style.display = "block";
    resultElement.textContent = "";

    // Simulate a processing delay for the loader animation
    setTimeout(() => {
        let totalTax = 0;
        let basicTax = 0;
        let bracketTax = 0;

        // Calculate tax based on income brackets
        if (ti < 250000) {
            basicTax = 0;
            bracketTax = 0;
        } else if (ti >= 250000 && ti < 450000) {
            basicTax = 0;
            bracketTax = 0.20 * (ti - 250000);
        } else if (ti >= 450000 && ti <= 800000) {
            basicTax = 30000;
            bracketTax = 0.20 * (ti - 450000);
        } else {
            basicTax = 30000; // Base tax for the 450k-800k range
            bracketTax = 0.30 * (ti - 800000); // Example for income above 800k
        }

        totalTax = basicTax + bracketTax;

        // Hide loader and display result
        loader.style.display = "none";
        resultElement.textContent = `Total Tax: PHP ${totalTax.toFixed(2)}`;
    }, 2000); // Adjust delay as needed
}

// Call the function to add event listeners
document.addEventListener("DOMContentLoaded", addListeners);
