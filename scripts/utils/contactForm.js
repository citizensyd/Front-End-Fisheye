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
    this.main = document.querySelector("main");

    this.onKeyDown = this.onKeyDown.bind(this); 
    this.buttonDisplayModal = this.buttonDisplayModal.bind(this);
    this.buttonCloseModal = this.buttonCloseModal.bind(this);
  }

  display(options) {
    if (!this.modal) {
      this.create(options);
    }
    this.modal.classList.add("modal--visible");
    document.addEventListener("keydown", this.onKeyDown);
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove("modal--visible");
      document.removeEventListener("keydown", this.onKeyDown);
    }
  }

  onKeyDown(e) {
    if (e.key === " "|| e.key === "Enter" || e.key === "Escape") {
      this.close();
    }
  }

  create(options) {
    const modalTemplate = `
        <div class="modal-background contact_modal">    
            <div class="modal" role="dialog" aria-describedby="send-message">
                <div class="modal-header">
                    <h2>Contactez-moi<br>${options[0].name}</h2>
                    <img  src="assets/icons/close.svg" tabindex="0"/>
                </div>
                <form>
                    <div>
                        <label for="prenom">Prénom</label>
                        <input type="text" id="prenom" name="prenom" />
                    </div>
                    <div>
                        <label for="nom">Nom</label>
                        <input type="text" id="nom" name="nom" />
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div>
                        <label for="message">Votre message</label>
                        <input id="message" name="message"></input>
                    </div>
                    <button type="submit" class="contact_button_send">Envoyer</button>
                </form>
            </div>
        </div>
      `;

    const modalElement = document.createElement("div");
    modalElement.innerHTML = modalTemplate.trim();
    this.modal = modalElement.querySelector(".contact_modal");
    console.log(this.modal);
    this.closeButton = this.modal.querySelector(".modal-header img");
    this.form = modalElement.querySelector("form");
    this.prenomInput = modalElement.querySelector("#prenom");
    this.nomInput = modalElement.querySelector("#nom");
    this.emailInput = modalElement.querySelector("#email");
    this.messageInput = modalElement.querySelector("#message");

    this.form.addEventListener("submit", this.onSubmit.bind(this));
    this.buttonDisplayModal();

    document.body.appendChild(modalElement.firstChild);
    console.log(this.closeButton);
    
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
      this.main.setAttribute('aria-hidden', 'true');
      this.modal.setAttribute('aria-hidden', 'false');
    });
  }

  buttonCloseModal() {
    const button = document.querySelector(".modal-header img");
    button.addEventListener("click", () => {
        this.main.setAttribute('aria-hidden', 'false');
        this.modal.setAttribute('aria-hidden', 'true');
      this.close();
    });
  }
}

export { Modal };
