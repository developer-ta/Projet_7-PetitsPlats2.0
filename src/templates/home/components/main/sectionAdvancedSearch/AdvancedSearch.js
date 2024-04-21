import { appareilsDisplay } from "./_appareilPartiale.js";
import { ingredientDisplay } from "./_ingredientPartiale.js";
import { ustensileDisplay } from "./_ustensilePartiale.js";




export const AdvancedSearch = (data) => {

	ingredientDisplay(data);
	appareilsDisplay(data);
	ustensileDisplay(data);
	recettesQuantityDisplay(data);

}


export const recettesQuantityDisplay = (data) => {

	const $Recipe_quantity = document.querySelector('#Recipe-quantity')
	$Recipe_quantity.firstElementChild.textContent = `${data.length} recettes`

}