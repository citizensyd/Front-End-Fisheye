import { PhotographerDataProvider } from "../../api/PhotographerDataProvider.js";

// Definition of the CounterLike class
class CounterLike {
  constructor(id) {
    this.id = id;
    this.PhotographerDataProvider = new PhotographerDataProvider();
    this.oldMediaLike = null;
    this.newLikesArray = null;
    this.allLikes = null;
  }

  // Async init function to set up the counter
  async init() {
    await this.counter();
    this.bindEventListeners();
    this.displayTotalCounter();
  }

  // Async counter function to fetch media data and map it to newLikesArray
  async counter() {
    this.oldMediaLike = await this.PhotographerDataProvider.media(this.id);
    this.newLikesArray = this.oldMediaLike.map(({ id, likes }) => ({
      id,
      newLike: likes,
    }));
  }

  // Function to bind event listeners to the like buttons
  bindEventListeners() {
    document.querySelectorAll(".photographer-media-likes-heart").forEach((btn) => {
      btn.addEventListener("click", this.incrementLike.bind(this));
    });
  }

  // Function to increment and decrement like count
  incrementLike(event) {
    const idMedia = event.target
      .closest(".photographer-media-card")
      .querySelector("img, video")
      .getAttribute("id");
    const replaceLike = event.target
      .closest(".photographer-media-likes-heart")
      .querySelector(".photographer-media-likes");

    const media = this.newLikesArray.find((m) => m.id === parseInt(idMedia));
    const oldMediaLike = this.oldMediaLike.find((m) => m.id === parseInt(idMedia));
    if (oldMediaLike.likes == media.newLike) {
      media.newLike += 1;
      replaceLike.textContent = media.newLike;
    } else {
      media.newLike -= 1;
      replaceLike.textContent = media.newLike;
    }
    // Display the total counter
    this.displayTotalCounter();
  }

  // Function to display the total like count
  displayTotalCounter() {
    const allLikes = Array.from(document.querySelectorAll(".photographer-media-likes"))
      .map((element) => parseInt(element.textContent))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      .toString();

    // Create new elements for total likes and like heart
    const price = document.querySelector(".photographer-like-price");
    const allLikesInsert = document.createElement("p");
    const likeHeart = document.createElement("div");
    likeHeart.classList.add("photographer-like-heart");
    allLikesInsert.classList.add("photographer-total-like");
    const heartBlack = document.createElement("img");
    heartBlack.src = "assets/images/heart-black.png";
    heartBlack.alt = "Un coeur";

    allLikesInsert.textContent = allLikes;

    likeHeart.appendChild(allLikesInsert);
    likeHeart.appendChild(heartBlack);

    const photographerMediaTotalLike = document.querySelector(".photographer-like-heart");

    if (!photographerMediaTotalLike) {
      price.appendChild(likeHeart);
    } else {
      price.replaceChild(likeHeart, photographerMediaTotalLike);
    }
  }
}

export { CounterLike };
