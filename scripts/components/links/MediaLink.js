// redirection to the photographer's page
export const mediaLink = (event) => {
    const target = event.target;
    const article = target.closest("article");
    const photographerId = article.className.split("-")[1];
    window.location.href = "/photographer.html?id=" + photographerId;
  };