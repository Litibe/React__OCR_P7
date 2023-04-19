async function getDataApi() {
    try {
        const response = await fetch('./data/recipes.json');
        return response.json();
    } catch {
    // if not data, error page loaded
        return undefined;
    }
}

const displayData = (dataReceived) => {
    const recipesSection = document.querySelector('.section__recipes');
    if (dataReceived.recipes === undefined) {
        const errorTitle = document.createElement('h2');
        errorTitle.innerText = 'Aucune donnée à afficher';
        recipesSection.appendChild(errorTitle);
    } else {
        dataReceived.recipes.forEach((dataOneRecipe) => {
            const recipe = new RecipeFactory(dataOneRecipe);
            const recipeCardIntoDom = recipe.addCardDOM;
            recipesSection.appendChild(recipeCardIntoDom);
        });
    }
};

const init = async () => {
    const dataReceived = await getDataApi();
    displayData(dataReceived);
};

init();
