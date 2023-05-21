// redirection to the photographer's page
export const photographerLink = (event) => {
  const target = event.target;
  const article = target.closest("article");
  const photographerId = article.className.split("-")[1];
  window.location.href = "/Front-End-Fisheye/photographer.html?id=" + photographerId;
};
