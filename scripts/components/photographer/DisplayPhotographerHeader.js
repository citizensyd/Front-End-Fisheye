import { headerPhotographer } from "./HeaderPhotographer.js";
import { PhotographerObjectProvider } from "../../api/PhotographerObjectProvider.js";

class displayPhotographerHeader {
  constructor() {
    this.objectProvider = new PhotographerObjectProvider();
  }
  async displayPhotographerHeader(id, photographersHeaderWrapper) {
    const photographerObject = await this.objectProvider.photographerObject(id);
    const photographerDivDOM = headerPhotographer(photographerObject);

    photographerObject.portrait.setAttribute("tabindex", 4);
    photographerDivDOM.append(
        photographerObject.name,
        photographerObject.city,
        photographerObject.tagline
    );

    photographersHeaderWrapper.append(photographerObject.portrait, photographerDivDOM);
  }
}
export { displayPhotographerHeader };
