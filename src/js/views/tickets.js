import currencyUI from "./currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-sections .row");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }
  renderTickets(tickets) {
    console.log(tickets);
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";

    const currency = this.getCurrencySymbol();

    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }
  clearContainer() {
    this.container.innerHTML = "";
  }

  emptyField() {
    const template = TicketsUI.emptyField();

    this.container.insertAdjacentHTML("afterbegin", template);

    const closeBtn = document.querySelector(".close-modal");
    const modalError = document.querySelector(".empty-field");
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modalError.remove();
    });

    setTimeout(() => {
      modalError.remove();
    }, 1500);

    return;
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
    const msg = document.querySelector(".msg");
    console.log(msg);

    setTimeout(() => {
      msg.remove();
    }, 1000);
  }

  static emptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg msg">По вашему запросу билетов не найдено.</div>
    `;
  }

  static emptyField() {
    return `
      <div class='empty-field'>
        <a href='#' class='close-modal'>Close</a>
        <p>All fields must be filled!</p>
      </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
			  <div class="col s12 m6 ">
          <div class="card ticket-card">
            <div class="ticket-airline d-flex align-items-center">
              <img src="${ticket.airline_logo}" class="ticket-airline-img" />
              <span class="ticket-airline-name">${ticket.airline_name}</span>
            </div>
            <div class="ticket-destination d-flex align-items-center">
              <div class="d-flex align-items-center mr-auto">
                <span class="ticket-city">${ticket.origin_name}</span>
                <i class="medium material-icons">flight_takeoff</i>
              </div>
              <div class="d-flex align-items-center">
                <i class="medium material-icons">flight_land</i>
                <span class="ticket-city">${ticket.destination_name}</span>
              </div>
            </div>
            <div class="ticket-time-price d-flex align-items-center">
              <span class="ticket-time-departure">${ticket.departure_at}</span></span>
              <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
            </div>
            <div class="ticket-additional-info">
              <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
              <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
            </div>
          </div>
        </div>
		`;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
