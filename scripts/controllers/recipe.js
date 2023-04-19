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
    }

    detectSearchWord() {
        // search bar
        const minCharactersWord = 3;
        const searchBar = document.querySelector('#search-recipe');
        searchBar.addEventListener('input', (e) => {
            if (e.target.selectionEnd >= minCharactersWord) {
                this._wordSearchBar = e.target.value;
            } else {
                this._wordSearchBar = undefined;
            } this.sortRecipe();
        });
        // btn ingredient
        const btnIngredient = document.querySelector('#search-ingredient');
        btnIngredient.addEventListener('input', (e) => {
            if (e.target.selectionEnd >= minCharactersWord) {
                this._wordBtnIngredient = e.target.value;
            } else {
                this._wordBtnIngredient = undefined;
            } this.sortRecipe();
        });
        // btn appliance
        const btnAppliance = document.querySelector('#search-appliance');
        btnAppliance.addEventListener('input', (e) => {
            if (e.target.selectionEnd >= minCharactersWord) {
                this._wordBtnAppliance = e.target.value;
            } else {
                this._wordBtnAppliance = undefined;
            } this.sortRecipe();
        });
        // btn Ustensils
        const btnUstensils = document.querySelector('#search-ustensils');
        btnUstensils.addEventListener('input', (e) => {
            if (e.target.selectionEnd >= minCharactersWord) {
                this._wordBtnUstensils = e.target.value;
            } else {
                this._wordBtnUstensils = undefined;
            } this.sortRecipe();
        });
    }

    sortRecipe() {
        console.log('word', this._wordSearchBar, this._wordBtnIngredient, this._wordBtnAppliance, this._wordBtnUstensils);

        if (this._wordSearchBar === undefined) {
            this._dataRecipesFiltered = this._dataInitial;
        } else {
            this._dataRecipesFiltered = this._dataInitial;
        }
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
