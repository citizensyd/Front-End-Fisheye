import { PhotographersApi } from "./Api.js";
import { PhotographerApi } from "./Api.js";
import { MediaApi } from "./Api.js";
import { UniqueMediaApi } from "./Api.js";

class PhotographerDataProvider {
  constructor() {
    this.photographersApi = new PhotographersApi("/data/photographers.json");
    this.photographerApi = new PhotographerApi("/data/photographers.json");
    this.mediaApi = new MediaApi("/data/photographers.json");
    this.UniqueMediaApi = new UniqueMediaApi("/data/photographers.json");
  }

  async photographers() {
    const photographersData = await this.photographersApi.getPhotographers();
    return photographersData;
  }
  async photographer(id) {
    const photographerData = await this.photographerApi.getPhotographer(id);
    return photographerData;
  }
  async media(id) {
    const photographerMedia = await this.mediaApi.getMedia(id);
    return photographerMedia;
  }
  async UniqueMedia(id) {
    const photographerUniqueMedia = await this.UniqueMediaApi.getUniqueMedia(
      id
    );
    return photographerUniqueMedia;
  }
}

export { PhotographerDataProvider };
