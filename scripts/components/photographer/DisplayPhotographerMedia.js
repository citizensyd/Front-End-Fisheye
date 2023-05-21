import { PhotographerObjectProvider } from "../../api/PhotographerObjectProvider.js";
/* import { MediaApi } from "../../api/Api.js"; */
import { sectionMediaPhotographer } from "../../layout/SectionMediaPhotographer.js";
import { getIdFromUrl } from "../GetIdFromUrl.js";
import { PhotographerDataProvider } from "../../api/PhotographerDataProvider.js";
import { CounterLike } from "../photographer/CounterLike.js";

class DisplayPhotographerMedia {
  constructor() {
    this.$photographerMainWrapper = document.querySelector("main");
    this.objectProvider = new PhotographerObjectProvider();
    /* this.mediaApi = new MediaApi("/Front-End-Fisheye/data/photographers.json"); */
    this.photographerDataProvider = new PhotographerDataProvider();
    this.tabIndex = 8;
    this.photographerData = null;
    this.photographerMedias = null;
    this.id = getIdFromUrl();
    this.counterLike = new CounterLike(this.id);
    this.$photographerMedia = null;
    this.oldArray = null;
    this.card = 1;
    this.photographerObject = null;
    this.getPhotographerMedias();
    this.getPhotographerData();
    this.getPhotographerObject();
  }

  async getPhotographerData() {
    this.photographerData = await this.photographerDataProvider.photographer(this.id);
  }

  async getPhotographerObject() {
    this.photographerObject = await this.objectProvider.photographerObject(this.id);
  }

  async getPhotographerMedias() {
    this.photographerMedias = await this.photographerDataProvider.media(this.id);
  }

  async DisplayPhotographerMedia() {
    const photographerMedia = sectionMediaPhotographer(this.photographerData);

    for (const media of this.photographerMedias) {
      let photographerObjectMedia = await this.objectProvider.photographerObjectMedia(media.id);

      const mediaCard = () => {
        const card = document.createElement("div");
        card.classList.add("photographer-media-card");
        card.id = `card-${this.card++}`;
        card.setAttribute("tabindex", this.tabIndex++);
        return card;
      };
      const mediaCardElement = mediaCard();

      const mediaInformation = () => {
        const information = document.createElement("div");
        information.classList.add("photographer-media-title-price-like-heart");
        return information;
      };
      const mediaInformationElement = mediaInformation();

      const mediaHeart = () => {
        const Heart = document.createElement("img");
        Heart.src = "assets/images/heart.png";
        Heart.alt = "Un coeur rouge";
        return Heart;
      };
      const mediaHeartElement = mediaHeart();

      const mediaHeartLike = () => {
        const HeartLike = document.createElement("span");
        HeartLike.classList.add("photographer-media-likes-heart");
        HeartLike.setAttribute("tabindex", this.tabIndex++);
        return HeartLike;
      };
      const mediaHeartLikeElement = mediaHeartLike();

      const mediaHeartMoney = () => {
        const HeartMoney = document.createElement("span");
        HeartMoney.classList.add("photographer-media-price-likes-heart");
        return HeartMoney;
      };
      const mediaHeartMoneyElement = mediaHeartMoney();

      const displayCardMedia = () => {
        mediaHeartLikeElement.append(photographerObjectMedia.likes, mediaHeartElement);
        mediaHeartMoneyElement.append(photographerObjectMedia.price, mediaHeartLikeElement);
        mediaInformationElement.append(photographerObjectMedia.title, mediaHeartMoneyElement);
        mediaCardElement.append(photographerObjectMedia.media, mediaInformationElement);
        photographerMedia.appendChild(mediaCardElement);
        this.$photographerMainWrapper.appendChild(photographerMedia);
      };
      displayCardMedia();
    }
    this.displayPhotographerPriceElement();
  }

  displayPhotographerPriceElement() {
    const photographerPrice = this.photographerObject.price;
    photographerPrice.classList.add("photographer-price");
    const photographerPriceElement = document.createElement("div");
    photographerPriceElement.classList.add("photographer-like-price");
    photographerPriceElement.setAttribute("tabindex", 7);
    photographerPriceElement.appendChild(photographerPrice);
    const photographerMediaWrapper = document.querySelector(".photographer-media");
    photographerMediaWrapper.insertBefore(photographerPriceElement, photographerMediaWrapper.firstChild);
    this.counterLike.init();
  }

  DisplayNewPhotographerMedia(newArray) {
    this.$photographerMedia = document.querySelector(".photographer-media");
    this.$photographerMedia.remove();
    this.photographerMedias = newArray;
    this.DisplayPhotographerMedia();
  }

  displayNewPhotographerMediaById(previousArray, newArray) {
    console.log("displayNewPhotographerMediaById");
    this.$photographerMedia = document.querySelector(".photographer-media");
    console.log(newArray);
    console.log(previousArray);
    console.log(this.$photographerMedia);

    // Récupérer l'id de l'image et de la vidéo dans un tableau
    const prevoiousMediaIdArray = Array.from(document.querySelectorAll(".photographer-media img[id], .photographer-media video[id]"), (element) => element.id);
    console.log(prevoiousMediaIdArray);

    // Récupérer l'id de la carte dans un tableau
    const previousCardIdArray = Array.from(document.querySelectorAll(".photographer-media-card[id]"), (element) => element.id);
    console.log(previousCardIdArray);
    console.log(typeof previousCardIdArray);

    // Incorporer dans un tableau d'objets
    const previousCardMediaIdArray = previousCardIdArray.map((cardId, index) => ({ cardId, mediaId: prevoiousMediaIdArray[index] }));
    console.log(previousCardMediaIdArray);

    /* créer:
 - le nombre de card = newArray.length
 - sélectionner toutes les cards
 - remplacer chaque card img id par celle correspondant sa position dans le tableau card[i]
*/
  }
}
export { DisplayPhotographerMedia };
