const currentDate = document.getElementById("current-date");
const date = new Date().toLocaleDateString();
currentDate.innerHTML = date;

const registrationForm = document.getElementById("registration-form");
const firstName = document.getElementsByName("first-name")[0];
const lastName = document.getElementsByName("last-name")[0];
const email = document.getElementsByName("email")[0];
const registrationList = document.getElementById("registration-list");
let registrationData = [];
let idCounter = localStorage.getItem("idCounter") || 1;

function validateForm() {
    let hasErrors = false;
    let firstNameErrorDiv = document.getElementById("first-name-error");
    let lastNameErrorDiv = document.getElementById("last-name-error");
    let emailErrorDiv = document.getElementById("email-error");
    if (firstNameErrorDiv) {
        firstName.parentNode.removeChild(firstNameErrorDiv);
    }
    if (lastNameErrorDiv) {
        lastName.parentNode.removeChild(lastNameErrorDiv);
    }
    if (emailErrorDiv) {
        email.parentNode.removeChild(emailErrorDiv);
    }
    if (firstName.value === "") {
        firstNameErrorDiv = document.createElement("div");
        firstNameErrorDiv.id = "first-name-error";
        firstNameErrorDiv.innerHTML = "Preencha este campo";
        firstName.parentNode.insertBefore(firstNameErrorDiv, firstName.nextSibling);
        hasErrors = true;
    }
    if (lastName.value === "") {
        lastNameErrorDiv = document.createElement("div");
        lastNameErrorDiv.id = "last-name-error";
        lastNameErrorDiv.innerHTML = "Preencha este campo";
        lastName.parentNode.insertBefore(lastNameErrorDiv, lastName.nextSibling);
        hasErrors = true;
    }
    if (email.value === "") {
        emailErrorDiv = document.createElement("div");
        emailErrorDiv.id = "email-error";
        emailErrorDiv.innerHTML = "Preencha este campo";
        email.parentNode.insertBefore(emailErrorDiv, email.nextSibling);
        hasErrors = true;
    } else if (!email.value.includes("@")) {
        emailErrorDiv = document.createElement("div");
        emailErrorDiv.id = "email-error";
        emailErrorDiv.innerHTML = "O e-mail deve ser um endereço válido (a@b.c)";
        email.parentNode.insertBefore(emailErrorDiv, email.nextSibling);
        hasErrors = true;
    }
    if (!hasErrors) {
        // Collect form data
        const newData = {
            id: idCounter++,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value
        }
        registrationData.push(newData);

        // stringify the json data and save it to localStorage
        localStorage.setItem("registrationData", JSON.stringify(registrationData));
        localStorage.setItem("idCounter", idCounter);

        // Display the new registration in the list
        const registrationListItem = document.createElement("div");
        registrationListItem.classList.add("registration-item");
        registrationListItem.innerHTML = `
            <span>ID: ${newData.id} Nome: ${newData.firstName} ${newData.lastName} E-mail: ${newData.email}</span>
            <button data-id=${newData.id} class="delete-button">Excluir</button>`;
        registrationList.appendChild(registrationListItem);

        // Clear the form
        registrationForm.reset();
    }
    return !hasErrors;
}

// Add event listener for delete button
registrationList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        const idToDelete = e.target.getAttribute("data-id");
        // Remove from registrationData array
        registrationData = registrationData.filter(data => data.id != idToDelete);
        // stringify the json data and save it to localStorage
        localStorage.setItem("registrationData", JSON.stringify(registrationData));
        // Remove from the list on the page
        e.target.parentNode.remove();
    }
});

// on page load check for existing data in localStorage and load it
const existingData = JSON.parse(localStorage.getItem("registrationData"));
if (existingData) {
    registrationData = existingData;
    existingData.forEach(registration => {
        const registrationListItem = document.createElement("div");
        registrationListItem.classList.add("registration-item");
        registrationListItem.innerHTML = `
            <span>ID: ${registration.id} <br> Nome: ${registration.firstName} ${registration.lastName} <br> E-mail: ${registration.email}</span>
            <button data-id=${registration.id} class="delete-button">Excluir</button>
        `;
        registrationList.appendChild(registrationListItem);
    });
}
