import { PhotographersApi } from "./Api.js";
import { PhotographerApi } from "./Api.js";
import { MediaApi } from "./Api.js";
import { UniqueMediaApi } from "./Api.js";

class PhotographerDataProvider {
  constructor() {
    this.photographersJson = null;
    if (window.location.href.includes("citizensyd")) {
      this.photographersJson = "/Front-End-Fisheye/data/photographers.json";
    } else {
      this.photographersJson = "/data/photographers.json";
    } 
    this.photographersApi = new PhotographersApi(this.photographersJson);
    this.photographerApi = new PhotographerApi(this.photographersJson);
    this.mediaApi = new MediaApi(this.photographersJson);
    this.UniqueMediaApi = new UniqueMediaApi(this.photographersJson);
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
    const photographerUniqueMedia = await this.UniqueMediaApi.getUniqueMedia(id);
    return photographerUniqueMedia;
  }
}

export { PhotographerDataProvider };
