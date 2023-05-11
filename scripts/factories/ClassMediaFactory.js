import { mediaLink } from "../components/links/MediaLink.js";
// creation of class to implement element in the article of each photographer
class mediaPhotographer {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._media = data.image || data.video; // Take as value the available file
    this._isVideo = Boolean(data.video); // Check if it's a video
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
  }
  
  get media() {
    const containerMedia = document.createElement("div");
    const name = document.querySelector("h2").textContent.split(" ")[0];
    containerMedia.classList.add("photographer-media-image");
    let mediaElement;

    if (this._isVideo) {
      mediaElement = document.createElement("video");
      mediaElement.id = this._id;
      /* mediaElement.setAttribute("controls", ""); */ //if you want play video directly
    } else {
      mediaElement = document.createElement("img");
      mediaElement.id = this._id;

    }
    
    mediaElement.setAttribute("src", `assets/photos/${name}/${this._media}`);
    mediaElement.setAttribute("alt", "");
    mediaElement.addEventListener("click", mediaLink);
    
    containerMedia.appendChild(mediaElement);
    return containerMedia;
  }
  get video() {
    const containerPicture = document.createElement("div");
    const name = document.querySelector("h2").textContent.split(" ")[0];
    containerPicture.classList.add("photographer-media-video");
    const picture = `assets/photos/${name}/${this._video}`;
    const mediaPicture = document.createElement("video");
    mediaPicture.setAttribute("src", picture);
    mediaPicture.setAttribute("alt", "");
    mediaPicture.addEventListener("click", mediaLink);
    containerPicture.appendChild(mediaPicture);
    return containerPicture;
  }
  get image() {
    const containerPicture = document.createElement("div");
    const name = document.querySelector("h2").textContent.split(" ")[0];
    containerPicture.classList.add("photographer-media-image");
    const picture = `assets/photos/${name}/${this._image}`;
    const mediaPicture = document.createElement("img");    
    mediaPicture.setAttribute("src", picture);
    mediaPicture.setAttribute("alt", "");
    mediaPicture.addEventListener("click", mediaLink);
    containerPicture.appendChild(mediaPicture);
    return containerPicture;
  }

  get date() {
    return this._date;
  }
  
  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    const mediaTitle = document.createElement("span");
    mediaTitle.classList.add("photographer-media-title")
    mediaTitle.textContent = this._title;
    return mediaTitle;
  }

  get justTitle() {
    const mediaJustTitle = this._title;
    return mediaJustTitle;
  }


  get price() {
    const mediaPrice = document.createElement("span");
    mediaPrice.textContent = `${this._price} $`;
    return mediaPrice;
  }

  get likes() {
    const mediaLikes = document.createElement("span");
    mediaLikes.classList.add("photographer-media-likes");
    mediaLikes.textContent = `${this._likes}`;
    return mediaLikes;
  }

}

export { mediaPhotographer};
