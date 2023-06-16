import { PhotographerDataProvider } from "../../api/PhotographerDataProvider.js";
import { getIdFromUrl } from "../../utils/GetIdFromUrl.js";
import { KeyboardNavigationPhotographer } from "../keyboard/KeyboardNavigationPhotographer.js";

/* let previousMediaFilter = null; */

class Lightbox {
  static previousMediaFilter = null;
  constructor(previousCurrentElementIndex) {
    // Initialize class properties
    this.previousCurrentElementIndex = previousCurrentElementIndex;
    this.id = getIdFromUrl();
    this.media = new PhotographerDataProvider();
    this.lightbox = null;
    this.main = document.querySelector("main");
    this.closeButton = null;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyLeft = this.onKeyLeft.bind(this);
    this.onKeyRight = this.onKeyRight.bind(this);
    this.onKeyUpAndDown = this.onKeyUpAndDown.bind(this);
    this.index = null;
    this.medias = null;
    this.name = null;
    this.arrowLeft = null;
    this.arrowRight = null;
    this.mediaIncorporate = null;
    this.previousIndex = null;
    this.mediaFilter = Lightbox.previousMediaFilter;
  }

  setMediaFilter(mediaFilter) {
    Lightbox.previousMediaFilter = mediaFilter;
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
    document.addEventListener("keydown", this.onKeyUpAndDown);
    this.buttonCloseModal();
    this.arrowLeft = this.lightbox.querySelector(".less");
    this.arrowLeft.addEventListener("click", () => {
      this.previousIndex = this.index;
      this.index--;
      this.displayMedia();
    });
    this.arrowRight = this.lightbox.querySelector(".more");
    this.arrowRight.addEventListener("click", () => {
      this.previousIndex = this.index;
      this.index++;
      this.displayMedia();
    });
    setTimeout(() => {
      document.querySelector(".lightbox-media-picture").focus();
    }, 0);
  }
  // Closes the lightbox modal
  close() {
    if (this.lightbox) {
      this.index = 0;
      this.previousIndex = 0;
      this.lightbox.classList.remove("modal--visible");
      document.removeEventListener("keydown", this.onKeyDown);
      document.removeEventListener("keydown", this.onKeyLeft);
      document.removeEventListener("keydown", this.onKeyRight);
      document.removeEventListener("keydown", this.onKeyUpAndDown);
      this.lightbox.parentNode.removeChild(this.lightbox);
      this.KeyboardNavigationPhotographer = new KeyboardNavigationPhotographer(this.previousCurrentElementIndex);
      this.KeyboardNavigationPhotographer.focusElementPhotographer();
    }
  }
  // Handles keyboard input to prevent default
  onKeyUpAndDown(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  }
  // Handles keyboard input to close the lightbox
  onKeyDown(e) {
    if (e.key === " " || e.key === "Enter" || e.key === "Escape" || e.key === "prev") {
      this.close();
    }
  }

  // Handles keyboard input to next media
  onKeyRight(e) {
    if (e.key === "ArrowRight") {
      this.previousIndex = this.index;
      this.index++;
      this.displayMedia();
    }
  }

  // Handles keyboard input to before media
  onKeyLeft(e) {
    if (e.key === "ArrowLeft") {
      this.previousIndex = this.index;
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
    this.previousIndex = this.index;
    this.mediaId = media[0].id;
    const mediaIncorporates = [];
    if (this.mediaFilter !== null) {
      this.index = this.mediaFilter.findIndex((photo) => photo.id === media[0].id);
      this.medias = this.mediaFilter;
    }
    this.medias.forEach((element) => {
      if (element.image === undefined) {
        this.mediaIncorporate = `<div id="c${element.id}" style="display: none"><video src="assets/photos/${this.name}/${element.video}" alt="${element.title}" controls></video><p>${element.title}</p></div>`;
        mediaIncorporates.push(this.mediaIncorporate);
      } else {
        this.mediaIncorporate = `<div id="c${element.id}" style="display: none"><img id="c${element.id}" src="assets/photos/${this.name}/${element.image}" alt="${element.title}"><p>${element.title}</p></div>`;
        mediaIncorporates.push(this.mediaIncorporate);
      }
    });

    const mediaIncorporatesStringHtml = mediaIncorporates.map((element) => element).join("");

    // Creation template lightbox
    const lightboxTemplate = `
          <div class="modal-background contact_modal">    
            <div class="lightbox" role="dialog" tabindex="-1" aria-label="image closeup view">
               <div class="lightbox-media">                
                  <img class="less" role="link" src="assets/images/arrow-left.png" alt="Previous image">               
                  <div class="lightbox-media-picture" tabindex="0">
                    ${mediaIncorporatesStringHtml}                    
                  </div>
                <img class="more" role="link" src="assets/images/arrow-right.png" alt="Next image">
                <img class="lightbox-media-cross" role="button" src="assets/images/cross.png" alt="Close dialog">
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
    document.querySelector(`#c${this.mediaId}`).style.display = "block";
    this.display();
  }

  // Display media
  displayMedia() {
    let divElements = Array.from(document.querySelectorAll(".lightbox-media-picture > div[id]"));
    let ids = divElements.map((div) => div.id);

    if (this.index === -1) {
      this.index = ids.length - 1;
      this.previousIndex = 0;
    } else if (this.index === ids.length) {
      this.index = 0;
      this.previousIndex = ids.length - 1;
    }
    let newElement = ids[this.index];
    let previousElement = ids[this.previousIndex];
    let element = document.querySelector(`#${previousElement}`);
    element.style.display = window.getComputedStyle(element).display === "block" ? "none" : "none";
    document.querySelector(`#${newElement}`).style.display = "block";
    setTimeout(() => {
      document.querySelector(".lightbox-media-picture").focus();
    }, 0);
  }

  // Button to close lighbox
  buttonCloseModal() {
    this.closeButton.addEventListener("click", () => {
      this.main.setAttribute("aria-hidden", "false");
      this.lightbox.setAttribute("aria-hidden", "true");
      this.close();
    });
  }
}
export { Lightbox };
