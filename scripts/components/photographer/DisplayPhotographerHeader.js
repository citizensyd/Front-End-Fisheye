import { PhotographerObjectProvider } from "../../api/PhotographerObjectProvider.js";
import { PhotographerDataProvider } from "../../api/PhotographerDataProvider.js";

class displayPhotographerHeader {
  constructor(photographerData) {
    this.photographerData = photographerData;
    this.objectProvider = new PhotographerObjectProvider();
    this.photographerDataProvider = new PhotographerDataProvider();
  }

  buttonContactMe() {
    const buttonContactMe = document.createElement("button");
    buttonContactMe.classList.add("contact_button");
    buttonContactMe.setAttribute("aria-label", "Contactez moi");
    buttonContactMe.setAttribute("tabindex", 3);
    buttonContactMe.textContent = "Contactez-moi";
    return buttonContactMe;
  }

  async displayPhotographerHeader(id, photographersHeaderWrapper) {
    const photographerObject = await this.objectProvider.photographerObject(id);
    const photographerDivDOM = this.headerPhotographer(this.photographerData);
    photographerObject.portrait.setAttribute("tabindex", 4);

    photographerDivDOM.append(photographerObject.name, photographerObject.city, photographerObject.tagline);

    photographersHeaderWrapper.append(photographerDivDOM, this.buttonContactMe(), photographerObject.portrait);
  }

  headerPhotographer(/* data */) {
    /* const { name } = data[0]; */
    const photographer = document.createElement("div");
    photographer.classList.add("photographer-header-name-city-tag");
    /* photographer.setAttribute("aria-label", `Profil du photographe ${name}`); */
    photographer.setAttribute("tabindex", 2);
    return photographer;
  }
}
export { displayPhotographerHeader };
