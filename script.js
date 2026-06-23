
const salaryInput = document.getElementById("salaryInput");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");

const addExpenseBtn = document.getElementById("addExpenseBtn");

const salaryDisplay = document.getElementById("salaryDisplay");
const expenseDisplay = document.getElementById("expenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");

const expenseList = document.getElementById("expenseList");

let totalSalary = 0;
let totalExpenses = 0;
let transactionCount = 0;
let chart;

let categoryData = {
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Bills: 0,
    Education: 0,
    Other: 0
};

addExpenseBtn.addEventListener("click", function () {

    const salary = Number(salaryInput.value);
    const expense = Number(expenseAmount.value);
    const expenseTitle = expenseName.value;

    if (
    salary <= 0 ||
    expense <= 0 ||
    expenseTitle.trim() === ""
) {
    alert("Please fill all fields correctly!");
    return;
}
if (totalExpenses + expense > salary) {
    alert("Expense exceeds salary!");
    return;
}

    totalSalary = salary;
totalExpenses += expense;

salaryDisplay.textContent = totalSalary;
expenseDisplay.textContent = totalExpenses;

balanceDisplay.textContent =
    totalSalary - totalExpenses; 
    const listItem = document.createElement("li");
    const category =
document.getElementById("expenseCategory").value;

listItem.innerHTML =
`${category} | ${expenseTitle} | ₹${expense}
<button class="delete-btn">Delete</button>`;

    const deleteBtn =
    listItem.querySelector(".delete-btn");

deleteBtn.addEventListener("click", function () {

    totalExpenses -= expense;

    expenseDisplay.textContent = totalExpenses;

    balanceDisplay.textContent =
        totalSalary - totalExpenses;

       transactionCount--;

document.getElementById("transactionCount").textContent =
transactionCount; 
categoryData[category] -= expense;

chart.data.datasets[0].data = [
    categoryData.Food,
    categoryData.Travel,
    categoryData.Shopping,
    categoryData.Bills,
    categoryData.Education,
    categoryData.Other
];

chart.update();

    listItem.remove();

});
transactionCount++;

document.getElementById("transactionCount").textContent =
transactionCount;
categoryData[category] += expense;

chart.data.datasets[0].data = [
    categoryData.Food,
    categoryData.Travel,
    categoryData.Shopping,
    categoryData.Bills,
    categoryData.Education,
    categoryData.Other
];

chart.update();
expenseList.appendChild(listItem);

expenseName.value = "";
expenseAmount.value = "";
});
const ctx =
document.getElementById("expenseChart");

chart = new Chart(ctx, {
    type: "pie",

    data: {
        labels: [
            "Food",
            "Travel",
            "Shopping",
            "Bills",
            "Education",
            "Other"
        ],

        datasets: [{
            data: [0, 0, 0, 0, 0, 0]
        }]
    }
});