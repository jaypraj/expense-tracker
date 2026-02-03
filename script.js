class Expense {
    amount;
    category;
    note;
    dateTime;

    constructor(amount, category, note, dateTime) {
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

const expenses = [];

let form = document.querySelector("#expenseForm");

// Prevent the default behaviour of form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

addBtn.addEventListener("click", () => {
    const expense = new Expense(amount.value, category.value, note.value, dateTime.value);

    let row = document.createElement("tr");

    let amountCol = document.createElement("td");
    let categoryCol = document.createElement("td");
    let noteCol = document.createElement("td");
    let dateCol = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";

    
    amountCol.textContent = expense.amount;
    categoryCol.textContent = expense.category;
    noteCol.textContent = expense.note;
    dateCol.textContent = expense.dateTime;
    
    row.appendChild(amountCol);
    row.appendChild(categoryCol)
    row.appendChild(noteCol);
    row.appendChild(dateCol);
    row.appendChild(document.createElement("td").appendChild(deleteBtn));
    
    expensesTable.style.display = "table";
    document.querySelector(".expenses tbody").appendChild(row);
    form.reset();
    
    deleteBtn.addEventListener("click", (e) => deleteExpense(e));
    expenses.push(expense);
});

function deleteExpense(e) {
    e.target.parentElement.remove();

    if (!document.querySelector(".expenses tbody").hasChildNodes()) {
        expensesTable.style.display = "None";
    }
}
