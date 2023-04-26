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
        article.setAttribute(
            'tabindex',
            '0',
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
        article.addEventListener('click', (e) => {
            displayModal();
            this.addIntoModalDOM();
        });
        return article;
    }

    get addIntoModalDOM() {
        const titleModal = document.querySelector('.modal-header h2');
        titleModal.innerText = `Recette  ${this.recipe.name}`;

        const contentModal = document.querySelector('.modal-content');
        contentModal.replaceChildren();
        // part IMG
        const divImg = document.createElement('div');
        divImg.classList.add('divImg');
        const img = document.createElement('img');
        img.setAttribute('src', this.recipe.img);
        img.setAttribute('aria-label', 'Photo de la recette');
        img.setAttribute('alt', ` ${this.recipe.name}`);
        img.setAttribute('loading', 'lazy');
        divImg.appendChild(img);
        contentModal.appendChild(divImg);

        // Container IAU
        const containerIAU = document.createElement('div');
        containerIAU.classList.add('container-IAU');

        // Container INGREDIENT
        const containerI = document.createElement('div');
        containerI.classList.add('container-ingredient');
        const btnIngredient = document.createElement('span');
        btnIngredient.innerText = 'Ingrédients : ';
        btnIngredient.classList.add('btn_modal');
        btnIngredient.classList.add('bg-ingredient');
        const ulIngredient = document.createElement('ul');
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
        containerI.appendChild(btnIngredient);
        containerI.appendChild(ulIngredient);
        // Container APpliance
        const containerA = document.createElement('div');
        containerA.classList.add('container-appliance');
        const btnAppliance = document.createElement('span');
        btnAppliance.innerText = 'Appareils : ';
        btnAppliance.classList.add('btn_modal');
        btnAppliance.classList.add('bg-appliance');
        const ulAppliance = document.createElement('ul');
        const newLi = document.createElement('li');
        newLi.innerHTML = `<span class="name_ing">${this.recipe.appliance}<span>`;
        ulAppliance.appendChild(newLi);
        containerA.appendChild(btnAppliance);
        containerA.appendChild(ulAppliance);
        // Container Ustensil
        const containerU = document.createElement('div');
        containerU.classList.add('container-ustensil');
        const btnUstensil = document.createElement('span');
        btnUstensil.innerText = 'Ustensils : ';
        btnUstensil.classList.add('btn_modal');
        btnUstensil.classList.add('bg-ustensils');
        const ulUstensil = document.createElement('ul');
        this.recipe.ustensils.forEach((element) => {
            const newLiUsten = document.createElement('li');
            newLiUsten.innerHTML = `<span class="name_ing">${element}<span>`;
            ulUstensil.appendChild(newLiUsten);
        });
        containerU.appendChild(btnUstensil);
        containerU.appendChild(ulUstensil);
        //
        containerIAU.appendChild(containerI);
        containerIAU.appendChild(containerA);
        containerIAU.appendChild(containerU);
        contentModal.appendChild(containerIAU);
        // part time Serving
        const divTimeServing = document.createElement('div');
        divTimeServing.innerHTML = `<i class="fa-regular fa-clock"></i> <span class="name_ing">${this.recipe.time} <i class="fa-solid fa-chart-pie"></i> ${this.recipe.servings}<span>`;
        divTimeServing.classList.add('divTimeServing');
        contentModal.appendChild(divTimeServing);
        // part description
        const divDescription = document.createElement('div');
        const titleDescription = document.createElement('h3');
        titleDescription.innerText = 'Description';
        divDescription.appendChild(titleDescription);
        const description = document.createElement('div');
        description.innerText = this.recipe.description;
        divDescription.appendChild(description);
        contentModal.appendChild(divDescription);
        return true;
    }
}
