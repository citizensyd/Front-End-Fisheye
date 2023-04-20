let tabIndex = 3;
const photographerFactory = data => {
    const { name, id, city, country, tagline, price, portrait } = data;
    
    const picture = `assets/photographers/${portrait}`;
    
    const getUserCardDOM = () => {
        const article = document.createElement('article');
        article.classList.add(`photographer-${id}`);
        article.setAttribute("aria-label", `Profil du photographe ${name}`);
        article.setAttribute("tabindex", tabIndex);
        tabIndex++;
        const containerPicture = document.createElement('div');
        containerPicture.classList.add('photographer-icon');
        const photographerPicture = document.createElement('img');
        photographerPicture.setAttribute('src', picture);
        const photographerName = document.createElement('h2');
        photographerName.textContent = name;
        const photographerLocation = document.createElement('p');
        photographerLocation.textContent = `${city}, ${country}`;
        const photographerTagline = document.createElement('p');
        photographerTagline.textContent = tagline;
        const photographerPrice = document.createElement('p');
        photographerPrice.textContent = `${price} €/jour`;
        article.appendChild(containerPicture);
        containerPicture.appendChild(photographerPicture);
        article.appendChild(photographerName);
        article.appendChild(photographerLocation); 
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice);
        article.appendChild(photographerPrice);


        return article;
    };

    return { name, city, tagline, price, picture, getUserCardDOM };
};
