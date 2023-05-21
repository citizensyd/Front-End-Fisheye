// redirection to the photographer's page
import { Lightbox } from "../photographer/DisplayLightbox.js";
export const mediaLink = (event) => {
  console.log(event.target);
  const previousCurrentTabIndex = parseInt(getTabindexFromSecondParentDiv(event.target));
  console.log(typeof previousCurrentTabIndex);
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
    console.log(tabindex);
    return tabindex;
  }
}