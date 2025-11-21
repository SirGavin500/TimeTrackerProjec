const cardsEl = document.getElementById("cards");
const periodBtns = document.querySelectorAll("[data-period]");
let activities = [];

async function fetchData() {
  const res = await fetch("data.json");
  activities = await res.json();
  displayCards("weekly");
}

function displayCards(period) {
  cardsEl.innerHTML = "";

  activities.forEach((act) => {
    const { title, timeframes } = act;
    const current = timeframes[period].current;
    const previous = timeframes[period].previous;

    const prevText =
      period === "daily"
        ? "Yesterday"
        : period === "weekly"
        ? "Last Week"
        : "Last Month";

    const card = document.createElement("div");
    card.className = `card ${title.toLowerCase().replace(" ", "-")}`;

    card.innerHTML = `
      <div class="card-top"></div>
      <div class="card-content">
        <div class="card-header">
          <h3>${title}</h3>
          <img src="images/icon-ellipsis.svg" alt="menu">
        </div>
        <div class="hours">
          <p class="current-hours">${current}hrs</p>
          <p class="previous-hours">${prevText} - ${previous}hrs</p>
        </div>
      </div>
    `;
    cardsEl.appendChild(card);
  });
}

periodBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    periodBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    displayCards(btn.dataset.period);
  });
});

fetchData();
