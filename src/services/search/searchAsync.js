import { HomeController } from "../../controllers/HomeController.js";
import { isExciteOrNotEmpty } from "../utils/validator.js";

export class searchAsync {

	constructor (recipeViewModel) {


		this.$searchInput = document.querySelector('#user_input');

		this._recipes = recipeViewModel.recipes

		this._valUserInReg = null;

		this.resultRecipes = null;

		this.init();
	}


	init() {

		HomeController.mainDisplay(this._recipes);
		;
		this.bindEventSearch();

	}

	bindEventSearch() {

		let $searchInput = document.querySelector('#user_input');

		let $search_btn = document.querySelector('.bi-search');
		$search_btn.addEventListener("click", async (ev) => {

			ev.preventDefault();

			if ($searchInput.value.length < 3 && isExciteOrNotEmpty(this._recipes)) {
				HomeController.mainDisplay(this._recipes);
				return;
			}

			this.resultRecipes = [];

			this.resultRecipes = await this.getResultMultiThreadsSearch();

			if (isExciteOrNotEmpty(this.resultRecipes)) {

				HomeController.mainDisplay(this.resultRecipes)

			}
			//by default this.resultRecipes=[]
			HomeController.mainDisplay(this.resultRecipes)


		})
	}

	get ValUserInRegExp() {

		let $searchInput = document.querySelector('#user_input');


		let valInput = $searchInput.value

		if (valInput.length >= 3) {
			///\bc(oc)\b/gim 
			// new RegExp(`\\b${valInput}\\w+`, "gim");
			// new RegExp(`\\b${valInput}\\w`, "gim");
			// new RegExp(`\\b${valInput}`, "gim");
			return this._valUserInReg = new RegExp(`\\b${valInput}`, "gim");
		}
		return null;

	}

	searchUserIn = async (start, end) => {
		debugger
		let foundIndexes = []

		if (!this.ValUserInRegExp) return foundIndexes

		const resultPromise = new Promise(resolve => {
			for (let index = start; index < end; index++) {

				const { name, ingredients, description } = this._recipes[index];

				if (name.search(this._valUserInReg) !== -1 ||
					description.search(this._valUserInReg) !== -1 ||
					ingredients.map(obj => obj.ingredient).toString().search(this._valUserInReg) !== -1) {

					foundIndexes.push(this._recipes[index]);
				}

			}

			resolve(foundIndexes);
		})


		return resultPromise;

	}
	getResultMultiThreadsSearch = async () => {
		debugger
		const maxThread = 4;
		const lengthArr = this._recipes.length
		let lot = lengthArr / maxThread
		const promises = []

		for (let i = 0; i < maxThread; i++) {
			//Math.floor(lot + i * lot)
			let lotStart = Math.floor(i * lot)//0:0,1:lot,2:2
			let lotEnd = Math.floor((i + 1) * lot)
			//res type []
			promises.push(this.searchUserIn(lotStart, lotEnd))
		}
		const res = await Promise.all(promises);
		return res.flat()
	}







}