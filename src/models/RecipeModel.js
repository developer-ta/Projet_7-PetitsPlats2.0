import { isExciteOrNotEmpty } from "../services/utils/validator.js";

export class RecipeModel {
	constructor (data) {

		const { recipes } = data;
		this._recipes = recipes;

		//build proto for search

		this._prototypeSearchModel = this.prototypeSearchModelBuilder(this._recipes);

		this.isStocked = false;

		//set recipes
		this.recipes = this._recipes;

		//set proto
		this.prototypeSearchModel = this._prototypeSearchModel;
	}

	get recipes() {

		if (isExciteOrNotEmpty(this._recipes)) {

			return this._recipes
		}

		return (this.getLocalStorage('recipes'))
	}

	get prototypeSearchModel() {
		if (isExciteOrNotEmpty(this._prototypeSearchModel)) {
			return this._prototypeSearchModel

		}
		return (this.getLocalStorage('recipesPrototype'))
	}

	/**
	 * @param {[]} recipes
	 */

	set recipes(recipes) { this.setLocalStorage("recipes", recipes); }

	set prototypeSearchModel(prototypeSearch) {

		this.setLocalStorage("recipesPrototype", prototypeSearch);
	}

	setLocalStorage(key, recipes) {

		if (this.getLocalStorage(key) == null || isExciteOrNotEmpty(recipes)) {

			let recipesStr = JSON.stringify(recipes)
			localStorage.setItem(key, recipesStr);

			this.isStocked = true;
		}

		this.isStocked = false;
	}

	getLocalStorage(key) {

		const data = localStorage.getItem(key);

		if (data != null) {
			return JSON.parse(data)
		}
		return null;
	}

	chuckData(recipes) { }

	/**
		 * @param {[]} recipes
	*/
	prototypeSearchModelBuilder(recipes) {

		if (isExciteOrNotEmpty(recipes)) {

			//build search obj list
			const searchList = recipes.map(({ name, ingredients, description }, index) => {

			//interface search obj
			const searchObj = {
				index: 0,
				name: '',
				ingredients: [],
				description: ''
				};

				//tack only ingredient list
				searchObj.ingredients =
					ingredients
						.map(({ ingredient }) => ingredient)
						.sort((a, b) => {
							a.localeCompare(b)
						});

				//index use for find element 
				searchObj.index = index;
				searchObj.description = description;
				searchObj.name = name;

				return searchObj;
			});

			return searchList.sort((a, b) => (a.name).localeCompare(b.name));
		}

		return null;
	}


}
