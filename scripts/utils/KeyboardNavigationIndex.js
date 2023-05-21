class KeyboardNavigationIndex {
  constructor() {
    this.elements = Array.from(document.querySelectorAll("[tabindex]"));
    this.currentElementIndex = -1;
  }

  setupEventListeners() {
    console.log("setupEventListenersIndexPage");
    this.elements.forEach((item) => {
      item.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          this.navigateUp();
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          this.navigateDown();
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          this.navigateLeft();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          this.navigateRight();
        } else if (event.key === "Enter") {
          event.preventDefault();
          event.target.querySelector("img")?.click();
        }
      });
    });
  }

  navigateLeft() {
    this.currentElementIndex = (this.currentElementIndex - 1 + this.elements.length) % this.elements.length;
    this.focusElement();
  }

  navigateRight() {
    this.currentElementIndex = (this.currentElementIndex + 1) % this.elements.length;
    this.focusElement();
  }

  navigateUp() {
    if (this.currentElementIndex >= 3 && this.currentElementIndex <= 7) {
      this.currentElementIndex -= 3;
    } else if (this.currentElementIndex === 2) {
      this.currentElementIndex -= 2;
    }
    this.focusElement();
  }
  navigateDown() {
    if (this.currentElementIndex >= 1 && this.currentElementIndex <= 4) {
      this.currentElementIndex += 3;
    } else if (this.currentElementIndex === 0) {
      this.currentElementIndex += 2;
    }
    this.focusElement();
  }

  focusElement() {
    console.log("focusElementindex");
    const element = this.elements[this.currentElementIndex];
    element.focus(element);
  }
}


export { KeyboardNavigationIndex };
