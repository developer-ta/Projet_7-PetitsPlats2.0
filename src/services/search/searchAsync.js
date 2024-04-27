import { HomeController } from "../../controllers/HomeController.js";
import { isExciteOrNotEmpty } from "../utils/validator.js";

export class searchAsync {

	constructor (recipeViewModel) {

		this.$searchInput = document.querySelector('#user_input');

		this._prototypeSearchModel = recipeViewModel.prototypeSearchModel

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

			debugger

			ev.preventDefault();


			if ($searchInput.value.length < 3 && isExciteOrNotEmpty(this._recipes)) {
				HomeController.mainDisplay(this._recipes);
				return;

			}

			this.indexList?.clear();
			this.resultRecipes = [];

			let res = await this.searchResult();

			if (res.length > 0) {

				this.indexList = new Set(res);
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

	nameSearch = () => {

		let i = []
		if (this.ValUserInRegExp) {

			this._prototypeSearchModel.forEach(
				({ name, index }) => {
					
					if (name.match(this._valUserInReg)) {

						i.push(index);

					}

				}
			)
		}
		console.log('indexList: ', this.indexList?.size);
		return i
	}

	ingredientSearch = () => {

		let i = []

		if (this.ValUserInRegExp) {

			this._prototypeSearchModel.forEach(

				({ ingredients, index }) => {

					ingredients.forEach(ingredient => {

						if (ingredient.match(this._valUserInReg)) {

							i.push(index);

						}

					}
					)

				}
			)
		}
		
		return i
	}

	descriptionSearch() {
		let i = []
		if (this.ValUserInRegExp) {

			this._prototypeSearchModel.forEach(
				({ description, index }) => {
					
					if (description.match(this._valUserInReg)) {

						i.push(index);

					}

				}
			)
		}

		return i
	}

	searchResult = async () => {
		
		const [name, ing, desc] = await Promise
			.all([this.nameSearch(), this.ingredientSearch(), this.descriptionSearch()]);
		
		return [...name, ...ing, ...desc];

	}

	Result = (indexList => {
		let res = []
		
		indexList.forEach(i => res.push(this._recipes.at(i)))

		return res
	})




}
