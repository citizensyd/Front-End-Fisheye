import { indexPhotographer } from "./ClassPhotographerFactory.js";
import { pagePhotographer } from "./ClassPhotographerFactory.js";
import { mediaPhotographer } from "./ClassMediaFactory.js";
// to dispatch constructor to generate element for each photographer
class newPhotographerFactory {
  constructor(data, type) {
    if (type === "indexPhotographer") {
      return new indexPhotographer(data);
    } else if (type === "pagePhotographer") {
      return new pagePhotographer(data[0]);
    } else if (type === "mediaPhotographer"){
      return new mediaPhotographer(data);
    } else if (type === "mediaUniquePhotographer"){
      return new mediaPhotographer(data[0]);
    }else {
      throw "Unknown type format";
    }
  }
}
export { newPhotographerFactory };
