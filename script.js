class Expense {
    id;
    title;
    amount;
    category;
    note;
    dateTime;

    constructor(title, amount, category, note, dateTime) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.note = note;
        this.dateTime = new Date(dateTime).toISOString();
    }
}

let now = new Date();

let title = document.querySelector("#title");
let amount = document.querySelector("#amount");
let category = document.querySelector("#category");
let note = document.querySelector("#note");
let dateTime = document.querySelector("#dateTime");
dateTime.value = getLocalDateTime(now);
let addBtn = document.querySelector("#addBtn");
let expensesTable = document.querySelector(".expenses");

function getLocalDateTime(date) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

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
    if (title.value == "" || amount.value == "") {
        alert("Title or amount cannot be empty!");
        return;
    }

    const expense = new Expense(title.value, amount.value, category.value, note.value, dateTime.value);
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

        let titleCol = document.createElement("td");
        let amountCol = document.createElement("td");
        let categoryCol = document.createElement("td");
        let noteCol = document.createElement("td");
        let dateCol = document.createElement("td");
        let deleteBtnCol = document.createElement("td");
        let deleteBtn = document.createElement("button");
        deleteBtn.dataset.action = "delete";
        deleteBtn.textContent = "x";

        row.dataset.expenseId = expense.id;
        titleCol.textContent = expense.title;
        amountCol.textContent = expense.amount;
        categoryCol.textContent = expense.category;
        noteCol.textContent = expense.note;
        dateCol.textContent = new Date(expense.dateTime).toLocaleString();
        
        row.appendChild(titleCol);
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
