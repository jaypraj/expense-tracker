let amount;
let note;
let dateTime;

let amountInput = document.querySelector("#amount");
let noteInput = document.querySelector("#note");
let dateTimeInput = document.querySelector("#dateTime");
let addBtn = document.querySelector("#addBtn");

let form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

addBtn.addEventListener("click", () => {
    console.log("Clicked!")

    amount = amountInput.value;
    note = noteInput.value;
    dateTime = dateTimeInput.value;
    console.log(amount);

    let row = document.createElement("tr");

    let amountCol = document.createElement("td");
    let noteCol = document.createElement("td");
    let dateCol = document.createElement("td");

    amountCol.textContent = amount;
    noteCol.textContent = note;
    dateCol.textContent = dateTime;

    row.appendChild(amountCol);
    row.appendChild(noteCol);
    row.appendChild(dateCol);

    document.querySelector(".expenses").style.display = "table";
    document.querySelector(".expenses tbody").appendChild(row);
    form.reset();
});
