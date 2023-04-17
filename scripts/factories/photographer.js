const photographerFactory = data => {
    const { name, city, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    const getUserCardDOM = () => {
        const article = document.createElement('article');
        const photographerPicture = document.createElement('img');
        photographerPicture.setAttribute('src', picture);
        const photographerName = document.createElement('h2');
        photographerName.textContent = name;
        const photographerLocation = document.createElement('h3');
        photographerLocation.textContent = city; 
        const photographerTagline = document.createElement('p');
        photographerTagline.textContent = tagline;
        const photographerPrice = document.createElement('p');
        photographerPrice.textContent = price;
        article.appendChild(photographerPicture);
        article.appendChild(photographerName);
        article.appendChild(photographerLocation); 
        article.appendChild(photographerTagline);
        article.appendChild(photographerPrice);
        article.appendChild(photographerPrice);


        return article;
    };

    return { name, city, tagline, price, picture, getUserCardDOM };
};
