import { HomeController } from "../../controllers/HomeController.js";
import { isExciteOrNotEmpty } from "../utils/validator.js";

export class searchAsync {

	constructor (recipeViewModel) {

		this.$searchInput = document.querySelector('#user_input');



		this.$search_btn = document.querySelector('.bi-search');

		this._prototypeSearchModel = recipeViewModel.prototypeSearchModel

		this._recipes = recipeViewModel.recipes

		this._valUserInReg = null;

		this.indexList = new Set();

		this.resultRecipes = null;

		this.init();
	}


	init() {
		this.bindEvent()

	}

	bindEvent() {

		this.$search_btn.addEventListener("click", async (ev) => {

			debugger

			ev.preventDefault();

			this.indexList.clear();

			let res = await this.searchResult();

			if (res.length > 0) {

				this.indexList.add(res);
				this.resultRecipes = this.Result(this.indexList)

				if (isExciteOrNotEmpty(this.resultRecipes)) HomeController.mainDisplay(this.resultRecipes)

			}





			console.log('resultRecipes: ', this.resultRecipes);

		})
	}

	get ValUserInRegExp() {


		let valInput = this.$searchInput.value

		if (valInput.length >= 3) {

			return this._valUserInReg = new RegExp(`^${valInput}`, "gim");
		}
		return null;

	}

	nameSearch = () => {
		debugger
		let i = []
		if (this.ValUserInRegExp) {

			this._prototypeSearchModel.forEach(
				({ name, index }) => {
					this.descriptionSearch
					if (name.match(this._valUserInReg)) {

						i.push(index);

					}

				}
			)
		}
		console.log('indexList: ', this.indexList.size);
		return i


	}

	ingredientSearch = () => {

		debugger
		let i = []
		if (this.ValUserInRegExp) {

			this._prototypeSearchModel.forEach(

				({ ingredients, index }) => {

					ingredients.forEach(ingredient => {
						if (ingredient.match(this._valUserInReg)) {

							i.add(index);

						}

					}
					)

				}
			)
		}
		console.log('indexList: ', i);
		return i
	}

	descriptionSearch(strIndice) { }

	searchResult = async () => {
		// await this.nameSearch();
		// const res = await this.ingredientSearch();
		const [a, b] = await Promise.all([this.nameSearch(), this.ingredientSearch()]);
		console.log('indexList: ', this.indexList.size);
		return [...a, ...b];



	}

	Result = (indexList => {
		let res = []
		indexList.forEach(i => res.push(this._recipes.at(i)))

		return res
	})




}
// const searchObj = {
// 	index: 0,
// 	name: '',
// 	ingredients: [],
// 	description: ''
// };


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
//  }