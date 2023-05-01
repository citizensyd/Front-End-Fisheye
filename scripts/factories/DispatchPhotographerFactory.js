import indexPhotographer from "./ClassPhotographerFactory.js";
import pagePhotographer from "./ClassPhotographerFactory.js";
// to dispatch constructor to generate element for each photographer
class newPhotographerFactory {
  constructor(data, type) {
    if (type === "indexPhotographer") {
      return new indexPhotographer(data);
    } else if (type === "photographer") {
      return new pagePhotographer(data);
    } else {
      throw "Unknown type format";
    }
  }
}

export default newPhotographerFactory;
