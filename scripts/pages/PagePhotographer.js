import { PhotographerApi } from "../api/Api.js";
import { getIdFromUrl } from "../components/GetIdFromUrl.js";

// 
class photographerPage {
  constructor() {
    this.$photographersWrapper = document.querySelector(
      ".photographer_section"
    );
    this.id = getIdFromUrl();
    this.photographerApi = new PhotographerApi("/data/photographers.json");
  }

  async displayPhotographer() {
    const photographerData = await this.photographerApi.getPhotographer(
      this.id
    );
    console.log(photographerData);
  }
}

const pP = new photographerPage();
pP.displayPhotographer();
