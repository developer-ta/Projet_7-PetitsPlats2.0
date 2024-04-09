export const AdvancedSearch = (data) => {

	ingredientDisplay(data);
	appareilsDisplay(data);
	ustensileDisplay(data);
	recettesQuantityDisplay(data);

}

const ingredientDisplay = (data) => {
	debugger;

	const $ingredient_options = document.querySelector('#ingredients>.options')

	const $display_options_span = document.querySelector('#ingredients>.select>span')

	$ingredient_options.style.display = 'flex'

	//bind event display ingredients
	$display_options_span.addEventListener('click', (ev) => {
		debugger
		ev.stopPropagation();

		$ingredient_options.style.display = $ingredient_options.style.display !== 'flex' ? 'flex' : 'none';
	})


	$ingredient_options.innerHTML = ''

	const $ul = document.createElement('ul');

	const ingredientList = new Set();

	data.forEach((el) =>
		el.ingredients.forEach(ing =>
			ingredientList.add(`<li class='li-ingredient'>${(ing.ingredient[0] + ing.ingredient.toLowerCase().slice(1))} <span><i class="bi bi-x"></i></span></li>`)
		))
	Array.from(ingredientList).sort().forEach(i => $ul.innerHTML += i)


	$ingredient_options.appendChild($ul);
}


const ustensileDisplay = (data) => {
	debugger;
	const $ustensiles_options = document.querySelector('#ustensiles>.options')

	const $display_options_span = document.querySelector('#ustensiles>.select>span')

	$ustensiles_options.style.display = 'flex'

	//bind event display ingredients
	$display_options_span.addEventListener('click', (ev) => {
		debugger
		ev.stopPropagation();

		$ustensiles_options.style.display = $ustensiles_options.style.display !== 'flex' ? 'flex' : 'none';
	})

	$ustensiles_options.innerHTML = ''
	const $ul = document.createElement('ul');
	const ustensileList = new Set();
	data.forEach((el) =>
		el.ustensils.forEach(ust =>
			ustensileList.add(`<li class='li-ingredient'>${(ust[0] + ust.toLowerCase().slice(1))} <span><i class="bi bi-x"></i></span></li>`)
		))
	Array.from(ustensileList).sort().forEach(i => $ul.innerHTML += i)

	$ustensiles_options.appendChild($ul);
}

const appareilsDisplay = (data) => {
	debugger
	const $appareils_options = document.querySelector('#appareils>.options')

	const $display_options_span = document.querySelector('#appareils>.select>span')

	$appareils_options.style.display = 'flex'

	//bind event display ingredients
	$display_options_span.addEventListener('click', (ev) => {
		debugger
		ev.stopPropagation();

		$appareils_options.style.display = $appareils_options.style.display !== 'flex' ? 'flex' : 'none';
	})


	$appareils_options.innerHTML = ''
	const $ul = document.createElement('ul');
	const applianceList = new Set();
	data.forEach((el) =>
		applianceList.add(`<li class='li-ingredient'>${(el.appliance[0] + el.appliance.toLowerCase().slice(1))} <span><i class="bi bi-x"></i></span></li>`)
	)
	Array.from(applianceList).sort().forEach(i => $ul.innerHTML += i)

	$appareils_options.appendChild($ul);
}
const recettesQuantityDisplay = (data) => {

	const $Recipe_quantity = document.querySelector('#Recipe-quantity')
	$Recipe_quantity.firstElementChild.textContent = `${data.length} recettes`

}
const nameDisplay = (name) => { }

const ingredientSearch = () => { }

// const searchObj = {
// 	index: 0,
// 	name: '',
// 	ingredients: [],
// 	description: ''
// };

//  "time": 10,
//       "description": "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
//       "appliance": "Blender",
//       "ustensils": ["cuillère à Soupe", "verres", "presse citron"]
//     },
// // 	"id": 1,
// 	"image": "Recette01.jpg",
// 	"name": "Limonade de Coco",
// 	"servings": 1,
// 	"ingredients": [
// 	  {
// 	    "ingredient": "Lait de coco",
// 	    "quantity": 400,
// 	    "unit": "ml"
// 	  },