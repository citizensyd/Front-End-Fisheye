class KeyboardNavigationPhotographer {
  constructor(previousCurrentElementIndex) {
    this.elements = Array.from(document.querySelectorAll("[tabindex]"));
    this.currentIndex = 0;
    this.currentElementIndex = -1;
    this.returnPreviousCurrentElementIndex = previousCurrentElementIndex;
    this.element = null;
  }

  setupEventListeners() {
    this.elements.forEach((item) => {
        item.addEventListener("keydown", (event) => {
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
            event.target.querySelector(".photographer-media-likes-heart")?.click();
            event.target.querySelector("img")?.click();
            event.stopPropagation();
          }
        });
      });
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
      this.element.focus(this.element);
      this.currentElementIndex = this.returnPreviousCurrentElementIndex - 1;
      this.returnPreviousCurrentElementIndex = null;
    } else {
      this.element = this.elements[this.currentElementIndex];
      this.element.focus(this.element);
    }
  }
}
export { KeyboardNavigationPhotographer };
