import { HomeController } from "../../controllers/HomeController.js";
import { isExciteOrNotEmpty } from "../utils/validator.js";

export class searchAsync {

	constructor (recipeViewModel) {

		this.$searchInput = document.querySelector('#user_input');



		this.$search_btn = document.querySelector('.bi-search');

		this._prototypeSearchModel = recipeViewModel.prototypeSearchModel

		this._recipes = recipeViewModel.recipes

		this._valUserInReg = null;

		this.indexList = null;

		this.resultRecipes = null;

		this.init();
	}


	init() {
		this.bindEvent()

	}

	bindEvent() {

		this.$search_btn.addEventListener("click", async (ev) => {



			ev.preventDefault();


			if (this.$searchInput.value.length < 3 && isExciteOrNotEmpty(this._recipes)) {
				HomeController.mainDisplay(this._recipes)

			}


			this.indexList?.clear();
			let res = await this.searchResult();

			if (res.length > 0) {

				this.indexList = new Set(res);
				this.resultRecipes = this.Result(this.indexList)

				if (isExciteOrNotEmpty(this.resultRecipes)) HomeController.mainDisplay(this.resultRecipes)

			}



		})
	}

	get ValUserInRegExp() {


		let valInput = this.$searchInput.value

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
					let testIn = name.match(this._valUserInReg)
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
						let testIn = ingredient.match(this._valUserInReg)
						if (ingredient.match(this._valUserInReg)) {

							i.push(index);

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
		console.log('indexList: ', this.indexList?.size);
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