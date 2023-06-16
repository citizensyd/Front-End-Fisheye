import { getIdFromUrl } from "../utils/GetIdFromUrl.js";
import { displayPhotographerHeader } from "../components/photographer/DisplayPhotographerHeader.js";
import { DisplayPhotographerMedia } from "../components/photographer/DisplayPhotographerMedia.js";
import { PhotographerDataProvider } from "../api/PhotographerDataProvider.js";
import { Modal } from "../layout/contactForm.js";
import { Lightbox } from "../components/photographer/DisplayLightbox.js";
import { Menu } from "../components/photographer/Menu.js";
import { KeyboardNavigationPhotographer } from "../components/keyboard/KeyboardNavigationPhotographer.js";
import { MenuKeyboard } from "../components/keyboard/MenuKeyboard.js";

//
class photographerPage {
  constructor() {
    this.$photographersHeaderWrapper = document.querySelector(".photograph-header");
    this.id = getIdFromUrl();
    this.media = new DisplayPhotographerMedia();
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
        
    // Creation of Modal
    this.modal.buttonDisplayModal(this.photographerData);
    
    this.menu = new Menu();
    
    this.KeyboardNavigationPhotographer = new KeyboardNavigationPhotographer();
    this.KeyboardNavigationPhotographer.setupEventListeners();
    
    new MenuKeyboard();    
  }
}

const pP = new photographerPage();
pP.DisplayPhotographerPage();
export { photographerPage };
