import { DisplayPhotographerPriceElement } from "./DisplayPhotographerPriceElement.js";
import { PhotographerObjectProvider } from "../../api/PhotographerObjectProvider.js";
import { MediaApi } from "../../api/Api.js";
import { sectionMediaPhotographer } from "../../layout/SectionMediaPhotographer.js";

class DisplayPhotographerMedia {
  constructor() {
    this.$photographerMainWrapper = document.querySelector("main");
    this.DisplayPhotographerPriceElement =
      new DisplayPhotographerPriceElement();
    this.objectProvider = new PhotographerObjectProvider();
    this.mediaApi = new MediaApi("/data/photographers.json");
    this.tabIndex = 7;
  }

  async DisplayPhotographerMedia(id) {
    const photographerMedia = await this.mediaApi.getMedia(id);

    const mediaPhotographer = sectionMediaPhotographer(photographerMedia[0]);


    photographerMedia.forEach(async (media) => {
      let photographerObjectMedia =
        await this.objectProvider.photographerObjectMedia(media.id);

      const mediaCard = () => {
        const card = document.createElement("div");
        card.classList.add("photographer-media-card");
        card.setAttribute("alt", `${photographerObjectMedia.justTitle}`);
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
        Heart.alt = "Un coeur";
        return Heart;
      };
      const mediaHeartElement = mediaHeart();

      const mediaHeartLike = () => {
        const HeartLike = document.createElement("span");
        HeartLike.classList.add("photographer-media-likes-heart");
        return HeartLike;
      };
      const mediaHeartLikeElement = mediaHeartLike();

      const mediaHeartMoney = () => {
        const HeartMoney = document.createElement("span");
        HeartMoney.classList.add("photographer-media-price-likes-heart");
        return HeartMoney;
      };
      const mediaHeartMoneyElement = mediaHeartMoney();

      const diplayCardMedia = () => {
        mediaHeartLikeElement.append(
          photographerObjectMedia.likes,
          mediaHeartElement
        );
        mediaHeartMoneyElement.append(
          photographerObjectMedia.price,
          mediaHeartLikeElement
        );
        mediaInformationElement.append(
          photographerObjectMedia.title,
          mediaHeartMoneyElement
        );
        mediaCardElement.append(
          photographerObjectMedia.media,
          mediaInformationElement
        );
        mediaPhotographer.appendChild(mediaCardElement);
        this.$photographerMainWrapper.appendChild(mediaPhotographer);
      };
      diplayCardMedia()
    });
  }
}
export { DisplayPhotographerMedia };
