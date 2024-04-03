export class searchAsync {

	constructor (recipeViewModel) {

		this.$searchInput = document.querySelector('#user_input');
		console.log('$searchInput: ', this.$searchInput);

		this.$search_btn = document.querySelector('.bi-search');

		this._prototypeSearchModel = recipeViewModel.prototypeSearchModel

		this._recipes = recipeViewModel.recipes

		this._valUserInReg = null;

		this.indexList = new Set();

		this.init();
	}


	init() {
		this.bindEvent()
	}

	bindEvent() {
		this.$search_btn.addEventListener("click", this.nameSearch)
	}

	get ValUserInRegExp() {


		let valInput = this.$searchInput.value

		if (valInput.length >= 3) {

			return this._valUserInReg = new RegExp(`^${valInput}`, "gim");
		}
		return null;

	}

	nameSearch = () => {
		debugger;

		if (this.ValUserInRegExp) {

			this._prototypeSearchModel.forEach(
				({ name, index }) => {
					if (name.match(this._valUserInReg)) {

						this.indexList.add(index);

					}

				}
			)
		}
		console.log('indexList: ', this.indexList.size);
		return this.indexList
	}

	ingredientSearch(strIndice) { }

	descriptionSearch(strIndice) { }

	async SearchResult() { }




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