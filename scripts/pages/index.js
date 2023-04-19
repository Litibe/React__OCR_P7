async function getDataApi() {
    try {
        const response = await fetch('./data/recipes.json');
        return response.json();
    } catch {
    // if not data, error page loaded
        return undefined;
    }
}

const init = async () => {
    const dataReceived = await getDataApi();
    interfaceRecipe = new RecipeController(dataReceived);
    const { launch } = interfaceRecipe;
};

init();
