// generic class for calling a server
class Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .catch((err) => console.log("an error occurs", err));
  }
}

// call to api to get photographers
class PhotographersApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    const { photographers } = await this.get();
    return photographers;
  }
}

// call to api to get one photographer
class PhotographerApi extends Api {
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    super(url);
  }
  async getPhotographer(id) {
    const { photographers } = await this.get();
    return photographers.filter((photographer) => photographer.id === id);
  }
}

export { PhotographersApi, PhotographerApi };
