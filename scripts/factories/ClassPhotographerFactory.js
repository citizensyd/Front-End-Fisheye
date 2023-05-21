import { photographerLink } from "../components/links/photographerLink.js";

// creation of class to implement element in the article of each photographer
class indexPhotographer {
  constructor(data) {
    this._name = data.name;
    this._id = data.id;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = data.portrait;
  }

  get name() {
    const photographerName = document.createElement("h2");
    photographerName.textContent = this._name;
    photographerName.addEventListener("click", photographerLink);
    return photographerName;
  }

  get id() {
    return this._id;
  }

  get city() {
    const photographerLocation = document.createElement("p");
    photographerLocation.textContent = `${this._city}, ${this._country}`;
    return photographerLocation;
  }

  get tagline() {
    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = this._tagline;
    return photographerTagline;
  }

  get price() {
    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = `${this._price} €/jour`;
    return photographerPrice;
  }

  get portrait() {
    const containerPicture = document.createElement("div");
    containerPicture.classList.add("photographer-icon");
    const picture = `assets/photographers/${this._portrait}`;
    const photographerPicture = document.createElement("img");
    photographerPicture.classList.add(`photographer-img-${this._id}`);
    photographerPicture.setAttribute("src", picture);
    photographerPicture.setAttribute("alt", `Portrait du photographe ${this._name}`);
    photographerPicture.addEventListener("click", photographerLink);
    containerPicture.appendChild(photographerPicture);
    return containerPicture;
  }
}

class pagePhotographer extends indexPhotographer {
  /**
   *
   * @param {string} data
   */
  constructor(data) {
    super(data);
  }
  get name() {
    const photographerName = document.createElement("h2");
    photographerName.textContent = this._name;
    return photographerName;
  }

  get portrait() {
    const containerPicture = document.createElement("div");
    containerPicture.classList.add(`photographer-${this._id}`);
    containerPicture.classList.add("photographer-icon");
    const picture = `assets/photographers/${this._portrait}`;
    const photographerPicture = document.createElement("img");
    photographerPicture.setAttribute("src", picture);
    photographerPicture.setAttribute("alt", "");
    containerPicture.appendChild(photographerPicture);
    return containerPicture;
  }
}

export { indexPhotographer, pagePhotographer };
