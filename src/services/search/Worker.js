import { HomeController } from "../../controllers/HomeController.js";
import { isExciteOrNotEmpty } from "../utils/validator.js";
const w = import('./Worker.js')

export class searchAsync {

	constructor (recipeViewModel) {


		this.$searchInput = document.querySelector('#user_input');

		this._recipes = recipeViewModel.recipes

		this._valUserInReg = null;

		//this.indexList = null;

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
			debugger
			//let indexList = [];
			let resultRecipes = null;

			const indexList = await this.getResultMultiThreadsSearch();

			if (indexList.length > 0) {

				resultRecipes = async () => await this.result(this.indexList)

				if (isExciteOrNotEmpty(resultRecipes())) HomeController.mainDisplay(resultRecipes())

			}

			HomeController.mainDisplay(resultRecipes())
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

	threadSearchUserIn = (startIndex, EndIndex) => {
		debugger



		// Creating new web worker 
		const worker = new Worker('worker.js');
		let message = 'Hello';

		// Message using postMessage 
		worker.postMessage(message);

		// Response 
		worker.onmessage = function (e) {
			console.log(e.data);
		};


		let foundIndexes = []

		if (this.ValUserInRegExp) {
			let url = './Worker.js'
			const thread = new Worker(url)

			thread.addEventListener('message', (messageEvent) => {

				foundIndexes = foundIndexes.concat(messageEvent.data)

				//resolve(foundIndexes);

			})
			const resultPromise = new Promise(resolve => {

				thread.addEventListener('message', (messageEvent) => {

					foundIndexes = foundIndexes.concat(messageEvent.data)

					resolve(foundIndexes);

				})
			})

			thread.postMessage(
				{
					start: startIndex,
					end: EndIndex,
					recipes: this._recipes,
					regExp: this._valUserInReg
				})
			//return resultPromise;
		}

		return foundIndexes;
	}
	// searchUserIn = async () => {

	// 	let i = []
	// 	if (this.ValUserInRegExp) {

	// 		for (let index = 0; index < this._recipes.length; index++) {

	// 			const { name, ingredients, description } = this._recipes[index];

	// 			if (name.concat('', ingredients.map(obj => obj.ingredient).toString(), '', description)
	// 				.search(this._valUserInReg) !== -1) { i.push(index); }

	// 		}

	// 	}

	// 	return i
	// }

	// getResultMultiThreadsSearch = async () => {
	// 	debugger
	// 	const maxThread = 4;
	// 	const lengthArr = this._recipes.length
	// 	let lot = lengthArr / maxThread
	// 	const promises = []

	// 	for (let i = 0; i < maxThread; i++) {
	// 		//Math.floor(lot + i * lot)
	// 		let lotStart = Math.floor(i * lot)//0:0,1:lot,2:2
	// 		let lotEnd = Math.floor((i + 1) * lot)
	// 		//res type []
	// 		promises.push(this.threadSearchUserIn(lotStart, lotEnd))
	// 	}
	// 	const res = await Promise.all(promises);
	// 	return res.flat()
	// }
	// searchResult = async () => {

	// 	const res = await this.getResultByMultiThreads();

	// 	return res;



	// }

	result = async (indexes) => {
		debugger

		let res = []

		indexes?.forEach(i => res.push(this._recipes.at(i)))

		return res
	}




}
