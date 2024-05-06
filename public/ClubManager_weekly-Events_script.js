let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replacing the icons class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); // replacing the icons class
    }
}

/* ============================ */

var box = document.getElementById('box');
var down = false;

function toggleNotifi() {
    if (down) {
        box.style.height = '0px';
        box.style.opacity = 0;
        down = false;
    } else {
        box.style.height = '510px';
        box.style.opacity = 1;
        down = true;
    }
}

/* ============================ */

const selectBtn = document.querySelector(".select-btn"),
    items = document.querySelectorAll(".item");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
});
items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");

        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btn-text");

        if (checked && checked.length > 0) {
            btnText.innerText = `${checked.length} selected`;
        } else {
            btnText.innerText = "select";
        }
    });
});

/* ============================ */

// Fetch and display events
document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
});

function fetchEvents() {
    fetch('/api/Event/getAllEvents')
    .then(response => response.json())
    .then(events => {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = ''; // Clear existing entries
        events.forEach(event => {
            const eventCard = createEventCard(event);
            gallery.appendChild(eventCard);
        });
    })
    .catch(error => console.error('Error fetching events:', error));
}

function createEventCard(event) {
    const link = document.createElement('a');
    link.href = "ClubManager_Event_details.html"; // Link to event details
    link.id = "event-card-link";

    const eventCard = document.createElement('div');
    eventCard.className = 'eventCard';
    eventCard.style.backgroundImage = `url(${event.eventImage})`;

    const dateBlock = document.createElement('div');
    dateBlock.className = 'dateBlock';
    const day = document.createElement('p');
    day.className = 'day';
    day.innerHTML = `<span id="event-day">${new Date(event.eventDate).getDate()}</span>th`;
    const month = document.createElement('p');
    month.className = 'month';
    month.textContent = new Date(event.eventDate).toLocaleString('default', { month: 'short' });
    const year = document.createElement('p');
    year.className = 'year';
    year.textContent = new Date(event.eventDate).getFullYear();

    dateBlock.appendChild(day);
    dateBlock.appendChild(month);
    dateBlock.appendChild(year);

    const titleBlock = document.createElement('div');
    titleBlock.className = 'titleBlock';
    const eventName = document.createElement('h3');
    eventName.id = 'event-name';
    eventName.textContent = event.eventName;

    titleBlock.appendChild(eventName);

    const locationBlock = document.createElement('div');
    locationBlock.className = 'locationBlock';
    const location = document.createElement('p');
    location.className = 'location';
    location.innerHTML = `Location: <span id="event-location">${event.eventPlace}</span>`;
    const time = document.createElement('p');
    time.className = 'time';
    time.innerHTML = `Time: <span id="event-time">${event.eventTime}</span>`;

    locationBlock.appendChild(location);
    locationBlock.appendChild(time);

    eventCard.appendChild(dateBlock);
    eventCard.appendChild(titleBlock);
    link.appendChild(eventCard);
    link.appendChild(locationBlock);

    return link;
}
