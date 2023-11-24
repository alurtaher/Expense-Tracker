document.addEventListener("DOMContentLoaded", () => {
    loadExpenses();
  });

  function addExpense() {
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const descriptionInput=document.getElementById("description");

    const amount = amountInput.value;
    const category = categoryInput.value;
    const description =descriptionInput.value;

    if (amount && category && description) {
      const expense = { amount, category , description};
      const expenses = getExpenses();
      expenses.push(expense);
      saveExpenses(expenses);
      clearForm();
      loadExpenses();
    }
  }

  function clearForm() {
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value="";
  }

  function getExpenses() {
    const expensesJSON = localStorage.getItem("expenses");
    return expensesJSON ? JSON.parse(expensesJSON) : [];
  }

  function saveExpenses(expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function loadExpenses() {
    const expenses = getExpenses();
    const expensesListContainer = document.getElementById("expense-list-container");
    expensesListContainer.innerHTML = "";

    expenses.forEach((expense, index) => {
      const listItem = document.createElement("li");
      listItem.className = "expense-item";
      listItem.innerHTML = `
        <li>${expense.amount}: ${expense.category} ${expense.description}</li>
        <button class="edit-btn" onclick="editExpense(${index})">edit</button>
        <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
      `;
      expensesListContainer.appendChild(listItem);
    });
  }

  function editExpense(index) {
    const expenses = getExpenses();
    const editedExpense = expenses[index];

    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const descriptionInput=document.getElementById("description");

    amountInput.value = editedExpense.amount;
    categoryInput.value = editedExpense.category;
    descriptionInput.value=editedExpense.description;

    expenses.splice(index, 1);
    saveExpenses(expenses);
    loadExpenses();
  }

  function deleteExpense(index) {
    const expenses = getExpenses();
    expenses.splice(index, 1);
    saveExpenses(expenses);
    loadExpenses();
  }