class Modal {
  constructor(options) {
    this.options = options;
    this.modal = null;
    this.closeButton = null;
    this.form = null;
    this.prenomInput = null;
    this.nomInput = null;
    this.emailInput = null;
    this.messageInput = null;
    this.main = document.querySelector("body");
    this.oldPlaceHolder = null;
    this.onKeyTab = this.onKeyTab.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.buttonDisplayModal = this.buttonDisplayModal.bind(this);
    this.buttonCloseModal = this.buttonCloseModal.bind(this);
    this.onKeyUpAndDownRightLeft = this.onKeyUpAndDownRightLeft.bind(this);
    this.modalElement = null;
    this.modalTabIndex = null;
    this.currentIndexModal = 0;
  }

  display(options) {
    if (!this.modal) {
      this.create(options);
    }
    this.modal.classList.add("modal--visible");
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keydown", this.onKeyUpAndDownRightLeft);
    document.addEventListener("keydown", this.onKeyTab);
    this.modalElement = document.querySelector(".modal");
    this.modalTabIndex = Array.from(this.modalElement.querySelectorAll("[tabindex]"));
    this.closeButton.focus();
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove("modal--visible");
      document.removeEventListener("keydown", this.onKeyDown);
      document.removeEventListener("keydown", this.onKeyTab);
      document.removeEventListener("keydown", this.onKeyUpAndDownRightLeft);
    }
  }

  onKeyTab(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      this.navigateTab();
    }
  }

  navigateTab() {
    this.currentIndexModal = (this.currentIndexModal + 1) % this.modalTabIndex.length;
    if (this.currentIndexModal === this.modalTabIndex.length) {
      this.currentIndexModal = 0;
    }
    this.focusMenuItem();
  }

  focusMenuItem() {
    this.modalTabIndex.forEach((item, index) => {
      if (index === this.currentIndexModal) {
        /* item.classList.add("focused"); */
        item.setAttribute("tabindex", "0");
        item.focus();
      } else {
        /* item.classList.remove("focused"); */
        item.setAttribute("tabindex", "-1");
      }
    });
  }
  onKeyUpAndDownRightLeft(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  onKeyDown(e) {
    if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
      this.close();
    }
  }

  create(options) {
    const modalTemplate = `
    <div class="modal-background contact_modal "tabindex="-1">
    <div class="modal" role="dialog" aria-labelledby="send-message">
        <div class="modal-header">
            <h2 id="send-message">Contactez-moi<br>${options[0].name}</h2>
            <img src="assets/icons/close.svg" alt="Close Contact form" tabindex="0"/>
        </div>
        <form>
            <div>
                <label for="prenom">Prénom</label>
                <input tabindex="-1" type="text" id="prenom" name="prenom" placeholder="Prénom" aria-label="First name" aria-labelledby="prenom">
            </div>
            <div>
                <label for="nom">Nom</label>
                <input tabindex="-1" type="text" id="nom" name="nom" placeholder="Nom" aria-label="Last name" aria-labelledby="nom">
            </div>
            <div>
                <label for="email">Email</label>
                <input tabindex="-1" type="email" id="email" name="email" placeholder="Email" aria-label="Email" aria-labelledby="email">
            </div>
            <div>
                <label for="message">Votre message</label>
                <input tabindex="-1" id="message" name="message" placeholder="Votre message" aria-label="Your message" aria-labelledby="message">
            </div>
            <button tabindex="-1" type="submit" class="contact_button_send" aria-label="Send">Envoyer</button>
        </form>
    </div>
</div>

      `;

    const modalElement = document.createElement("div");
    modalElement.innerHTML = modalTemplate.trim();
    this.modal = modalElement.querySelector(".contact_modal");
    this.closeButton = this.modal.querySelector(".modal-header img");
    this.form = modalElement.querySelector("form");
    this.prenomInput = modalElement.querySelector("#prenom");
    this.nomInput = modalElement.querySelector("#nom");
    this.emailInput = modalElement.querySelector("#email");
    this.messageInput = modalElement.querySelector("#message");

    this.form.addEventListener("submit", this.onSubmit.bind(this));
    this.buttonDisplayModal();

    document.body.appendChild(modalElement.firstChild);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(`Le formulaire a été envoyé avec les données suivantes :
        Prénom : ${this.prenomInput.value}
        Nom : ${this.nomInput.value}
        Email : ${this.emailInput.value}
        Message : ${this.messageInput.value}`);
    this.close();
  }

  buttonDisplayModal(option) {
    const button = document.querySelector(".contact_button");
    button.addEventListener("click", () => {
      this.display(option);
      this.buttonCloseModal();
      this.closeButton.focus();
      this.main.setAttribute("aria-hidden", "true");
      this.modal.setAttribute("aria-hidden", "false");
    });
  }

  buttonCloseModal() {
    const button = document.querySelector(".modal-header img");
    button.addEventListener("click", () => {
      this.main.setAttribute("aria-hidden", "false");
      this.modal.setAttribute("aria-hidden", "true");
      this.close();
    });
  }
}

export { Modal };
