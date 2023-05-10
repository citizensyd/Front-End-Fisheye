// redirection to the photographer's page
import { Lightbox } from "../photographer/DisplayLightbox.js";
export const mediaLink = (event) => {
  const lightbox = new Lightbox();
  const target = event.target;
  const mediaId = parseInt(target.id);
  lightbox.create(mediaId);
};
