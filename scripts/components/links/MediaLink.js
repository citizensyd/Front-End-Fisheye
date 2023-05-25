// redirection to the photographer's page
import { Lightbox } from "../photographer/DisplayLightbox.js";
export const mediaLink = (event) => {
  const previousCurrentTabIndex = parseInt(getTabindexFromSecondParentDiv(event.target));
  const target = event.target;
  const lightbox = new Lightbox(previousCurrentTabIndex );
  const mediaId = parseInt(target.id);
  lightbox.create(mediaId);
};

const getTabindexFromSecondParentDiv = (event) =>{
  const target = event;
  const secondParentDiv = target.parentNode.parentNode; // Accéder au deuxième parent div

  if (secondParentDiv instanceof HTMLDivElement) {
    const tabindex = secondParentDiv.getAttribute("tabindex");
    return tabindex;
  }
}