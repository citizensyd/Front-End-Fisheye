// creation of an item for photographer page
const photographerMediaCard = (() => {  
  let tabIndex = 6;
  return (data) => {
    const { name } = data;
    const photographer = document.createElement("div");
    photographer.classList.add("photographer-merdia-card");
    photographer.setAttribute("aria-label", `Profil du photographe ${name}`);
    photographer.setAttribute("tabindex", tabIndex++);
    return photographer;
  };
  })();
export { photographerMediaCard };

