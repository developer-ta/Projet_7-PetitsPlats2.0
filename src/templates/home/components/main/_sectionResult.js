export const SectionResult = (dataList) => {
	cardRecipes(dataList);
}




const cardRecipeTemplate = (data) => {
	// {
	// 	"id": 3,
	// 	"image": "Recette03.jpg",
	// 	"name": "Poulet coco réunionnais",
	// 	"servings": 4,
	// 	"ingredients": [
	// 	  {
	// 	    "ingredient": "Poulet",
	// 	    "quantity": 1
	// 	  },
	// 	  {
	// 	    "ingredient": "Lait de coco",
	// 	    "quantity": 400,
	// 	    "unit": "ml"
	// 	  },
	// 	  {
	// 	    "ingredient": "Coulis de tomate",
	// 	    "quantity": 25,
	// 	    "unit": "cl"
	// 	  },
	// 	  {
	// 	    "ingredient": "Oignon",
	// 	    "quantity": 1
	// 	  },
	// 	  {
	// 	    "ingredient": "Poivron rouge",
	// 	    "quantity": 1
	// 	  },
	// 	  {
	// 	    "ingredient": "Huile d'olive",
	// 	    "quantity": 1,
	// 	    "unit": "cuillères à soupe"
	// 	  }
	// 	],
	// 	"time": 80,
	// 	"description": "Découper le poulet en morceaux, les faire dorer dans une cocotte avec de l'huile d'olive. Salez et poivrez. Une fois doré, laisser cuire en ajoutant de l'eau. Au bout de 30 minutes, ajouter le coulis de tomate, le lait de coco ainsi que le poivron et l'oignon découpés en morceaux. Laisser cuisiner 30 minutes de plus. Servir avec du riz",
	// 	"appliance": "Cocotte",
	// 	"ustensils": ["couteau"]
	//    },
	const { image, name, ingredients, description } = data;

	const $search_result = document.getElementById('search_result');


	const $tbs = setTableData(ingredients);

	const card_html = `<div class="col-3">
	<div class="card h-100">
		<img src="/assets/Photos P7 JS Les petits plats/${image}" class="card-img-top" alt="...">
		<div class="card-body">
			<h5 class="card-title">${name}</h5>
			<h6 class="card-title">RECETTE</h6>
			<p class="card-text">${description}</p>
		</div>
		<div class="card-footer container m-0 p-0 border-0">
			<table class="table border-white ">
				<tr>
					<th>
						<h4>ingredients</h4>
					</th>
					<th></th>
				</tr>
				
                 ${$tbs}
			</table>
			</div>
			</div>
			</div>`;

	debugger
	$search_result.insertAdjacentHTML('beforeend', card_html)

	//const $table = document.querySelector('.table');



}
const cardRecipes = (dataList) => {
	debugger
	const $search_result = document.getElementById('search_result');
	$search_result.innerHTML = '';
	dataList.forEach((data) => { cardRecipeTemplate(data); })

}

// const setTableData = (ingredients) => {
// 	let index = 0;
// 	let ingredientData = '';
// 	while (index < ingredients.length) {

// 		ingredientData += `<tr>
// 				<td>${ingredients[index].ingredient}<br><span>${ingredients[index].ingredient}</span></td>`;

// 		if (index + 1 < ingredients.length) {
// 			index++;
// 			ingredientData +=
// 				`<td>${ingredients[index].ingredient}</td>
// 			</tr>`;
// 		}
// 		else { ingredientData += `<td></td></tr>`; }


// 		index++;
// 	}

// 	return ingredientData

// }

const setTableData = (ingredients) => {
	let index = 0;
	let ingredientData = '';
	while (index < ingredients.length) {

		const { ingredient, quantity, unit } = ingredients[index];
		// 	    "ingredient": "Lait de coco",
		// 	    "quantity": 400,
		// 	    "unit": "ml"
		// 	  },
		ingredientData += `<tr>
				<td>${ingredient}<br>
				<span class='quantity'>${quantity} ${unit}</span>
				</td>`;

		if (index + 1 < ingredients.length) {
			index++;
			const { ingredient, quantity, unit } = ingredients[index];
			ingredientData +=
				`<td>${ingredient}<br>
				<span class='quantity'>${quantity} ${unit}</span>
				</td>
			</tr>`;
		}
		else { ingredientData += `<td></td></tr>`; }


		index++;
	}

	return ingredientData

}