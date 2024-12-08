// Sample employees list to simulate existing data
let employeesList = [];

// Update the table with current employees data
function updateEmployeeTable() {
    const tableBody = document.getElementById("tablebody");
    tableBody.innerHTML = ""; // Clear the table first

    let totalGrossPay = 0;
    let totalDeduction = 0;
    let totalNetPay = 0;

    employeesList.forEach((employee, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.daysWorked}</td>
            <td>${employee.dailyRate}</td>
            <td>${employee.grossPay}</td>
            <td>${employee.deduction}</td>
            <td>${employee.netPay}</td>
        `;

        tableBody.appendChild(row);

        // Update total calculations
        totalGrossPay += parseFloat(employee.grossPay);
        totalDeduction += parseFloat(employee.deduction);
        totalNetPay += parseFloat(employee.netPay);
    });

    // Update the totals row
    document.getElementById("tGrossPay").textContent = totalGrossPay.toFixed(2);
    document.getElementById("tDeduction").textContent = totalDeduction.toFixed(2);
    document.getElementById("tNetPay").textContent = totalNetPay.toFixed(2);
}

// Event listener for form submission (adding a new employee)
document.getElementById("employeeForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    const name = document.getElementById("name").value.trim();
    const daysWorked = parseFloat(document.getElementById("daysworked").value.trim());
    const dailyRate = parseFloat(document.getElementById("dailyrate").value.trim());
    const deduction = parseFloat(document.getElementById("deduction").value.trim());

    // Calculate gross pay and net pay
    const grossPay = (daysWorked * dailyRate).toFixed(2);
    const netPay = (grossPay - deduction).toFixed(2);

    // Create a new employee object and add it to the list
    const newEmployee = {
        name,
        daysWorked,
        dailyRate,
        grossPay,
        deduction,
        netPay
    };

    employeesList.push(newEmployee);
    updateEmployeeTable(); // Refresh the table with the new data

    // Clear the form
    document.getElementById("employeeForm").reset();
});

// Edit button event
document.getElementById("btnedit").addEventListener("click", () => { 
    const empNumberInput = document.getElementById("delemployee").value.trim(); // retrieves employee number to edit from the input

    const empNumber = parseInt(empNumberInput, 10); // converts string input to a base 10 integer
    if (isNaN(empNumber) || empNumber < 1 || empNumber > employeesList.length) { // alerts if the input is invalid
        alert("Invalid Employee Number. Please enter a number between 1 and " + employeesList.length);
        return false;
    }

    // Fill the form with the existing employee data for editing
    const empIndex = empNumber - 1; // converts value of employee to be appropriate with array index
    const employee = employeesList[empIndex]; // assigns that value to employee, meaning we can now directly access the object with the employee variable

    // Show the confirmation dialog for editing
    const confirmationDialog = document.getElementById("dlgConfirmEdit");
    document.getElementById("edtmsg").textContent = `Are you sure you want to edit the details of Employee No. ${empNumber}?`;
    confirmationDialog.showModal();

    confirmationDialog.addEventListener("close", () => {
        if (confirmationDialog.returnValue === 'confirm') {
            const name = document.getElementById("name").value.trim();
            const daysworkedInput = document.getElementById("daysworked").value.trim();
            const dailyrateInput = document.getElementById("dailyrate").value.trim();
            const deductionInput = document.getElementById("deduction").value.trim();

            if (!name || !daysworkedInput || !dailyrateInput || !deductionInput) {
                alert("All fields are required.");
                return;
            }

            // Update the employee details
            employee.name = name; // syntax for updating value of property = objectName.property
            employee.daysWorked = parseFloat(daysworkedInput);
            employee.dailyRate = parseFloat(dailyrateInput);
            employee.deduction = parseFloat(deductionInput);
            employee.grossPay = (employee.daysWorked * employee.dailyRate).toFixed(2);
            employee.netPay = (employee.grossPay - employee.deduction).toFixed(2);

            updateEmployeeTable();  // Update the table with the modified data
            document.getElementById("delemployee").value = ''; // Reset the employee number field
            // Reset the input fields after editing
            document.getElementById("name").value = '';
            document.getElementById("daysworked").value = '';
            document.getElementById("dailyrate").value = '';
            document.getElementById("deduction").value = '';
        }
    });
});

// Delete button event
document.getElementById("btndelete").addEventListener("click", () => {
    const employeeNumberInput = document.getElementById("delemployee").value.trim();

    if (!employeeNumberInput) {
        alert("Please enter a valid Employee No.");
        return;
    }

    const employeeIndex = parseInt(employeeNumberInput) - 1; // Employee number starts from 1 in the table

    if (employeeIndex < 0 || employeeIndex >= employeesList.length) {
        alert("Employee not found.");
        return;
    }

    // Remove the employee from the list
    employeesList.splice(employeeIndex, 1);
    updateEmployeeTable(); // Refresh the table with the updated data
});

// Delete All button event
document.getElementById("btndeleteall").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all employees?")) {
        employeesList = [];
        updateEmployeeTable(); // Refresh the table after deletion
    }
});
