export const AdvancedSearch = (data) => {

	ingredientDisplay(data);
	ustensileDisplay(data);
	appareilsDisplay(data);

}

const ingredientDisplay = (data) => {

	const $ingredient_options = document.querySelector('#ingredients>.options')
	$ingredient_options.innerHTML = ''
	const $ul = document.createElement('ul');
	data.forEach(el =>
		el.ingredients.forEach(i =>
			$ul.innerHTML += `<li>${i.ingredient}</li>`));
	$ingredient_options.appendChild($ul);
}


const ustensileDisplay = (data) => {

	const $ustensiles_options = document.querySelector('#ustensiles>.options')
	$ustensiles_options.innerHTML = ''
	const $ul = document.createElement('ul');
	data.forEach(el =>
		el.ustensils.forEach(i =>
			$ul.innerHTML += `<li>${i}</li>`));
	$ustensiles_options.appendChild($ul);
}

const appareilsDisplay = (data) => {

	const appareils_options = document.querySelector('#appareils>.options')
	appareils_options.innerHTML = ''
	const $ul = document.createElement('ul');
	data.forEach(el =>
		$ul.innerHTML += `<li>${el.appliance}</li>`);
	appareils_options.appendChild($ul);
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