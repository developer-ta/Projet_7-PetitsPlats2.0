import { HttpClient } from "./services/api/HttpClient.js";

class App {
	constructor () {
		this.http = new HttpClient();
		this.viewModel = new this.ViewModel();
		this.data;


	}

	async main() {
		debugger;
		//api
		const urlRecipes = '/data/recipes.json'
		try {
			this.data = await this.http.getDataList(urlRecipes);
			console.log('data: ', this.data);
		} catch (error) {

			console.log('error: ', error);
		}
		//set model


	}

}

new App().main();