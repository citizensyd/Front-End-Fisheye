import { PhotographerObjectProvider } from "../../api/PhotographerObjectProvider.js";
import { sectionMediaPhotographer } from "../../layout/SectionMediaPhotographer.js";
import { getIdFromUrl } from "../../utils/GetIdFromUrl.js";
import { PhotographerDataProvider } from "../../api/PhotographerDataProvider.js";
import { CounterLike } from "../photographer/CounterLike.js";

class DisplayPhotographerMedia {
  constructor() {
    this.$photographerMainWrapper = document.querySelector("main");
    this.objectProvider = new PhotographerObjectProvider();
    this.photographerDataProvider = new PhotographerDataProvider();
    this.tabIndex = 8;
    this.newTabIndex1 = 6;
    this.newTabIndex2 = 7;
    this.photographerData = null;
    this.photographerMedias = null;
    this.id = getIdFromUrl();
    this.counterLike = new CounterLike(this.id);
    this.$photographerMedia = null;
    this.oldArray = null;
    this.card = 1;
    this.newCard = 1;
    this.photographerObject = null;
    this.getPhotographerMedias();
    this.getPhotographerData();
    this.getPhotographerObject();
    this.keyboardNavigationPhotographer = null;
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
        Heart.src = "assets/images/heart_red_light.png";
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
  
/*   DisplayNewPhotographerMedia(newArray) {
    this.tabIndex = 8;
    this.$photographerMedia = document.querySelector(".photographer-media");
    this.$photographerMedia.remove();
    this.photographerMedias = newArray;
    this.DisplayPhotographerMedia();
  } */
  
  displayNewPhotographerMediaById(newArray) {

    this.$photographerMedia = document.querySelectorAll(".photographer-media-card");
    const sectionMedia = document.querySelector(".photographer-media");

    const inPlaceMediaIdArray = Array.from(document.querySelectorAll(".photographer-media img[id], .photographer-media video[id]"), (element) => element.id);
    const newMediaIdArray = [];
    for (const item of newArray) {
      newMediaIdArray.push(item.id);
    }
    const newMediaIdArrayString = newMediaIdArray.map((element) => element.toString());

    const positionOfNewArray = newMediaIdArrayString.map((element) => inPlaceMediaIdArray.indexOf(element));

    const mediaCardArray = [...this.$photographerMedia];

    const fragment = document.createDocumentFragment();

    positionOfNewArray.forEach((newPosition, currentPosition) => {
      if (newPosition >= 0 && newPosition < mediaCardArray.length) {
        const card = mediaCardArray[newPosition];
        const cardId = card.id;
        const newId = cardId.replace(/\d+/, `${positionOfNewArray.indexOf(positionOfNewArray[currentPosition]) + 1}`);
        card.id = newId;

        const tabIndex = card.getAttribute("tabindex");
        const newTabIndexValue1 = `${(this.newTabIndex1 += 2)}`;
        const newTabIndex1 = tabIndex.replace(/\d+/, newTabIndexValue1);
        card.setAttribute("tabindex", newTabIndex1);

        const oneLikesHeart = card.querySelector(".photographer-media-likes-heart")
        const LikesHearTabIndex = oneLikesHeart.getAttribute("tabindex");
        const newTabIndexValue2 = `${(this.newTabIndex2 += 2)}`;
        const newTabIndex2 = LikesHearTabIndex.replace(/\d+/, newTabIndexValue2);
        oneLikesHeart.setAttribute("tabindex", newTabIndex2);

        fragment.appendChild(card);
      }
    });

    sectionMedia.appendChild(fragment);


  }
}
export { DisplayPhotographerMedia };

