class RecipeController {
    constructor(dataRecipes) {
        this._dataInitial = dataRecipes;
        this._dataRecipesFiltered = undefined;

        this._wordSearchBar = '';
        this._wordBtnIngredient = '';
        this._wordBtnAppliance = '';
        this._wordBtnUstensils = '';

        this._dataBtnIngredient = undefined;
        this._dataBtnAppliance = undefined;
        this._dataBtnUstensils = undefined;

        this._dataTagIngredients = [];
        this._dataTagAppliances = [];
        this._dataTagUstensils = [];

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
                this._wordSearchBar = '';
            }
            if (varInitial !== this._wordSearchBar) { this.sortRecipe(); }
        });
        // btn ingredient
        this._btnIngredient.addEventListener('input', (e) => {
            const varInitial = this._wordSearchBar;
            if (e.target.selectionEnd) {
                this._wordBtnIngredient = e.target.value;
            } else {
                this._wordBtnIngredient = '';
            } this.sortRecipe();
            if (varInitial !== this._wordSearchBar) { this.sortRecipe(); }
        });
        document.querySelector('#divIngredient').addEventListener('mouseenter', () => {
            document.querySelector('#search-ingredient').placeholder = 'Rechercher un Ingrédient';
        });
        document.querySelector('#divIngredient').addEventListener('mouseleave', () => {
            document.querySelector('#search-ingredient').placeholder = 'Ingrédients';
            document.querySelector('#search-ingredient').value = '';
        });
        // btn appliance
        this._btnAppliance.addEventListener('input', (e) => {
            const varInitial = this._wordSearchBar;
            if (e.target.selectionEnd) {
                this._wordBtnAppliance = e.target.value;
            } else {
                this._wordBtnAppliance = '';
            } this.sortRecipe();
            if (varInitial !== this._wordSearchBar) { this.sortRecipe(); }
        });
        document.querySelector('#divAppliance').addEventListener('mouseenter', () => {
            document.querySelector('#search-appliance').placeholder = 'Rechercher un Appareil';
        });
        document.querySelector('#divAppliance').addEventListener('mouseleave', () => {
            document.querySelector('#search-appliance').placeholder = 'Appareils';
            document.querySelector('#search-appliance').value = '';
        });
        // btn Ustensils
        this._btnUstensils.addEventListener('input', (e) => {
            const varInitial = this._wordSearchBar;
            if (e.target.selectionEnd) {
                this._wordBtnUstensils = e.target.value;
            } else {
                this._wordBtnUstensils = '';
            } this.sortRecipe();
            if (varInitial !== this._wordSearchBar) {
                this.sortRecipe();
            }
        });
        document.querySelector('#divUstensil').addEventListener('mouseenter', () => {
            document.querySelector('#search-ustensils').placeholder = 'Rechercher un Ustensile';
        });
        document.querySelector('#divUstensil').addEventListener('mouseleave', () => {
            document.querySelector('#search-ustensils').placeholder = 'Ustensiles';
            document.querySelector('#search-ustensils').value = '';
        });
    }

    integrationData() {
        const listingIngredient = [];
        const listingAppliance = [];
        const listingUstensil = [];
        const listIngredient = document.querySelector('#list-search-ingredient');
        listIngredient.replaceChildren();
        const listAppliance = document.querySelector('#list-search-appliance');
        listAppliance.replaceChildren();
        const listUstensils = document.querySelector('#list-search-ustensils');
        listUstensils.replaceChildren();

        this._dataRecipesFiltered.forEach((recipe) => {
            recipe.ingredients.forEach((ing) => {
                const ingLowerCase = ing.ingredient.toLowerCase();
                if (!(listingIngredient.includes(ingLowerCase)
                ) && ingLowerCase.includes(this._wordBtnIngredient)) {
                    const newIng = document.createElement('li');
                    newIng.innerText = ingLowerCase;
                    newIng.setAttribute('tabindex', 0);
                    newIng.setAttribute('title', ingLowerCase);
                    newIng.setAttribute('aria-label', ingLowerCase);
                    listIngredient.appendChild(newIng);
                    newIng.addEventListener('click', (e) => {
                        const name = e.target.innerText.toLowerCase();
                        this._dataTagIngredients.push(name);
                        const newSpan = document.createElement('span');
                        newSpan.innerHTML = `${e.target.innerText}<i class="fa-regular fa-circle-xmark" aria-label="Croix de Suppression"></i>`;
                        newSpan.setAttribute('tabindex', 0);
                        newSpan.setAttribute('aria-label', name);
                        newSpan.classList.add('bg-ingredient');
                        document.querySelector('.tagIngredients').appendChild(newSpan);
                        newSpan.addEventListener('click', (elmt) => {
                            let nameElementLower;
                            if (elmt.target.classList.contains('fa-circle-xmark') === true) {
                                nameElementLower = (
                                    elmt.target.ownerDocument.activeElement.innerText.toLowerCase()
                                );
                                elmt.target.ownerDocument.activeElement.remove();
                            } else {
                                nameElementLower = elmt.target.innerText.toLowerCase();
                                elmt.target.remove();
                            }

                            this._dataTagIngredients = this._dataTagIngredients.filter(
                                (item) => item !== nameElementLower,
                            );
                            this.sortRecipe();
                        });
                        this.sortRecipe();
                    });
                    listingIngredient.push(ingLowerCase);
                }
            });

            if (typeof (recipe.appliance) === 'string') {
                const applianceLowerCase = recipe.appliance.toLowerCase();
                if (!(listingAppliance.includes(applianceLowerCase)
                ) && applianceLowerCase.includes(this._wordBtnAppliance)) {
                    const newAppliance = document.createElement('li');
                    newAppliance.innerText = applianceLowerCase;
                    listAppliance.appendChild(newAppliance);
                    newAppliance.addEventListener('click', (e) => {
                        const name = e.target.innerText.toLowerCase();
                        this._dataTagAppliances.push(name);
                        const newSpan = document.createElement('span');
                        newSpan.innerHTML = `${e.target.innerText}<i class="fa-regular fa-circle-xmark"></i>`;
                        newSpan.classList.add('bg-appliance');
                        newSpan.addEventListener('click', (elmt) => {
                            let nameElementLower;
                            if (elmt.target.classList.contains('fa-circle-xmark') === true) {
                                nameElementLower = (
                                    elmt.target.ownerDocument.activeElement.innerText.toLowerCase()
                                );
                                elmt.target.ownerDocument.activeElement.remove();
                            } else {
                                nameElementLower = elmt.target.innerText.toLowerCase();
                                elmt.target.remove();
                            }
                            this._dataTagAppliances = this._dataTagAppliances.filter(
                                (item) => item !== nameElementLower,
                            );
                            this.sortRecipe();
                        });
                        document.querySelector('.tagAppliances').appendChild(newSpan);
                        this.sortRecipe();
                    });
                    listingAppliance.push(applianceLowerCase);
                }
            } else {
                recipe.appliance.forEach((appliance) => {
                    const applianceLowerCase = appliance.toLowerCase();
                    if (!(listingAppliance.includes(applianceLowerCase)
                    ) && applianceLowerCase.includes(this._wordBtnAppliance)) {
                        const newAppliance = document.createElement('li');
                        newAppliance.innerText = applianceLowerCase;
                        listAppliance.appendChild(newAppliance);
                        newAppliance.addEventListener('click', (e) => {
                            const name = e.target.innerText.toLowerCase();
                            this._dataTagAppliances.push(name);
                            const newSpan = document.createElement('span');
                            newSpan.innerHTML = `${e.target.innerText}<i class="fa-regular fa-circle-xmark"></i>`;
                            newSpan.classList.add('bg-appliance');
                            document.querySelector('.tagAppliances').appendChild(newSpan);
                            newSpan.addEventListener('click', (elmt) => {
                                let nameElementLower;
                                if (elmt.target.classList.contains('fa-circle-xmark') === true) {
                                    nameElementLower = (
                                        elmt.target.ownerDocument.activeElement.innerText
                                    );
                                    nameElementLower = nameElementLower.toLowerCase();
                                    elmt.target.ownerDocument.activeElement.remove();
                                } else {
                                    nameElementLower = elmt.target.innerText.toLowerCase();
                                    elmt.target.remove();
                                }
                                this._dataTagAppliances = this._dataTagAppliances.filter(
                                    (item) => item !== nameElementLower,
                                );
                                this.sortRecipe();
                            });
                            this.sortRecipe();
                        });
                        listingAppliance.push(applianceLowerCase);
                    }
                });
            }

            recipe.ustensils.forEach((ustensil) => {
                const ustensilsLowerCase = ustensil.toLowerCase();
                if (!(listingUstensil.includes(ustensilsLowerCase)
                ) && ustensilsLowerCase.includes(this._wordBtnUstensils)) {
                    const newUstensil = document.createElement('li');
                    newUstensil.innerText = ustensilsLowerCase;
                    listUstensils.appendChild(newUstensil);
                    newUstensil.addEventListener('click', (e) => {
                        const name = e.target.innerText.toLowerCase();
                        this._dataTagUstensils.push(name);
                        const newSpan = document.createElement('span');
                        newSpan.innerHTML = `${e.target.innerText}<i class="fa-regular fa-circle-xmark"></i>`;
                        newSpan.classList.add('bg-ustensils');
                        document.querySelector('.tagUstensils').appendChild(newSpan);
                        newSpan.addEventListener('click', (elmt) => {
                            let nameElementLower;
                            if (elmt.target.classList.contains('fa-circle-xmark') === true) {
                                nameElementLower = (
                                    elmt.target.ownerDocument.activeElement.innerText.toLowerCase()
                                );
                                elmt.target.ownerDocument.activeElement.remove();
                            } else {
                                elmt.target.remove();
                                nameElementLower = elmt.target.innerText.toLowerCase();
                            }
                            this._dataTagUstensils = this._dataTagUstensils.filter(
                                (item) => item !== nameElementLower,
                            );
                            this.sortRecipe();
                        });
                        this.sortRecipe();
                    });
                    listingUstensil.push(ustensilsLowerCase);
                }
            });
        });

        // integration DOM recipes
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
        if (this._wordSearchBar === '' && this._dataTagIngredients.length === 0
        && this._dataTagAppliances.length === 0
        && this._dataTagUstensils.length === 0) {
            // step 0 initial
            this._dataRecipesFiltered = this._dataInitial.recipes;
        } else {
            const wordBar = this._wordSearchBar.toLowerCase();
            this._dataRecipesFiltered = this._dataInitial.recipes.filter((recipe) => {
                const nameRecipe = recipe.name.toLowerCase();
                const descriptionRecipe = recipe.description.toLowerCase();
                let ingredientDetected = false;
                let wordDetected = false;
                // ********************** fct detect Ing ********************** //
                const ingRecipe = [];
                recipe.ingredients.map(
                    (ing) => {
                        const nameIng = ing.ingredient.toLowerCase();
                        ingRecipe.push(nameIng);
                        // detect if searchBar word into name/ing/descp Recipe
                        if (wordBar !== '') {
                            if (nameIng.includes(wordBar) || (
                                this._dataTagIngredients.includes(nameIng))
                            ) {
                                wordDetected = true;
                            }
                        }
                        return true;
                    },
                );
                // if tagIngredient
                if (
                    this._dataTagIngredients.length !== 0
                ) {
                    ingredientDetected = false;
                    // if all TagIngredient into list Ings of Recipe
                    const allFoundedIng = this._dataTagIngredients.every(
                        (tagIng) => ingRecipe.includes(tagIng),
                    );
                    if (allFoundedIng === true) {
                        ingredientDetected = true;
                    }
                }
                // ********************** fct detect Appliance ********************** //
                // detect appliance
                let applianceDetected = false;
                const appliancesRecipe = [];
                if (typeof (recipe.appliance) === 'string') {
                    const nameAppliance = recipe.appliance.toLowerCase();
                    appliancesRecipe.push(nameAppliance);
                } else {
                    recipe.appliance.map(
                        (appliance) => {
                            const nameAppliance = appliance.toLowerCase();
                            appliancesRecipe.push(nameAppliance);
                            return true;
                        },
                    );
                }
                if (this._dataTagAppliances.length !== 0) {
                    applianceDetected = false;
                    // if all TagIngredient into list Ings of Recipe
                    const allFoundedAppliance = this._dataTagAppliances.every(
                        (tagApp) => appliancesRecipe.includes(tagApp),
                    );
                    // if tagAppliance into recipe and wordDetected into recipe
                    if (allFoundedAppliance === true && wordDetected) {
                        applianceDetected = true;
                    }
                }
                // ********************** fct detect Ustensils ********************** //
                let ustensilsDetected = false;
                const ustensilsRecipe = [];
                recipe.ustensils.map(
                    (ustensil) => {
                        const nameUstensil = ustensil.toLowerCase();
                        ustensilsRecipe.push(nameUstensil);
                        return true;
                    },
                );
                // if tagIngredient
                if (
                    this._dataTagUstensils.length !== 0
                ) {
                    // if all TagIngredient into list Ings of Recipe
                    const allFoundedUstensils = this._dataTagUstensils.every(
                        (tagUstensil) => ustensilsRecipe.includes(tagUstensil),
                    );
                    if (allFoundedUstensils === true) {
                        ustensilsDetected = true;
                    }
                }
                // ********************** fct integration recipe into list or not  ************* //

                // if wordIntoBar in name/description/ingredients
                if (wordBar !== '' && this._dataTagIngredients.length === 0 && (
                    this._dataTagAppliances.length === 0 && (
                        this._dataTagUstensils.length === 0))) {
                    if ((nameRecipe.includes(wordBar)
                    ) || (descriptionRecipe.includes(wordBar) || (ingredientDetected === true)
                    )) {
                        return recipe;
                    }
                } else if (
                    // 3 Sort of TAG IAU
                    this._dataTagIngredients.length !== 0 && (
                        this._dataTagAppliances.length !== 0 && (
                            this._dataTagUstensils.length !== 0))) {
                    if (ingredientDetected === true
                        && applianceDetected === true
                            && ustensilsDetected === true) { return recipe; }
                } else if (
                    // 2 Sort of Tag IA
                    this._dataTagIngredients.length !== 0
                    && this._dataTagAppliances.length !== 0
                        && this._dataTagUstensils.length === 0) {
                    if (ingredientDetected === true && applianceDetected === true) {
                        return recipe;
                    }
                } else if (
                    // 2 Sort of Tag IU
                    this._dataTagIngredients.length !== 0
                    && this._dataTagAppliances.length === 0
                        && this._dataTagUstensils.length !== 0) {
                    if (ingredientDetected === true && ustensilsDetected === true) {
                        return recipe;
                    }
                } else if (
                    // 2 Sort of Tag AU
                    this._dataTagIngredients.length === 0
                    && this._dataTagAppliances.length !== 0
                        && this._dataTagUstensils.length !== 0) {
                    if (applianceDetected === true && ustensilsDetected === true) {
                        return recipe;
                    }
                } else if (
                    // 1 Sort of Tag I
                    this._dataTagIngredients.length !== 0
                    && this._dataTagAppliances.length === 0
                        && this._dataTagUstensils.length === 0) {
                    if (ingredientDetected === true) {
                        return recipe;
                    }
                } else if (
                    // 1 Sort of Tag A
                    this._dataTagIngredients.length === 0
                    && this._dataTagAppliances.length !== 0
                        && this._dataTagUstensils.length === 0) {
                    if (applianceDetected === true) {
                        return recipe;
                    }
                } else if (
                    // 1 Sort of Tag U
                    this._dataTagIngredients.length === 0
                    && this._dataTagAppliances.length === 0
                        && this._dataTagUstensils.length !== 0) {
                    if (ustensilsDetected === true) {
                        return recipe;
                    }
                } else if (
                    // 0 Sort of  TAGS
                    this._dataTagIngredients.length === 0
                    && this._dataTagAppliances.length === 0
                        && this._dataTagUstensils.length === 0) {
                    return recipe;
                }
                return null;
            });
        }

        // launch integration
        this.integrationData();
    }

    get launch() {
        this.detectSearchWord();
        this.sortRecipe();
        return true;
    }
}
