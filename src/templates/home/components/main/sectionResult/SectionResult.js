export const SectionResult = (dataList) => {
	cardRecipes(dataList);
}




const cardRecipeTemplate = (data) => {

	const { image, name, ingredients, description } = data;

	const $search_result = document.getElementById('search_result');


	const $tbs = setTableData(ingredients);

	const card_html = `<div class="col-2">
	<div class="card h-100">
		<img src="/assets/Photos P7 JS Les petits plats/${image}" class="card-img-top" alt="...">
		<div class="card-body">
			<h5 class="card-title">${name}</h5>
			<h6 class="card-title">RECETTE</h6>
			<p class="card-text">${description.slice(0, 202)}</p>
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


	$search_result.insertAdjacentHTML('beforeend', card_html)

	//const $table = document.querySelector('.table');



}
const cardRecipes = (dataList) => {

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
				<span class='quantity'>${quantity ?? ''} ${unit ?? ''}</span>
				</td>`;

		if (index + 1 < ingredients.length) {
			index++;
			const { ingredient, quantity, unit } = ingredients[index];
			ingredientData +=
				`<td>${ingredient}<br>
				<span class='quantity'>${quantity ?? ''} ${unit ?? ''}</span>
				</td>
			</tr>`;
		}
		else { ingredientData += `<td></td></tr>`; }


		index++;
	}

	return ingredientData

}