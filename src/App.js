//import { HomeController } from "./controllers/HomeController.js";
import { RecipeModel } from "./models/RecipeModel.js";
import { HttpClient } from "./services/api/HttpClient.js";
import { searchAsync } from "./services/search/searchAsync.js";

class App {
	constructor () {

		//api
		this.http = new HttpClient();

		//model
		this.recipeViewModel = null;

		this.data = null;

		this._recipes = null;

		this._prototypeSearchModel = null;

		this.search = null;
	}

	async main() {


		//api url
		const urlRecipes = './data/recipes.json'
		try {
			this.data = await this.http.getDataList(urlRecipes);
			console.log('data: ', this.data);
		} catch (error) {

			console.log('error: ', error);
		}

		if (this.data) {

			//set model 
			this.recipeViewModel = new RecipeModel(this.data)
				;
			this.search = new searchAsync(this.recipeViewModel)
		}

	}

}

new App().main();