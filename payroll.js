var employeesList = [];

// Add event listeners to the confirmation dialog buttons only once
const confirmButton = document.getElementById("confirmSubmit");
const cancelButton = document.getElementById("cancelSubmit");

let employeeName, daysWorked, dailyRate, deduction; // Declare variables in a broader scope

confirmButton.addEventListener("click", () => {
  // Calculate pay details
  const grossPay = (daysWorked * dailyRate).toFixed(2);
  const netPay = (grossPay - deduction).toFixed(2);

  // Create the employee object
  const newEmployee = {
    name: employeeName,
    daysWorked,
    dailyRate,
    grossPay,
    deduction,
    netPay,
  };

  // Add employee to the list
  employeesList.push(newEmployee);

  // Debug: Check the employees list in the console
  console.log(employeesList);

  // Update the table with the new employee
  updateEmployeeTable();

  // Reset the form after successful submission
  document.getElementById("employeeForm").reset();
  document.getElementById("dlgConfirmSubmit").close();
});

cancelButton.addEventListener("click", () => {
  document.getElementById("dlgConfirmSubmit").close();
});

// Handle employee form submission
document.getElementById("employeeForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  
  employeeName = document.getElementById("name").value.trim();
  const daysWorkedInput = document.getElementById("daysworked").value.trim();
  const dailyRateInput = document.getElementById("dailyrate").value.trim();
  const deductionInput = document.getElementById("deduction").value.trim();

  // Check if any fields are empty
  if (!employeeName || !daysWorkedInput || !dailyRateInput || !deductionInput) {
    alert("All fields are required.");
    return;
  }

  daysWorked = parseFloat(daysWorkedInput);
  dailyRate = parseFloat(dailyRateInput);
  deduction = parseFloat(deductionInput);

  // Check if values are valid numbers
  if (isNaN(daysWorked) || isNaN(dailyRate) || isNaN(deduction)) {
    alert("Please enter valid numeric values for Days Worked, Daily Rate, and Deduction.");
    return;
  }

  // Show confirmation dialog
  const confirmationDialog = document.getElementById("dlgConfirmSubmit");
  confirmationDialog.showModal();
});

// Update the employee table
function updateEmployeeTable() {
  let tableContent = "";
  let totalGrossPay = 0.0, totalDeductions = 0.0, totalNetPay = 0.0;
  let employeeNumber = 1;

  // Loop through employees to build the table rows
  employeesList.forEach((employee) => {
    tableContent += `<tr>
      <td style="text-align:right">${employeeNumber}</td>
      <td>${employee.name}</td>
      <td class="ndata">${employee.daysWorked.toFixed(2)}</td>
      <td class="ndata">${employee.dailyRate.toFixed(2)}</td>
      <td class="ndata">${employee.grossPay}</td>
      <td class="ndata">${employee.deduction.toFixed(2)}</td>
      <td class="ndata">${employee.netPay}</td>
    </tr>`;
    totalGrossPay += parseFloat(employee.grossPay);
    totalDeductions += parseFloat(employee.deduction);
    totalNetPay += parseFloat(employee.netPay);
    employeeNumber++;
  });

  // Insert the table content and update totals
  document.getElementById("tablebody").innerHTML = tableContent;
  document.getElementById("tGrossPay").textContent = totalGrossPay.toFixed(2);
  document.getElementById("tDeduction").textContent = totalDeductions.toFixed(2);
  document.getElementById("tNetPay").textContent = totalNetPay.toFixed(2);
}