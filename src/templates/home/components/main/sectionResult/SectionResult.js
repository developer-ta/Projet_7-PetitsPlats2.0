import { isExciteOrNotEmpty } from "../../../../../services/utils/validator.js";

export const SectionResult = (dataList) => {
	cardRecipes(dataList);
}




const cardRecipeTemplate = (data) => {


	const $search_result = document.getElementById('search_result');
	const { image, name, ingredients, description, time } = data;

	let tbs = setTableData(ingredients);
	console.log('tbs: ', tbs);

	const $tbs = setTableData(ingredients);

	const card_html = `<div class="col-2">
	<div class="card h-100">
		<img src="/assets/Photos P7 JS Les petits plats/${image}" class="card-img-top" alt="...">
		<div class="card-body">
			<h5 class="card-title">${name}</h5>
			<h6 class="card-title">RECETTE</h6>
			<p class="card-text">${description.slice(0, 202)}</p>
			<span class='time'>${time}min</span>
		</div>
		<div class="card-footer container m-0 p-0 border-0">
			<table class="table border-white ">
				<tr>
					<th>
						<h4>ingredients</h4>
					</th>
					<th></th>
				</tr>
				
                 ${tbs}
			</table>
			</div>
			</div>
			</div>`;


	$search_result.insertAdjacentHTML('beforeend', card_html)





}
const cardRecipes = (dataList) => {

	const $search_result = document.getElementById('search_result');
	$search_result.innerHTML = '';
	if (isExciteOrNotEmpty(dataList)) {

		dataList.forEach((data) => { cardRecipeTemplate(data); })
	}
	cardRecipeTemplate(dataList);

}



let i = 0;
const setTableData = (ingredientList) => {

	console.log('ingredientList: ', ingredientList, i++);


	let index = 0;
	let ingredientData = '';
	while (index < ingredientList.length) {

		const { ingredient, quantity, unit } = ingredientList[index];

		ingredientData += `<tr>
				<td>${ingredient}<br>
				<span class='quantity'>${quantity ?? ''} ${unit ?? ''}</span>
				</td>`;

		if (index + 1 < ingredientList.length) {
			index++;
			const { ingredient, quantity, unit } = ingredientList[index];
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