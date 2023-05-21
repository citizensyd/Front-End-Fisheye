import { displayPhotographerIndex } from "./pages/Index.js";
import { PhotographerDataProvider } from "./api/PhotographerDataProvider.js";

class App {
  constructor() {
    this.PhotographerDataProvider = new PhotographerDataProvider();
  }

  async main() {
    const photographersData = await this.PhotographerDataProvider.photographers();
    displayPhotographerIndex(photographersData);
  }
}

const app = new App();
app.main();
