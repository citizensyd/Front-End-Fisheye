import { PhotographerDataProvider } from "./PhotographerDataProvider.js";
import { newPhotographerFactory } from "../factories/DispatchPhotographerFactory.js";

class PhotographerObjectProvider {
  constructor() {
    this.photographerDataProvider = new PhotographerDataProvider();
  }

  async photographersObject() {
    const photographersData = await this.photographerDataProvider.photographers();
    const photographersObject = new newPhotographerFactory(photographersData, "indexPhotographer");
    photographersObject.map((photographer) => {
      const {
        portrait: photographerPortrait,
        name: photographerName,
        city: photographerCity,
        tagline: photographerTagline,
        price: photographerPrice,
      } = photographer;
      return {
        portrait: photographerPortrait,
        name: photographerName,
        city: photographerCity,
        tagline: photographerTagline,
        price: photographerPrice,
      };
    });
    return photographersObject;
  }

  async photographerObject(id) {
    const photographerData = await this.photographerDataProvider.photographer(id);
    const photographerObject = new newPhotographerFactory(photographerData[0], "indexPhotographer");
    const {
      portrait: photographerPortrait,
      name: photographerName,
      city: photographerCity,
      tagline: photographerTagline,
      price: photographerPrice,
    } = photographerObject;
    return {
      portrait: photographerPortrait,
      name: photographerName,
      city: photographerCity,
      tagline: photographerTagline,
      price: photographerPrice,
    };
  }

  async photographerObjectMedia(id) {
    const photographersData = await this.photographerDataProvider.UniqueMedia(id);
    const photographerObjectMedia = new newPhotographerFactory(
      photographersData,
      "mediaUniquePhotographer"
    );
    const {
      id: mediaId,
      photographerId: mediaPhotographerId,
      title: mediaTitle,
      justTitle: mediaJustTitle,
      media: mediaPicture,
      likes: mediaLikes,
      date: mediaDate,
      price: mediaPrice,
    } = photographerObjectMedia;
    return {
      id: mediaId,
      photographerId: mediaPhotographerId,
      title: mediaTitle,
      justTitle: mediaJustTitle,
      media: mediaPicture,
      likes: mediaLikes,
      date: mediaDate,
      price: mediaPrice,
    };
  }
}

export { PhotographerObjectProvider };
