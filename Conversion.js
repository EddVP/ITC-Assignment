document.getElementById("conversion-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const convertButton = document.getElementById("convert");
    const num1 = parseFloat(document.getElementById("num1").value);
    const operation = document.getElementById("operation").value;

    // Disable button and show loader animation
    convertButton.disabled = true;

    let result;

    if (operation === "CTF") {
        result = (num1 * 9 / 5) + 32;
    } else if (operation === "FTC") {
        result = (num1 - 32) * 5 / 9;
    } else if (operation === "MTF") {
        result = num1 * 3.28084;
    } else if (operation === "FTM") {
        result = num1 / 3.28084;
    }

    // Simulate a delay for the loader (e.g., 1 second)
    setTimeout(() => {
        document.getElementById("result").value = result;

        // Re-enable button
        convertButton.disabled = false;
    }, 1000); // Adjust delay as needed
});
