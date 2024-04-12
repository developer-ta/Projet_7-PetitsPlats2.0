import { appareilsDisplay } from "./_appareilPartiale.js";
import { ingredientDisplay } from "./_ingredientPartiale.js";
import { ustensileDisplay } from "./_ustensilePartiale.js";




export const AdvancedSearch = (data) => {

	ingredientDisplay(data);
	appareilsDisplay(data);
	ustensileDisplay(data);
	recettesQuantityDisplay(data);

}


const recettesQuantityDisplay = (data) => {

	const $Recipe_quantity = document.querySelector('#Recipe-quantity')
	$Recipe_quantity.firstElementChild.textContent = `${data.length} recettes`

}
const chooseValDisplay = (name) => { }



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