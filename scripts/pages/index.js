import { newPhotographerFactory } from "../factories/DispatchPhotographerFactory.js";
import { createArticlePhotographer } from "../components/index/ArticlePhotographer.js";
import { KeyboardNavigationIndex } from "../utils/KeyboardNavigationIndex.js";

/**
 * Affichage de chaque photographe sous forme d'article.
 * @param {Array} photographers - Liste des photographes à afficher.
 */
async function displayPhotographerIndex(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // Création de l'article photographe
    const photographerArticleDOM = createArticlePhotographer(photographer);

    // Création de l'objet photographe
    const photographerObj = new newPhotographerFactory(photographer, "indexPhotographer");
    const { portrait: photographerPortrait, name: photographerName, city: photographerCity, tagline: photographerTagline, price: photographerPrice } = photographerObj;

    // Ajout des éléments à l'article photographe
    photographerArticleDOM.append(photographerPortrait, photographerName, photographerCity, photographerTagline, photographerPrice);
    photographersSection.appendChild(photographerArticleDOM);
  });
  const keyboardNavigationIndex = new KeyboardNavigationIndex();
  keyboardNavigationIndex.setupEventListeners();
}

export { displayPhotographerIndex };
