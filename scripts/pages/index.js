async function getDataApi() {
    try {
        const response = await fetch('./data/recipes.json');
        const data = await response.json();
        return data;
    } catch {
    // if not data, error page loaded
        return undefined;
    }
}

const init = async () => {
    const dataReceived = await getDataApi();
    interfaceRecipe = new RecipeController(dataReceived);
    const open = interfaceRecipe.launch;
};

init();
