import { PhotographersApi } from "../scripts/api/Api.js";
import { displayPhotographerIndex } from "./pages/Index.js";

class App {
  constructor() {
    this.photographersApi = new PhotographersApi('/data/photographers.json');
  }

  async main() {
    const photographersData = await this.photographersApi.getPhotographers();
    displayPhotographerIndex(photographersData);
  }
}

const app = new App();
app.main();
