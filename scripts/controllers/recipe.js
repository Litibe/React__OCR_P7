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
        this._dataTag = undefined;

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
    }

    integrationData() {
        const listingIngredient = [];
        const listingAppliance = [];
        const listingUstensil = [];
        this._dataRecipesFiltered.recipes.forEach((recipe) => {
            if (this._wordSearchBar === undefined) {
                const listIngredient = document.querySelector('#list-search-ingredient');
                recipe.ingredients.forEach((ing) => {
                    const ingLowerCase = ing.ingredient.toLowerCase();
                    if (!(listingIngredient.includes(ingLowerCase))) {
                        const newIng = document.createElement('li');
                        newIng.innerText = ingLowerCase;
                        listIngredient.appendChild(newIng);
                        listingIngredient.push(ingLowerCase);
                    }
                });

                const listAppliance = document.querySelector('#list-search-appliance');
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
                        const applianceLowerCase = recipe.appliance.toLowerCase();
                        if (!(listingAppliance.includes(applianceLowerCase))) {
                            const newAppliance = document.createElement('li');
                            newAppliance.innerText = applianceLowerCase;
                            listAppliance.appendChild(newAppliance);
                            listingAppliance.push(applianceLowerCase);
                        }
                    });
                }
                const listUstensils = document.querySelector('#list-search-ustensils');

                recipe.ustensils.forEach((ustensil) => {
                    const ustensilsLowerCase = ustensil.toLowerCase();
                    if (!(listingUstensil.includes(ustensilsLowerCase))) {
                        const newUstensil = document.createElement('li');
                        newUstensil.innerText = ustensilsLowerCase;
                        listUstensils.appendChild(newUstensil);
                        listingUstensil.push(ustensilsLowerCase);
                    }
                });
            }
        });
    }

    sortRecipe() {
        console.log('word', this._wordSearchBar, this._wordBtnIngredient, this._wordBtnAppliance, this._wordBtnUstensils);

        if (this._wordSearchBar === undefined) {
            this._dataRecipesFiltered = this._dataInitial;
        } else {
            this._dataRecipesFiltered = this._dataInitial;
        }
        this.integrationData();
    }

    get launch() {
        this.detectSearchWord();
        this.sortRecipe();
        if (this._dataInitial.recipes === undefined) {
            const divMain = document.querySelector('main');
            const errorTitle = document.createElement('h2');
            errorTitle.innerText = 'Aucune donnée chargée - contacter le support';
            divMain.appendChild(errorTitle);
        } else {
            this._dataRecipesFiltered.recipes.forEach((dataOneRecipe) => {
                const recipesSection = document.querySelector('.section__recipes');
                const recipe = new RecipeFactory(dataOneRecipe);
                const recipeCardIntoDom = recipe.addCardDOM;
                recipesSection.appendChild(recipeCardIntoDom);
            });
        }

        return true;
    }
}
