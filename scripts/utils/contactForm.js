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
      
  
      this.buttonDisplayModal = this.buttonDisplayModal.bind(this);
      this.buttonCloseModal = this.buttonCloseModal.bind(this);
    }
  
    display(options) {
      if (!this.modal) {
        this.create(options);
      }
      this.modal.classList.add("modal--visible");
    }
  
    close() {
      if (this.modal) {
        this.modal.classList.remove("modal--visible");
      }
    }
  
    create(options) {
      const modalTemplate = `
        <div class="modal-background contact_modal">    
            <div class="modal" role="dialog" aria-describedby="send-message">
                <div class="modal-header">
                    <h2>Contactez-moi<br>${options[0].name}</h2>
                    <img src="assets/icons/close.svg"/>
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
      this.closeButton = modalElement.querySelector(".modal-close-button");
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
      });
    }
  
    buttonCloseModal() {
      const button = document.querySelector(".modal-header img");
      button.addEventListener("click", () => {
        this.close();
      });
    }
  }
  
  export { Modal };
  