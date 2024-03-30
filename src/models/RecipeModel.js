import { isExciteOrNotEmpty } from "../services/utils/validator.js";

class RecipeModel {
	constructor (data) {
		debugger;
		this._recipes = data;
		this._prototypeSearchModel = this.prototypeSearchModelBuilder(this._recipes);;
		this.isStocked = false;
		this.recipes = this._recipes;
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
			return isStocked = recipes;
		}
		return isStocked = null;

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

			//take obj 
			const searchList = []
			const searchObj = {
				index: 0,
				name: '',
				ingredients: [],
				description: ''
			}
			recipes.sort((a, b) => {
				a.name.localeCompare(b.name)
			})

			searchList = recipes.map(({ name, ingredients, description }, index) => {
				searchObj.ingredients = ingredients.map(({ ingredient }) => ingredient);
				searchObj.index = index;
				searchObj.description = description;
				searchObj.name = name;

			});

			return searchList;

		}
		return searchList;
	}


}
//Le système recherche des recettes correspondant à l’entrée utilisateur dans : le
// titre de la recette, la liste des ingrédients de la recette, la description de la
// recette.
//name,ingrédients,description

// {
// 	"id": 1,
// 	"image": "Recette01.jpg",
// 	"name": "Limonade de Coco",
// 	"servings": 1,
// 	"ingredients": [
// 	  {
// 	    "ingredient": "Lait de coco",
// 	    "quantity": 400,
// 	    "unit": "ml"
// 	  },
// 	  {
// 	    "ingredient": "Jus de citron",
// 	    "quantity": 2
// 	  },
// 	  {
// 	    "ingredient": "Crème de coco",
// 	    "quantity": 2,
// 	    "unit": "cuillères à soupe"
// 	  },
// 	  {
// 	    "ingredient": "Sucre",
// 	    "quantity": 30,
// 	    "unit": "grammes"
// 	  },
// 	  {
// 	    "ingredient": "Glaçons"
// 	  }
// 	],
// 	"time": 10,
// 	"description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
// 	"appliance": "Blender",
// 	"ustensils": ["cuillère à Soupe", "verres", "presse citron"]
//    },