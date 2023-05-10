import { PhotographerDataProvider } from "../../api/PhotographerDataProvider.js";
import { getIdFromUrl } from "../GetIdFromUrl.js";

class Lightbox {
  constructor() {
    // Initialize class properties
    this.id = getIdFromUrl();
    this.media = new PhotographerDataProvider();
    this.lightbox = null;
    this.main = document.querySelector("main");
    this.closeButton = null;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyLeft = this.onKeyLeft.bind(this);
    this.onKeyRight = this.onKeyRight.bind(this);
    this.index = null;
    this.medias = null;
    this.name = null;
    this.arrowLeft = null;
    this.arrowRight = null;
    this.mediaIncorporate = null;

  }

  // Displays the lightbox modal
  display(options) {
    if (!this.lightbox) {
      this.create(options);
    }
    this.lightbox.classList.add("modal--visible");
    this.main.setAttribute("aria-hidden", "true");
    this.lightbox.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keydown", this.onKeyLeft);
    document.addEventListener("keydown", this.onKeyRight);
    this.buttonCloseModal();
    this.arrowLeft = this.lightbox.querySelector(".less");
    this.arrowLeft.addEventListener("click", () => {
      this.index--;
      this.displayMedia();
    });
    this.arrowRight = this.lightbox.querySelector(".more");
    this.arrowRight.addEventListener("click", () => {
      this.index++;
      this.displayMedia();
    });
  }
  // Closes the lightbox modal
  close() {
    if (this.lightbox) {
      this.lightbox.classList.remove("modal--visible");
      document.removeEventListener("keydown", this.onKeyDown);
      this.lightbox.parentNode.removeChild(this.lightbox);
    }
  }
  // Handles keyboard input to close the lightbox
  onKeyDown(e) {
    if (e.key === " " || e.key === "Enter" || e.key === "Escape" || e.key === "prev") {
      console.log("close");
      this.close();
    }
  }

  // Handles keyboard input to next media
  onKeyRight(e) {
    if (e.key === "ArrowRight") {
      this.index++;
      this.displayMedia();
    }
  }

  // Handles keyboard input to before media
  onKeyLeft(e) {
    if (e.key === "ArrowLeft") {
      this.index--;
      this.displayMedia();
    }
  }

  // Creates the lightbox modal
  async create(options) {
    // Retrieve the photographer ID in order to access all of their media
    const media = await this.media.UniqueMedia(options);
    this.name = document.querySelector("h2").textContent.split(" ")[0];
    const photographerId = media[0].photographerId;
    this.medias = await this.media.media(photographerId);

    // Find the index of media to display it
    this.index = this.medias.findIndex((photo) => photo.id === media[0].id);
    if (this.medias[this.index].image === undefined) {
      this.mediaIncorporate = `<video src="assets/photos/${this.name}/${
        this.medias[this.index].video
      }" alt="" controls></video>`;
    } else {
      this.mediaIncorporate = `<img src="assets/photos/${this.name}/${
        this.medias[this.index].image
      }" alt="">`;
    }

    // Creation template lightbox
    const lightboxTemplate = `
          <div class="modal-background contact_modal">    
            <div class="lightbox" role="dialog" aria-label="Galerie d'images et de vidéos" aria-describedby="image-video">
               <div class="lightbox-media">
                <img class="less" src="assets/images/arrow-left.png" alt="">
                  <div class="lightbox-media-picture">
                    ${this.mediaIncorporate}
                    <p>${this.medias[this.index].title}</p>
                  </div>
                <img class="more" src="assets/images/arrow-right.png" alt="">
                <img class="lightbox-media-cross" tabindex="0" src="assets/images/cross.png" alt="">
               </div>
            </div>
          </div>
        `;

    // Integration in the dom
    const lightboxElement = document.createElement("div");
    lightboxElement.innerHTML = lightboxTemplate.trim();
    this.lightbox = lightboxElement.querySelector(".contact_modal");
    document.body.appendChild(lightboxElement.firstChild);
    this.closeButton = document.querySelector(".lightbox-media-cross");
    this.display();
  }

  // Display media
  displayMedia() {
    if (this.index === -1) {
      this.index = this.medias.length - 1;
    } else if (this.index === this.medias.length) {
      this.index = 0;
    }
    if (this.medias[this.index].image === undefined) {
      this.mediaIncorporate = `<video src="assets/photos/${this.name}/${
        this.medias[this.index].video
      }" alt="" controls></video><p>${this.medias[this.index].title}</p>`;
    } else {
      this.mediaIncorporate = `<img src="assets/photos/${this.name}/${
        this.medias[this.index].image
      }" alt=""><p>${this.medias[this.index].title}</p>`;
    }
    const newMedia = document.createElement("div");
    newMedia.classList.add("lightbox-media-picture");
    newMedia.innerHTML = this.mediaIncorporate;    

    const oldMedia = document.querySelector(".lightbox-media-picture");
    const parent = oldMedia.parentNode;

    parent.replaceChild(newMedia, oldMedia);
  }
 
  // Button to close lighbox
  buttonCloseModal() {
    this.closeButton.focus();
    this.closeButton.addEventListener("click", () => {
      this.main.setAttribute("aria-hidden", "false");
      this.lightbox.setAttribute("aria-hidden", "true");
      this.close();
    });
  }
}
export { Lightbox };
