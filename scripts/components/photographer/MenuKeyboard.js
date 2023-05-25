class MenuKeyboard {
  constructor() {
    this.drop = document.querySelector(".photographer-menu-option-drop");
    this.hidden = document.querySelector(".photographer-menu-options-hidden");
    this.un = document.querySelector(".photographer-menu-option-un");
    this.deux = document.querySelector(".photographer-menu-option-deux");
    this.trois = document.querySelector(".photographer-menu-option-trois");
    this.isDown = false;
    this.initialIndexButton = 6;
    this.menuItems = document.querySelectorAll(".menu-item");
    this.currentIndex = 0;
    this.currentIndexMenu = 0;
    this.isDownMenu = false;
    this.handleMenuKeyDownBound = this.handleMenuKeyDown.bind(this);
  }

  openMenuKeyboard() {
    this.isDownMenu = true;
    this.focusMenuItem();
  }

  closeMenuKeyboard() {
    this.isDownMenu = false;
    this.drop.focus();
  }

  toggleMenuKeyboard() {
    if (!this.isDownMenu) {
      this.setupEventListenersMenu();
      this.openMenuKeyboard();
    } else {
      this.removeEventListenersMenu();
      this.closeMenuKeyboard();
    }
  }

  setupEventListenersMenu() {
    const handleMenuKeyDownBound = this.handleMenuKeyDownBound;
    this.menuItems.forEach((item) => {
      item.addEventListener("keydown", handleMenuKeyDownBound);
    });
  }

  removeEventListenersMenu() {
    const handleMenuKeyDownBound = this.handleMenuKeyDownBound;
    this.menuItems.forEach((item) => {
      item.removeEventListener("keydown", handleMenuKeyDownBound);
      item.removeAttribute("tabindex");
    });
  }

  handleMenuKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.navigateDownMenu();
      event.stopPropagation();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.navigateUpMenu();
      event.stopPropagation();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      event.stopPropagation();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      this.navigateRightMenu();
      event.stopPropagation();
    } else if (event.key === "Enter") {
      event.preventDefault();
      event.target.click();
      this.toggleMenuKeyboard();
      }
  }

  navigateDownMenu() {
    this.currentIndexMenu = (this.currentIndexMenu + 1) % this.menuItems.length;
    this.focusMenuItem();
  }

  navigateUpMenu() {
    this.currentIndexMenu = (this.currentIndexMenu - 1 + this.menuItems.length) % this.menuItems.length;
    this.focusMenuItem();
  }

  navigateRightMenu() {
     this.drop.focus(); 
  }

  focusMenuItem() {
    this.menuItems.forEach((item, index) => {
      if (index === this.currentIndexMenu) {
        item.classList.add("focused");
        item.setAttribute("tabindex", "0");
        item.focus();
      } else {
        item.classList.remove("focused");
        item.setAttribute("tabindex", "-1");
      }
    });
  }
}

export { MenuKeyboard };
