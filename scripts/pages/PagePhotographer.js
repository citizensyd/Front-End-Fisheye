import { getIdFromUrl } from "../components/GetIdFromUrl.js";
import { displayPhotographerHeader } from "../components/photographer/DisplayPhotographerHeader.js";
import { DisplayPhotographerPriceElement } from "../components/photographer/DisplayPhotographerPriceElement.js";
import { DisplayPhotographerMedia } from "../components/photographer/DisplayPhotographerMedia.js";
import { PhotographerDataProvider } from "../api/PhotographerDataProvider.js";
import { Modal } from "../utils/contactForm.js";
import { Lightbox } from "../components/photographer/DisplayLightbox.js";
import { Menu } from "../components/photographer/Menu.js";
import { KeyboardNavigationPhotographer } from "../utils/KeyboardNavigationPhotographer.js";
import { MenuKeyboard } from "../components/photographer/MenuKeyboard.js";

//
class photographerPage {
  constructor() {
    this.$photographersHeaderWrapper = document.querySelector(".photograph-header");
    this.id = getIdFromUrl();
    this.media = new DisplayPhotographerMedia();
    this.PriceElement = new DisplayPhotographerPriceElement();
    this.photographerDataProvider = new PhotographerDataProvider();
    this.photographerData = null;
    this.modal = new Modal();
    this.lightbox = new Lightbox();
    this.photographerMedia = null;
  }
  
  async DisplayPhotographerPage() {
    this.photographerData = await this.photographerDataProvider.photographer(this.id);
    this.Header = new displayPhotographerHeader(this.photographerData);
    // Creation of header
    await this.Header.displayPhotographerHeader(this.id, this.$photographersHeaderWrapper);
    
    // Initialisation of menu
    await this.media.DisplayPhotographerMedia(this.id);
    
    // Creation of Price Element
    /*     await this.PriceElement.DisplayPhotographerPriceElement(this.id); */
    
    // Creation of Modal
    this.modal.buttonDisplayModal(this.photographerData);
    
    this.menu = new Menu();
    
    this.KeyboardNavigationPhotographer = new KeyboardNavigationPhotographer();
    this.KeyboardNavigationPhotographer.setupEventListeners();
    /* this.MenuKeyboardNavigation.setupEventListenersMenu(); */
    
    new MenuKeyboard();    
  }
}

const pP = new photographerPage();
pP.DisplayPhotographerPage();
export { photographerPage };
