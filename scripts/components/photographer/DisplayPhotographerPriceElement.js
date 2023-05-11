import { PhotographerObjectProvider } from "../../api/PhotographerObjectProvider.js";

class DisplayPhotographerPriceElement {

  constructor() {
    this.photographer = new PhotographerObjectProvider();
  }

  async DisplayPhotographerPriceElement(id) {
    const photographer = await this.photographer.photographerObject(id);
    const photographerPrice = photographer.price;
    photographerPrice.classList.add("photographer-price")
    const photographerPriceElement = document.createElement("div");
    photographerPriceElement.classList.add("photographer-like-price");
    photographerPriceElement.setAttribute("tabindex", 6);
    photographerPriceElement.appendChild(photographerPrice);
    const photographerMediaWrapper = document.querySelector(".photographer-media");
    return photographerMediaWrapper.appendChild(photographerPriceElement);
  }
}

export { DisplayPhotographerPriceElement };
