document.querySelector("#calculate").addEventListener("click", () => {
    const number = parseFloat(document.getElementById("number").value);
    const operation = document.getElementById("operation").value;
    const resultField = document.getElementById("result");
    const loader = document.getElementById("loader");

    let result = 0;
    let i = 1;

    // Clear previous error or result
    resultField.value = "";

    // Show the loader and disable the button
    loader.style.display = "block";
    const button = document.getElementById("calculate");
    button.disabled = true;

    setTimeout(() => {
        // Check if an operation is selected
        if (!operation) {
            resultField.value = "Error: Please choose an operation.";
        } else {
            if (operation === "F") {
                result = 1;
                while (i <= number) {
                    result *= i;
                    i++;
                }
            } else if (operation === "S") {
                do {
                    result += i;
                    i++;
                } while (i <= number);
            } else if (operation === "A") {
                for (let i = 1; i <= number; i++) {
                    result += i;
                }
                result /= number;
            }
            resultField.value = result;
        }

        // Hide the loader and re-enable the button
        loader.style.display = "none";
        button.disabled = false;
    }, 1000); // Simulates a delay of 1 second
});
