var employeesList = [];

// Handle employee form submission
document.getElementById("employeeForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  
  const employeeName = document.getElementById("name").value.trim();
  const daysWorkedInput = document.getElementById("daysworked").value.trim();
  const dailyRateInput = document.getElementById("dailyrate").value.trim();
  const deductionInput = document.getElementById("deduction").value.trim();

  // Check if any fields are empty
  if (!employeeName || !daysWorkedInput || !dailyRateInput || !deductionInput) {
    alert("All fields are required.");
    return;
  }

  const daysWorked = parseFloat(daysWorkedInput);
  const dailyRate = parseFloat(dailyRateInput);
  const deduction = parseFloat(deductionInput);

  // Check if values are valid numbers
  if (isNaN(daysWorked) || isNaN(dailyRate) || isNaN(deduction)) {
    alert("Please enter valid numeric values for Days Worked, Daily Rate, and Deduction.");
    return;
  }

  // Prepare the employee data
  const grossPay = (daysWorked * dailyRate).toFixed(2);
  const netPay = (grossPay - deduction).toFixed(2);

  // Show confirmation dialog
  const confirmationDialog = document.getElementById("dlgConfirmSubmit");
  confirmationDialog.showModal(); // Show confirmation dialog

  confirmationDialog.addEventListener("close", () => {
    if (confirmationDialog.returnValue === "confirm") {
      // Add the employee after confirmation
      const newEmployee = {
        name: employeeName,
        daysWorked,
        dailyRate,
        grossPay,
        deduction,
        netPay,
      };

      employeesList.push(newEmployee);
      updateEmployeeTable();

      // Reset the form fields after successful submission
      document.getElementById("employeeForm").reset();
    }
  });
});

// Handle employee edit
document.getElementById("btnedit").addEventListener("click", () => {
  const employeeNumberInput = document.getElementById("delemployee").value.trim();
  const employeeNumber = parseInt(employeeNumberInput, 10);

  if (isNaN(employeeNumber) || employeeNumber < 1 || employeeNumber > employeesList.length) {
    alert("Invalid Employee Number. Please enter a number between 1 and " + employeesList.length);
    return false;
  }

  const employeeIndex = employeeNumber - 1;
  const employeeToEdit = employeesList[employeeIndex];

  const confirmationDialog = document.getElementById("dlgConfirmEdit");
  document.getElementById("edtmsg").textContent = `Are you sure you want to edit the details of Employee No. ${employeeNumber}?`;
  confirmationDialog.showModal();

  confirmationDialog.addEventListener("close", () => {
    if (confirmationDialog.returnValue === 'confirm') {
      const employeeName = document.getElementById("name").value.trim();
      const daysWorkedInput = document.getElementById("daysworked").value.trim();
      const dailyRateInput = document.getElementById("dailyrate").value.trim();
      const deductionInput = document.getElementById("deduction").value.trim();

      if (!employeeName || !daysWorkedInput || !dailyRateInput || !deductionInput) {
        alert("All fields are required.");
        return;
      }

      employeeToEdit.name = employeeName;
      employeeToEdit.daysWorked = parseFloat(daysWorkedInput);
      employeeToEdit.dailyRate = parseFloat(dailyRateInput);
      employeeToEdit.deduction = parseFloat(deductionInput);
      employeeToEdit.grossPay = (employeeToEdit.daysWorked * employeeToEdit.dailyRate).toFixed(2);
      employeeToEdit.netPay = (employeeToEdit.grossPay - employeeToEdit.deduction).toFixed(2);

      updateEmployeeTable();
      document.getElementById("delemployee").value = ''; // Clear the employee number input
    }
  });
});

// Update the employee table
function updateEmployeeTable() {
  let tableContent = "";
  let totalGrossPay = 0.0, totalDeductions = 0.0, totalNetPay = 0.0;
  let employeeNumber = 1;

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

  document.getElementById("tablebody").innerHTML = tableContent;
  document.getElementById("tGrossPay").textContent = totalGrossPay.toFixed(2);
  document.getElementById("tDeduction").textContent = totalDeductions.toFixed(2);
  document.getElementById("tNetPay").textContent = totalNetPay.toFixed(2);
}

// Handle delete button
document.addEventListener("DOMContentLoaded", () => {
  updateEmployeeTable();

  const confirmDeleteDialog = document.getElementById("dlgConfirmCancel");
  document.getElementById("btndelete").addEventListener("click", () => {
    let employeeIndex = document.getElementById("delemployee").value * 1 - 1;
    if ((employeeIndex >= 0) && (employeeIndex < employeesList.length)) {
      document.getElementById("dlgmsg").innerHTML = `Delete Employee No. ${employeeIndex + 1}: ${employeesList[employeeIndex].name}?`;
      confirmDeleteDialog.showModal();
    } else {
      alert("Invalid employee number for deletion.");
    }
  });

  // Handle delete all button
  document.getElementById("btndeleteall").addEventListener("click", () => {
    document.getElementById("dlgmsg").innerHTML = "Delete all records?";
    confirmDeleteDialog.showModal();
  });

  // Handle delete confirmation dialog close
  confirmDeleteDialog.addEventListener("close", (e) => {
    const result = e.target.returnValue;
    if (result === "confirm") {
      const dialogMessage = document.getElementById("dlgmsg").innerHTML;
      if (dialogMessage === "Delete all records?") {
        const confirmAllDeleteDialog = document.getElementById("dlgAreYouSure");
        document.getElementById("dlgmsg2").innerHTML = "Are you sure?";
        confirmAllDeleteDialog.showModal();
      } else {
        const employeeIndex = document.getElementById("delemployee").value * 1 - 1;
        employeesList.splice(employeeIndex, 1);
        updateEmployeeTable();
        document.getElementById("delemployee").value = ''; // Clear employee number input
      }
    }
  });

  // Handle delete all confirmation dialog
  const confirmAllDeleteDialog = document.getElementById("dlgAreYouSure");
  confirmAllDeleteDialog.addEventListener("close", (e) => {
    const result = e.target.returnValue;
    if (result === "yes") {
      employeesList = [];
      updateEmployeeTable();
    }
  });
});
