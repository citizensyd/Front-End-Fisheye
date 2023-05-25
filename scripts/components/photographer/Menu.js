import { getIdFromUrl } from "../GetIdFromUrl.js";
import { PhotographerDataProvider } from "../../api/PhotographerDataProvider.js";
import { DisplayPhotographerMedia } from "./DisplayPhotographerMedia.js";
import { KeyboardNavigationPhotographer } from "../../utils/KeyboardNavigationPhotographer.js";

class Menu {
  constructor() {
    this.drop = document.querySelector(".photographer-menu-option-drop");
    this.drop.addEventListener("click", this.toggleMenu.bind(this));
    this.hidden = document.querySelector(".photographer-menu-options-hidden");
    this.un = document.querySelector(".photographer-menu-option-un");
    this.un.addEventListener("click", this.changeMenu.bind(this));
    this.deux = document.querySelector(".photographer-menu-option-deux");
    this.deux.addEventListener("click", this.changeMenu.bind(this));
    this.trois = document.querySelector(".photographer-menu-option-trois");
    this.trois.addEventListener("click", this.changeMenu.bind(this));
    this.isDown = false;
    this.id = getIdFromUrl();
    this.photographerDataProvider = new PhotographerDataProvider;
    this.mediaPhotographer = null;
    this.photographerMedia;
    this.eventTargetTextContent = null;
    this.DisplayPhotographerMedia = new DisplayPhotographerMedia();
    this.initialIndexButton = 6;
    this.keyboardNavigationPhotographer = new KeyboardNavigationPhotographer;
  }

  openMenu() {
    this.drop.setAttribute("aria-expanded", "true");
    this.drop.classList.add("rotate");
    this.hidden.classList.add("down");
    this.hidden.classList.remove("up");
    this.isDown = true;
  }

  closeMenu() {
    this.drop.setAttribute("aria-expanded", "false");
    this.drop.classList.remove("rotate");
    this.hidden.classList.remove("down");
    this.hidden.classList.add("up");
    this.isDown = false;
  }

  toggleMenu() {
    if (!this.isDown) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  changeMenu(event) {
    this.eventTargetTextContent = event.target.textContent;
    if (this.eventTargetTextContent !== this.un.textContent) {
      const textUn = this.un.textContent;
      this.un.textContent = this.eventTargetTextContent;
      event.target.textContent = textUn;
      this.toggleMenu();
    }
    this.getMediaPhotographer();
  }

  async getMediaPhotographer() {
    this.keyboardNavigationPhotographer.updateElements();
    this.mediaPhotographer = await this.photographerDataProvider.media(this.id);
    if (this.un.textContent == "Popularité") {
      this.sortByPopularity();
    }
    if (this.un.textContent == "Date") {
      this.sortByDate();
    }
    if (this.un.textContent == "Titre") {
      this.sortByName();
    }
  }

  sortByName() {
    this.mediaPhotographer.sort((a, b) => {
      let titleA = a.title.toUpperCase();
      let titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    this.DisplayPhotographerMedia.displayNewPhotographerMediaById(this.mediaPhotographer);
  }

  sortByPopularity() {
    this.mediaPhotographer.sort((a, b) => {
      return b.likes - a.likes;
    });
    this.DisplayPhotographerMedia.displayNewPhotographerMediaById(this.mediaPhotographer);
  }

  sortByDate() {
    this.mediaPhotographer.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    });
    this.DisplayPhotographerMedia.displayNewPhotographerMediaById(this.mediaPhotographer);
  }
}

export { Menu };
