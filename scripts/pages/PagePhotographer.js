import { getIdFromUrl } from "../components/GetIdFromUrl.js";
import { displayPhotographerHeader } from "../components/photographer/DisplayPhotographerHeader.js";
import { DisplayPhotographerPriceElement } from "../components/photographer/DisplayPhotographerPriceElement.js";
import { DisplayPhotographerMedia } from "../components/photographer/DisplayPhotographerMedia.js";
import { PhotographerDataProvider } from "../api/PhotographerDataProvider.js";
import { Modal } from "../utils/contactForm.js";
import { Lightbox } from "../components/photographer/DisplayLightbox.js";
import { CounterLike } from "../components/photographer/CounterLike.js";

//
class photographerPage {
  constructor() {
    this.$photographersHeaderWrapper =
      document.querySelector(".photograph-header");
    this.id = getIdFromUrl();
    this.Header = new displayPhotographerHeader();
    this.media = new DisplayPhotographerMedia();
    this.PriceElement = new DisplayPhotographerPriceElement();
    this.photographer = new PhotographerDataProvider;
    this.modal = new Modal();
    this.lightbox = new Lightbox;
    this.counterLike = new CounterLike(this.id);
  }

  async DisplayPhotographerPage() {
    const photographer = await this.photographer.photographer(this.id);
    // Creation of header
    await this.Header.displayPhotographerHeader(
      this.id,
      this.$photographersHeaderWrapper
    );

    // Vreation of Media Section
    await this.media.DisplayPhotographerMedia(this.id);

    // Creation of Price Element
    await this.PriceElement.DisplayPhotographerPriceElement(this.id);

    // Creation of Modal
    this.modal.buttonDisplayModal(photographer);

    // Creation of counter like
    this.counterLike.init()

  }
}

const pP = new photographerPage();
pP.DisplayPhotographerPage();
export { photographerPage };
