// creation of an item for photographer page
const sectionMediaPhotographer = (data) => {
  const { name } = data;
  const photographer = document.createElement("section");
  photographer.classList.add("photographer-media");
    photographer.setAttribute("aria-label", `media du photographe ${name}`);
    photographer.setAttribute("tabindex", 5);
    return photographer;
  };
export { sectionMediaPhotographer };
