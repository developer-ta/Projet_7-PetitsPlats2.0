import { HomeController } from "../../controllers/HomeController.js";
import { isExciteOrNotEmpty } from "../utils/validator.js";

export class searchAsync {

	constructor (recipeViewModel) {
		debugger

		this.$searchInput = document.querySelector('#user_input');

		this._recipes = recipeViewModel.recipes

		this._valUserInReg = null;

		this.indexList = null;

		this.resultRecipes = null;

		this.init();
	}


	init() {

		HomeController.mainDisplay(this._recipes);
		debugger;
		this.bindEventSearch();

	}

	bindEventSearch() {
		
		let $searchInput = document.querySelector('#user_input');

		let $search_btn = document.querySelector('.bi-search');
		$search_btn.addEventListener("click", async (ev) => {

			ev.preventDefault();

			debugger

			if ($searchInput.value.length < 3 && isExciteOrNotEmpty(this._recipes)) {
				HomeController.mainDisplay(this._recipes);
				return;
			}

			this.indexList = [];
			this.resultRecipes = [];


			this.indexList = await this.searchResult();

			if (this.indexList.length > 0) {


				this.resultRecipes = this.Result(this.indexList)

				if (isExciteOrNotEmpty(this.resultRecipes)) HomeController.mainDisplay(this.resultRecipes)

			}
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

	searchUserIn = async () => {

		let i = []
		if (this.ValUserInRegExp) {

			this._recipes.forEach(
				({ name, ingredients, description }, index) => {

					if (name.concat('', ingredients.map(obj => obj.ingredient).toString(), '', description).search(this._valUserInReg) !== -1) {

						i.push(index);

					}

				}
			)
		}

		return i


	}


	searchResult = async () => {

		const res = await this.searchUserIn();

		return res;



	}

	Result = (indexList => {
		let res = []
		indexList.forEach(i => res.push(this._recipes.at(i)))

		return res
	})




}
