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
    this.menuElementEventTarget = null;
    this.currentIndex = 0;
    this.currentIndexMenu = 0;
    this.isDownMenu = false;
    this.setupListenerOpenMenu();
    this.handleMenuKeyDownBound = this.handleMenuKeyDown.bind(this);
  }

  setupListenerOpenMenu() {
    this.drop.addEventListener("keydown", (event) => {
      this.menuElementEventTarget = event.target;
      if (event.key === "Enter") {
        event.target.click();
        this.toggleMenuKeyboard();
        event.stopPropagation();
      }
    });
  }

  openMenuKeyboard() {
    this.activateMenuItem();
    this.isDownMenu = true;
  }

  closeMenuKeyboard() {
    this.drop.setAttribute("tabindex", this.initialIndexButton);
    this.un.removeAttribute("tabindex");
    this.deux.removeAttribute("tabindex");
    this.trois.removeAttribute("tabindex");
    this.isDownMenu = false;
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
    console.log("removeEventListenersMenu");
    const handleMenuKeyDownBound = this.handleMenuKeyDownBound;
    this.menuItems.forEach((item) => {
      console.log(item);

      item.removeEventListener("keydown", handleMenuKeyDownBound);
    });
  }

  handleMenuKeyDown(event) {
    this.menuElementEventTarget = event.target;
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
      if (event.target.className === "photographer-menu-option-un menu-item focused") {
        this.navigateRightMenu();
      }
      event.stopPropagation();
    } else if (event.key === "Enter") {
      event.preventDefault();
      event.target.click();
      event.stopPropagation();
    }
  }

  activateMenuItem() {
    //this.menuItem = this.menuItems[this.currentIndex];
    console.log(this.menuElementEventTarget.tagName);
    if (this.menuElementEventTarget.tagName === "IMG") {
      //this.menuItem = this.menuItems[this.currentIndexMenu + 1];
      this.focusMenuItem();
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
    console.log(this.menuItems);
    console.log(this.currentIndexMenu);
    this.menuItems.forEach((item, index) => {
      if (index === this.currentIndexMenu) {
        item.classList.add("focused");
        item.setAttribute("tabindex", "0");
        console.log(item);
        item.focus();
      } else {
        item.classList.remove("focused");
        item.setAttribute("tabindex", "-1");
      }
    });
  }
}

export { MenuKeyboard };

/*   buttonManager() {
    console.log(this.menu);
    this.button = document.querySelector("#photographer-menu-button");
    let initialIndexButton = this.button.tabindex;
    console.log(initialIndexButton);
    this.button.addEventListener("click", () => {
      if (this.button.getAttribute("aria-expanded") === "true") {
        this.closeMenu();
      } else {
        this.menu.openMenu();
      }
    });
  } */
