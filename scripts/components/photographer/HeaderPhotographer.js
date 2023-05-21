// creation of an item for photographer page
const headerPhotographer = (data) => {
  const { name } = data[0];
  const photographer = document.createElement("div");
  photographer.classList.add("photographer-header-name-city-tag");
  photographer.setAttribute("aria-label", `Profil du photographe ${name}`);
  photographer.setAttribute("tabindex", 2);
  return photographer;
};
export { headerPhotographer };
