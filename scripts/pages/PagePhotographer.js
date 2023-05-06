import { getIdFromUrl } from "../components/GetIdFromUrl.js";
import { displayPhotographerHeader } from "../components/photographer/DisplayPhotographerHeader.js";
import { DisplayPhotographerPriceElement } from "../components/photographer/DisplayPhotographerPriceElement.js";
import { DisplayPhotographerMedia } from "../components/photographer/DisplayPhotographerMedia.js"

//
class photographerPage {
  constructor() {
    this.$photographersHeaderWrapper =
      document.querySelector(".photograph-header");
    this.id = getIdFromUrl();
    this.Header = new displayPhotographerHeader;
    this.media = new DisplayPhotographerMedia;
    this.PriceElement = new DisplayPhotographerPriceElement;

  }

  async DisplayPhotographerPage(){

    // Creation of header
    await this.Header.displayPhotographerHeader(this.id, this.$photographersHeaderWrapper);

    // Vreation of Media Section
    await this.media.DisplayPhotographerMedia(this.id);
    
    // Creation of Price Element
    await this.PriceElement.DisplayPhotographerPriceElement(this.id);

    }
}

const pP = new photographerPage();
pP.DisplayPhotographerPage();
export { photographerPage };