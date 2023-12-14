let flights = [];
let sortConfig = {
    column: 'number',
    order: 'asc'
};

document.addEventListener('DOMContentLoaded', function () {
    const storedFlights = localStorage.getItem('flights');
    if (storedFlights) {
        flights = JSON.parse(storedFlights);
        toggleTable('departure');
        toggleTable('arrival');
    }
});

function toggleTable(type) {
    const table = document.getElementById(`${type}-list`);
    table.innerHTML = "";

    if (type === 'departure') {
        displayFlights(flights.filter(flight => flight.type === 'departure'), table);
    } else {
        displayFlights(flights.filter(flight => flight.type === 'arrival'), table);
    }
}

function displayFlights(flightsList, table) {
    const sortInfoRow = table.insertRow();
    const sortInfoCell = sortInfoRow.insertCell();
    sortInfoCell.colSpan = 6; // Розтягуємо через всі стовпці
    sortInfoCell.style.fontStyle = 'italic';

    const sortDirection = sortConfig.order === 'asc' ? '↑' : '↓';
    sortInfoCell.textContent = `Сортування за ${sortConfig.column} ${sortDirection}`;

    if (flightsList.length > 0) {
        // Додавання рядка з заголовками стовпців
        const headerRow = table.insertRow();
        createHeaderCell(headerRow, 'Номер рейсу', 'number');
        createHeaderCell(headerRow, 'Місце призначення', 'destination');
        createHeaderCell(headerRow, 'Місце відправлення', 'dispatches');
        createHeaderCell(headerRow, 'Час відправлення', 'departureTime');
        createHeaderCell(headerRow, 'Час прибуття', 'arrivalTime');
        createHeaderCell(headerRow, '', ''); // Порожній стовпець для кнопки "Видалити"

        // Сортування даних перед виведенням у таблицю
        flightsList = sortFlights(flightsList, sortConfig.column, sortConfig.order);

        flightsList.forEach((flight, index) => {
            const row = table.insertRow();
            row.insertCell(0).textContent = flight.number;
            row.insertCell(1).textContent = flight.destination;
            row.insertCell(2).textContent = flight.dispatches;
            row.insertCell(3).textContent = new Date(flight.departureTime).toLocaleString();
            row.insertCell(4).textContent = new Date(flight.arrivalTime).toLocaleString();

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Видалити';
            deleteButton.addEventListener('click', () => deleteFlight(index));
            row.insertCell(5).appendChild(deleteButton);
        });
    } else {
        // Інша логіка, якщо список порожній
    }
}

function createHeaderCell(row, text, columnName) {
    const cell = row.insertCell();
    const headerText = document.createTextNode(text);
    cell.appendChild(headerText);

    cell.addEventListener('click', () => sortTable(columnName));
}

function sortTable(column) {
    if (sortConfig.column === column) {
        // Зміна порядку сортування, якщо той самий стовпець
        sortConfig.order = sortConfig.order === 'asc' ? 'desc' : 'asc';
    } else {
        // Зміна стовпця сортування та порядку сортування
        sortConfig.column = column;
        sortConfig.order = 'asc';
    }

    toggleTable('departure');
    toggleTable('arrival');
}

function sortFlights(data, column, order) {
    return data.sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];

        if (order === 'asc') {
            return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
        } else {
            return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
        }
    });
}


function addFlight() {
    const flightNumber = document.getElementById('flight-number').value;
    const destination = document.getElementById('destination').value;
    const dispatches = document.getElementById('dispatches').value;
    const departureTime = document.getElementById('departure-time').value;
    const arrivalTime = document.getElementById('arrival-time').value;
    const type = document.getElementById('flight-type').value;

    const flight = {
        number: flightNumber,
        destination: destination,
        dispatches: dispatches,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        type: type,
    };

    flights.push(flight);

    localStorage.setItem('flights', JSON.stringify(flights));

    document.getElementById('flight-number').value = '';
    document.getElementById('destination').value = '';
    document.getElementById('dispatches').value = '';
    document.getElementById('departure-time').value = '';
    document.getElementById('arrival-time').value = '';
    document.getElementById('flight-type').value = 'departure';

    toggleTable('departure');
    toggleTable('arrival');
}

function deleteFlight(index) {
    flights.splice(index, 1);
    localStorage.setItem('flights', JSON.stringify(flights));
    toggleTable('departure');
    toggleTable('arrival');
}
function toggleVisibility(type) {
    const table = document.getElementById(`${type}-list`);
    table.style.display = table.style.display === 'none' ? 'table' : 'none';
}

// Попередній код

function scrollToForm() {
    const addFlightForm = document.getElementById('add-flight-form');
    addFlightForm.scrollIntoView({ behavior: 'smooth' });
}

// Попередній код
