class RecipeController {
    constructor(dataRecipes) {
        this._dataInitial = dataRecipes;
        this._dataRecipesFiltered = undefined;

        this._wordSearchBar = undefined;
        this._wordBtnIngredient = undefined;
        this._wordBtnAppliance = undefined;
        this._wordBtnUstensils = undefined;

        this._dataBtnIngredient = undefined;
        this._dataBtnAppliance = undefined;
        this._dataBtnUstensils = undefined;
        this._dataTag = {};

        this._btnIngredient = document.querySelector('#search-ingredient');
        this._btnAppliance = document.querySelector('#search-appliance');
        this._btnUstensils = document.querySelector('#search-ustensils');
    }

    detectSearchWord() {
        // search bar
        const minCharactersWord = 3;
        const searchBar = document.querySelector('#search-recipe');
        searchBar.addEventListener('input', (e) => {
            const varInitial = this._wordSearchBar;
            if (e.target.selectionEnd >= minCharactersWord) {
                this._wordSearchBar = e.target.value;
            } else {
                this._wordSearchBar = undefined;
            }
            if (varInitial !== this._wordSearchBar) { this.sortRecipe(); }
        });
        // btn ingredient
        this._btnIngredient.addEventListener('input', (e) => {
            const varInitial = this._wordSearchBar;
            if (e.target.selectionEnd >= minCharactersWord) {
                this._wordBtnIngredient = e.target.value;
            } else {
                this._wordBtnIngredient = undefined;
            } this.sortRecipe();
            if (varInitial !== this._wordSearchBar) { this.sortRecipe(); }
        });
        document.querySelector('#divIngredient').addEventListener('mouseenter', () => {
            document.querySelector('#search-ingredient').placeholder = 'Rechercher un Ingrédient';
        });
        document.querySelector('#divIngredient').addEventListener('mouseleave', () => {
            document.querySelector('#search-ingredient').placeholder = 'Ingrédients';
        });
        // btn appliance
        this._btnAppliance.addEventListener('input', (e) => {
            const varInitial = this._wordSearchBar;
            if (e.target.selectionEnd >= minCharactersWord) {
                this._wordBtnAppliance = e.target.value;
            } else {
                this._wordBtnAppliance = undefined;
            } this.sortRecipe();
            if (varInitial !== this._wordSearchBar) { this.sortRecipe(); }
        });
        document.querySelector('#divAppliance').addEventListener('mouseenter', () => {
            document.querySelector('#search-appliance').placeholder = 'Rechercher un Appareil';
        });
        document.querySelector('#divAppliance').addEventListener('mouseleave', () => {
            document.querySelector('#search-appliance').placeholder = 'Appareils';
        });
        // btn Ustensils
        this._btnUstensils.addEventListener('input', (e) => {
            const varInitial = this._wordSearchBar;
            if (e.target.selectionEnd >= minCharactersWord) {
                this._wordBtnUstensils = e.target.value;
            } else {
                this._wordBtnUstensils = undefined;
            } this.sortRecipe();
            if (varInitial !== this._wordSearchBar) { this.sortRecipe(); }
        });
        document.querySelector('#divUstensil').addEventListener('mouseenter', () => {
            document.querySelector('#search-ustensils').placeholder = 'Rechercher un Ustensile';
        });
        document.querySelector('#divUstensil').addEventListener('mouseleave', () => {
            document.querySelector('#search-ustensils').placeholder = 'Ustensiles';
        });
    }

    integrationData() {
        const listingIngredient = [];
        const listingAppliance = [];
        const listingUstensil = [];
        console.log(this._dataRecipesFiltered);
        const listIngredient = document.querySelector('#list-search-ingredient');
        listIngredient.replaceChildren();
        const listAppliance = document.querySelector('#list-search-appliance');
        listAppliance.replaceChildren();
        const listUstensils = document.querySelector('#list-search-ustensils');
        listUstensils.replaceChildren();
        this._dataRecipesFiltered.forEach((recipe) => {
            recipe.ingredients.forEach((ing) => {
                const ingLowerCase = ing.ingredient.toLowerCase();
                if (!(listingIngredient.includes(ingLowerCase))) {
                    const newIng = document.createElement('li');
                    newIng.innerText = ingLowerCase;
                    listIngredient.appendChild(newIng);
                    listingIngredient.push(ingLowerCase);
                }
            });

            if (typeof (recipe.appliance) === 'string') {
                const applianceLowerCase = recipe.appliance.toLowerCase();
                if (!(listingAppliance.includes(applianceLowerCase))) {
                    const newAppliance = document.createElement('li');
                    newAppliance.innerText = applianceLowerCase;
                    listAppliance.appendChild(newAppliance);
                    listingAppliance.push(applianceLowerCase);
                }
            } else {
                recipe.appliance.forEach((appliance) => {
                    const applianceLowerCase = appliance.toLowerCase();
                    if (!(listingAppliance.includes(applianceLowerCase))) {
                        const newAppliance = document.createElement('li');
                        newAppliance.innerText = applianceLowerCase;
                        listAppliance.appendChild(newAppliance);
                        listingAppliance.push(applianceLowerCase);
                    }
                });
            }

            recipe.ustensils.forEach((ustensil) => {
                const ustensilsLowerCase = ustensil.toLowerCase();
                if (!(listingUstensil.includes(ustensilsLowerCase))) {
                    const newUstensil = document.createElement('li');
                    newUstensil.innerText = ustensilsLowerCase;
                    listUstensils.appendChild(newUstensil);
                    listingUstensil.push(ustensilsLowerCase);
                }
            });
        });
        // intégration recipes
        const recipesSection = document.querySelector('.section__recipes');
        recipesSection.replaceChildren();
        if (this._dataInitial.recipes === undefined) {
            const divMain = document.querySelector('main');
            const errorTitle = document.createElement('h2');
            errorTitle.innerText = 'Aucune donnée chargée - contacter le support';
            divMain.appendChild(errorTitle);
        } else {
            this._dataRecipesFiltered.forEach((dataOneRecipe) => {
                const recipe = new RecipeFactory(dataOneRecipe);
                const recipeCardIntoDom = recipe.addCardDOM;
                recipesSection.appendChild(recipeCardIntoDom);
            });
        }
    }

    sortRecipe() {
        console.log('word', this._wordSearchBar, this._wordBtnIngredient, this._wordBtnAppliance, this._wordBtnUstensils);

        if (this._wordSearchBar === undefined && (
            this._wordBtnIngredient === undefined) && (
            this._wordBtnAppliance === undefined) && (
            this._wordBtnUstensils === undefined)) {
            this._dataRecipesFiltered = this._dataInitial.recipes;
        } else {
            const wordBar = this._wordSearchBar.toLowerCase();
            this._dataRecipesFiltered = this._dataInitial.recipes.filter((recipe) => {
                const nameRecipe = recipe.name.toLowerCase();

                if (nameRecipe.includes(wordBar)) { return recipe; }
            });
        }
        this.integrationData();
    }

    get launch() {
        this.detectSearchWord();
        this.sortRecipe();

        return true;
    }
}
