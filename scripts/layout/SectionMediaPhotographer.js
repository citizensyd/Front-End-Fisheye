// creation of an item for photographer page
const sectionMediaPhotographer = (data) => {
  const { name } = data[0];
  const photographer = document.createElement("section");
  photographer.classList.add("photographer-media");
  photographer.setAttribute("aria-label", `media du photographe ${name}`);
  return photographer;
};
export { sectionMediaPhotographer };
