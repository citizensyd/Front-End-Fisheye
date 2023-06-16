import { MenuKeyboard } from "./MenuKeyboard.js";
class KeyboardNavigationPhotographer {
  constructor(previousCurrentElementIndex) {
    this.drop = document.querySelector(".photographer-menu-option-drop");
    this.spanLikeHeart = Array.from(document.querySelectorAll(".photographer-media-likes-heart"));
    this.elements = Array.from(document.querySelectorAll("[tabindex]"));
    this.currentIndex = 0;
    this.currentElementIndex = -1;
    this.returnPreviousCurrentElementIndex = previousCurrentElementIndex;
    this.element = null;
    this.menuKeyboard = new MenuKeyboard();
    this.handleKeyDownBind = this.handleKeyDown.bind(this);
  }

  updateElements() {
    this.elements = Array.from(document.querySelectorAll("[tabindex]"));
  }

  setupEventListeners() {
    this.elements.forEach((item) => {
      item.addEventListener("keydown", this.handleKeyDownBind);
    });
  }  

  removeEventListeners() {
    this.elements.forEach((item) => {
      item.removeEventListener("keydown", this.handleKeyDownBind);
    });
  }

  handleKeyDown = (event) =>{
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.navigateUp();
      event.stopPropagation();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      this.navigateDown();
      event.stopPropagation();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.navigateLeftPhotographer();
      event.stopPropagation();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      this.navigateRightPhotographer();
      event.stopPropagation();
    } else if (event.key === "Enter") {
      event.preventDefault();
      event.target.tagName === "BUTTON" ? event.target.click() : null;
      event.target.tagName === "A" ? event.target.click() : null;      
      if (event.target === this.drop) {
        event.target.click();
        this.menuKeyboard.toggleMenuKeyboard();
        event.stopPropagation();
      } else if (this.spanLikeHeart.some(element => element === event.target)) {
        event.target.click();
        event.stopPropagation();
      } else if (event.target.querySelector(".photographer-media-image")) {
        event.target.querySelector("img, video")?.click();
        event.stopPropagation();
      }
    }
  }

  navigateDown() {
    if (this.returnPreviousCurrentElementIndex !== undefined && this.returnPreviousCurrentElementIndex !== null) {
      this.currentElementIndex = this.previousCurrentElementIndex;
    } else if (this.currentElementIndex === 1 || this.currentElementIndex === 2 || this.currentElementIndex === 3) {
      this.currentElementIndex = 3;
    } else if (this.currentElementIndex <= this.elements.length && this.currentElementIndex >= 7) {
      (this.currentElementIndex += 5) % this.elements.length;
    }
    this.currentElementIndex = (this.currentElementIndex + 1) % this.elements.length;
    this.focusElementPhotographer();
  }

  navigateUp() {
    if (this.returnPreviousCurrentElementIndex !== undefined && this.returnPreviousCurrentElementIndex !== null) {
      this.currentElementIndex = this.previousCurrentElementIndex;
    } else if (this.currentElementIndex === 3 || this.currentElementIndex === 2) {
      this.currentElementIndex = 1;
    } else if (this.currentElementIndex === 4) {
      this.currentElementIndex = 2;
    } else if (this.currentElementIndex <= this.elements.length && this.currentElementIndex >= 7) {
      (this.currentElementIndex -= 5) % this.elements.length;
      if (this.currentElementIndex < 6) {
        this.currentElementIndex = 5;
      }
    }
    this.currentElementIndex = (this.currentElementIndex - 1) % this.elements.length;
    this.focusElementPhotographer();
  }

  navigateRightPhotographer() {
    if (this.returnPreviousCurrentElementIndex !== undefined && this.returnPreviousCurrentElementIndex !== null) {
      this.currentElementIndex = this.previousCurrentElementIndex;
    } else {
      this.currentElementIndex = (this.currentElementIndex + 1) % this.elements.length;
    }
    this.focusElementPhotographer();
  }

  navigateLeftPhotographer() {
    if (this.returnPreviousCurrentElementIndex !== undefined && this.returnPreviousCurrentElementIndex !== null) {
      this.currentElementIndex = this.previousCurrentElementIndex;
    } else {
      this.currentElementIndex = (this.currentElementIndex - 1 + this.elements.length) % this.elements.length;
    }
    this.focusElementPhotographer();
  }

  focusElementPhotographer() {
    if (this.returnPreviousCurrentElementIndex !== undefined && this.returnPreviousCurrentElementIndex !== null) {
      this.element = this.elements[this.returnPreviousCurrentElementIndex - 1];
      this.element.focus();
      this.currentElementIndex = this.returnPreviousCurrentElementIndex - 1;
      this.returnPreviousCurrentElementIndex = null;
    } else {
      this.updateElements();
      this.element = this.elements[this.currentElementIndex];
      this.element.focus();
    }
  }
}
export { KeyboardNavigationPhotographer };
