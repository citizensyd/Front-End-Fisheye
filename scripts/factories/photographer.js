const photographerFactory = (() => {
    let tabIndex = 3;
    
    return data => {
      const { name, id, city, country, tagline, price, portrait } = data;
      const picture = `assets/photographers/${portrait}`;

      const article = document.createElement('article');
      article.classList.add(`photographer-${id}`);
      article.setAttribute("aria-label", `Profil du photographe ${name}`);
      article.setAttribute("tabindex", tabIndex++);
      
      const containerPicture = document.createElement('div');
      containerPicture.classList.add('photographer-icon');
      article.appendChild(containerPicture);
  
      const photographerPicture = document.createElement('img');
      photographerPicture.setAttribute('src', picture);
      photographerPicture.setAttribute('alt', '');
      containerPicture.appendChild(photographerPicture);
  
      const photographerName = document.createElement('h2');
      photographerName.textContent = name;
      article.appendChild(photographerName);
  
      const photographerLocation = document.createElement('p');
      photographerLocation.textContent = `${city}, ${country}`;
      article.appendChild(photographerLocation);
  
      const photographerTagline = document.createElement('p');
      photographerTagline.textContent = tagline;
      article.appendChild(photographerTagline);
  
      const photographerPrice = document.createElement('p');
      photographerPrice.textContent = `${price} €/jour`;
      article.appendChild(photographerPrice);
  
      return { name, city, tagline, price, picture, getUserCardDOM: () => article };
    };
  })();

  const elementstest = document.querySelectorAll('img');
  console.log(elementstest);

  const addEventListenerByType = (selector, eventType, callback) => {
    const elements = document.querySelectorAll(selector);
    console.log(elements);
    elements.forEach(function(element) {
      element.addEventListener(eventType, callback);
    });
  }

  window.addEventListener('DOMContentLoaded', function() {
    addEventListenerByType('img, h2', 'click', (event) => {
     const target = event.target;
 
     const parent = target.closest('article');
     console.log(parent);
   });
  });
