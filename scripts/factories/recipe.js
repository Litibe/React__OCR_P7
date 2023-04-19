class RecipeFactory {
    constructor(dataRecipe) {
        this.recipe = new Recipe(dataRecipe);
    }

    get addCardDOM() {
        const article = document.createElement('article');
        article.classList.add('card-recipe');
        article.setAttribute(
            'aria-label',
            `Présentation de la recette ${this.recipe.name}`,
        );
        // part IMG
        const img = document.createElement('img');
        img.setAttribute('src', this.recipe.img);
        img.setAttribute('aria-label', 'Photo de la recette');
        img.setAttribute('alt', ` ${this.recipe.name}`);
        img.setAttribute('loading', 'lazy');
        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');
        cardImg.appendChild(img);
        article.appendChild(cardImg);
        // create container card
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        // part title
        const titleCard = document.createElement('div');
        titleCard.classList.add('card-title');
        const h2 = document.createElement('h2');
        h2.textContent = this.recipe.name;
        titleCard.appendChild(h2);
        const time = document.createElement('div');
        time.classList.add('card-title-time');
        const iconTime = document.createElement('span');
        iconTime.innerHTML = '<i class="fa-regular fa-clock"></i>';
        time.appendChild(iconTime);
        const textTime = document.createElement('span');
        textTime.innerText = this.recipe.time;
        time.appendChild(textTime);
        titleCard.appendChild(time);
        cardContainer.appendChild(titleCard);
        // part detail
        const divDetails = document.createElement('div');
        divDetails.classList.add('card-container-details');
        // part ingredients
        const ulIngredient = document.createElement('ul');
        ulIngredient.classList.add('card-container-details-listIng');
        ulIngredient.setAttribute(
            'aria-label',
            `Liste des ingrédient constituant la recette : ${this.recipe.name}`,
        );
        this.recipe.ingredients.forEach((element) => {
            const newLi = document.createElement('li');
            let quantity = '';
            if (element.quantity !== undefined) {
                quantity += ' : ';
                quantity += element.quantity;
            }
            if (element.unit !== undefined) {
                quantity += ' ';
                quantity += element.unit;
            }
            newLi.innerHTML = `<span class="name_ing">${element.ingredient}<span> <span class="quantity_ing">${quantity}</span>`;
            ulIngredient.appendChild(newLi);
        });
        divDetails.appendChild(ulIngredient);
        // part description
        const divDescription = document.createElement('div');
        divDescription.classList.add('card-container-divDescription');
        divDescription.innerText = this.recipe.description;
        divDetails.appendChild(divDescription);
        cardContainer.appendChild(divDetails);
        article.appendChild(cardContainer);
        return article;
    }
}
