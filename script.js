class Expense {
    id;
    amount;
    category;
    note;
    dateTime;

    constructor(amount, category, note, dateTime) {
        this.id = crypto.randomUUID();
        this.amount = amount;
        this.category = category;
        this.note = note;
        this.dateTime = dateTime;
    }
}

let amount = document.querySelector("#amount");
let category = document.querySelector("#category");
let note = document.querySelector("#note");
let dateTime = document.querySelector("#dateTime");
let addBtn = document.querySelector("#addBtn");
let expensesTable = document.querySelector(".expenses");

expensesTable.addEventListener("click", (e) => {
    if (e.target.dataset.action == "delete") {
        deleteExpense(e.target.parentElement.parentElement.dataset.expenseId);
    }
});

let expenses = [];

let form = document.querySelector("#expenseForm");

// Prevent the default behaviour of form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

addBtn.addEventListener("click", () => addExpense());

function addExpense() {
    const expense = new Expense(amount.value, category.value, note.value, dateTime.value);
    expenses.push(expense);

    renderExpenses();

    form.reset();
}

function deleteExpense(expenseId) {
    console.log(expenses);
    expenses = expenses.filter((expense) => expense.id != expenseId);
    console.log(expenses);

    renderExpenses();

    if (expenses.length == 0) {
        expensesTable.style.display = "None";
    }
}

function renderExpenses() {
    document.querySelector(".expenses tbody").innerHTML = "";
    expenses.forEach((expense) => {
        let row = document.createElement("tr");

        let amountCol = document.createElement("td");
        let categoryCol = document.createElement("td");
        let noteCol = document.createElement("td");
        let dateCol = document.createElement("td");
        let deleteBtnCol = document.createElement("td");
        let deleteBtn = document.createElement("button");
        deleteBtn.dataset.action = "delete";
        deleteBtn.textContent = "x";

        row.dataset.expenseId = expense.id;
        amountCol.textContent = expense.amount;
        categoryCol.textContent = expense.category;
        noteCol.textContent = expense.note;
        dateCol.textContent = expense.dateTime;

        row.appendChild(amountCol);
        row.appendChild(categoryCol);
        row.appendChild(noteCol);
        row.appendChild(dateCol);
        deleteBtnCol.appendChild(deleteBtn);
        row.appendChild(deleteBtnCol);

        expensesTable.style.display = "table";
        document.querySelector(".expenses tbody").appendChild(row);
    });
}
