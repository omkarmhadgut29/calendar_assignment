const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const dateInput = document.getElementById("date");
const calendarBody = document.getElementById("calendar-body");

// Populate the year dropdown with the current year and the next two years
const currentYear = new Date().getFullYear();
for (let i = currentYear; i <= currentYear + 2; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}

// Initialize the calendar
let selectedDate = new Date();
monthSelect.value = selectedDate.getMonth();
yearSelect.value = selectedDate.getFullYear();
generateCalendar(selectedDate);

monthSelect.addEventListener("change", updateCalendar);
yearSelect.addEventListener("change", updateCalendar);

function updateCalendar() {
    const selectedMonth = parseInt(monthSelect.value);
    const selectedYear = parseInt(yearSelect.value);
    selectedDate = new Date(selectedYear, selectedMonth, 1);
    generateCalendar(selectedDate);
}

function generateCalendar(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 3);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    calendarBody.innerHTML = "";

    let weekRow = document.createElement("tr");

    for (let i = 0; i < firstDay.getDay(); i++) {
        const blankCell = document.createElement("td");
        weekRow.appendChild(blankCell);
    }

    let currentDay = new Date(firstDay);

    while (currentDay <= lastDay) {
        const cell = document.createElement("td");
        cell.textContent = currentDay.getDate();
        cell.setAttribute(
            "data-date",
            `${currentDay.getDate()} ${currentDay.getMonth()} ${currentDay.getFullYear()}`
        );
        weekRow.appendChild(cell);

        if (
            currentDay.getDay() === 6 ||
            currentDay.getTime() === lastDay.getTime()
        ) {
            calendarBody.appendChild(weekRow);
            weekRow = document.createElement("tr"); // Start a new row
        }

        currentDay.setDate(currentDay.getDate() + 1);
    }
}

function toggleCellColor(event, input = null) {
    const cell = event.target;
    let date;
    if (input) {
        date = input;
    } else {
        date = cell.getAttribute("data-date");
    }
    // const storedColor = localStorage.getItem(date);
    // if (storedColor === "green") {
    if (cell.classList.contains("green-bg")) {
        cell.classList.remove("green-bg");
        // localStorage.setItem(date, "white");
    } else {
        cell.classList.add("green-bg");
        // localStorage.setItem(date, "green");
    }
}

function processDate() {
    const enteredDate = parseInt(dateInput.value);
    if (enteredDate >= 1 && enteredDate <= 31) {
        const cell = calendarBody.querySelector(
            `[data-date="${enteredDate} ${selectedDate.getMonth()} ${selectedDate.getFullYear()}"]`
        );
        if (cell) {
            toggleCellColor({ target: cell });
        } else {
            alert("Selected date is not in the current month.");
        }
    } else {
        alert("Please enter a valid date (1-31).");
    }
}
