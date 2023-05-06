// creation of an item for each photographer
const createArticlePhotographer = (() => {
  let tabIndex = 3;
  return (data) => {
    const { name, id } = data;
    const article = document.createElement("article");
    article.classList.add(`photographer-${id}`);
    article.setAttribute("aria-label", `Profil du photographe ${name}`);
    article.setAttribute("tabindex", tabIndex++);
    return article;
  };
})();

export { createArticlePhotographer };
