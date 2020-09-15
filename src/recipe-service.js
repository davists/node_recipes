const fetch = require("node-fetch");

class ServiceRecipe {
    static async getRecipesByIngredients(ingredients) {
        let recipeResponse = {
            'keywords': ingredients.split(','),
            'recipes': [],
        }
        let url = 'http://www.recipepuppy.com/api/?i=' + ingredients
        const recipes = await fetch(url).then(r => r.text()).catch(error => { throw error})
        const recipesSet =  JSON.parse(recipes)['results']

        for (const idx in recipesSet) {
            let response = {}
            response['title'] = recipesSet[idx]['title']
            response['ingredients'] = recipesSet[idx]['ingredients']
            response['link'] = recipesSet[idx]['href']
            response['gif'] = await ServiceRecipe.getGiphy(recipesSet[idx]['title']).then(r=>r).catch(error => {throw error})
            recipeResponse['recipes'].push(response)
          }
        
        return recipeResponse
    }
    
    static async getGiphy(recipeTitle) {
        const encodedRecipeTitle = encodeURI(recipeTitle)
        const url = 'http://api.giphy.com/v1/gifs/search?api_key=Vfn1KgVVJvJVZFbSDyqQUZoopHBDzVOD&lang=en&limit=1&q=' + encodedRecipeTitle
        const giphy = await fetch(url).then(r => r.json()).catch(error => { throw error})
        return giphy['data'][0]['images']['preview_gif']['url'];
    }
}

class Recipe {
    getAll(ingredients) {
        return ServiceRecipe.getRecipesByIngredients(ingredients).then(r => r).catch(error => { throw error})
    }
}

module.exports = {'Recipe': new Recipe()};