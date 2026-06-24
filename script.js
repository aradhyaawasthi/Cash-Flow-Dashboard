let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalSalary = Number(localStorage.getItem("salary")) || 0;
let totalExpenses = 0;
let transactionCount = 0;
let chart;

const salaryInput = document.getElementById("salaryInput");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const addExpenseBtn = document.getElementById("addExpenseBtn");

const salaryDisplay = document.getElementById("salaryDisplay");
const expenseDisplay = document.getElementById("expenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");
const expenseList = document.getElementById("expenseList");
const emptyMessage = document.getElementById("emptyMessage");

let categoryData = {
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Bills: 0,
    Education: 0,
    Other: 0
};

// Chart
const ctx = document.getElementById("expenseChart");

chart = new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Food", "Travel", "Shopping", "Bills", "Education", "Other"],
        datasets: [{
            data: [0, 0, 0, 0, 0, 0]
        }]
    }
});

// UI Update
function updateUI() {

    salaryDisplay.textContent = totalSalary;
    expenseDisplay.textContent = totalExpenses;
    balanceDisplay.textContent = totalSalary - totalExpenses;

    document.getElementById("transactionCount").textContent =
        transactionCount;

    chart.data.datasets[0].data = [
        categoryData.Food,
        categoryData.Travel,
        categoryData.Shopping,
        categoryData.Bills,
        categoryData.Education,
        categoryData.Other
    ];

    chart.update();

    if (expenseList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// Expense Item Create
function createExpenseItem(item) {

    const li = document.createElement("li");

    li.innerHTML = `
    ${item.category} | ${item.title} | ₹${item.amount}
    <button class="delete-btn">Delete</button>
    `;

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function () {

        totalExpenses -= item.amount;
        transactionCount--;

        categoryData[item.category] -= item.amount;

        expenses = expenses.filter(exp => exp !== item);

        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        li.remove();

        updateUI();

    });

    expenseList.appendChild(li);

}

// Add Expense
addExpenseBtn.addEventListener("click", function () {

    const salary = Number(salaryInput.value);
    const amount = Number(expenseAmount.value);
    const title = expenseName.value.trim();
    const category = expenseCategory.value;

    if (salary <= 0 || amount <= 0 || title === "") {
        alert("Please fill all fields correctly!");
        return;
    }

    totalSalary = salary;

    if (totalExpenses + amount > totalSalary) {
        alert("Expense exceeds salary!");
        return;
    }

    totalExpenses += amount;
    transactionCount++;

    categoryData[category] += amount;

    const item = {
        title: title,
        amount: amount,
        category: category
    };

    expenses.push(item);

    localStorage.setItem("salary", totalSalary);
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    createExpenseItem(item);

    updateUI();

    expenseName.value = "";
    expenseAmount.value = "";

});

// Load Saved Data
function loadSavedData() {

    salaryInput.value = totalSalary;

    expenses.forEach(item => {

        totalExpenses += item.amount;
        transactionCount++;

        categoryData[item.category] += item.amount;

        createExpenseItem(item);

    });

    updateUI();

}

loadSavedData();