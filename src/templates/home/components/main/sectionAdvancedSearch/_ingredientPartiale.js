

//Dom element
const $ingredient_options = document.querySelector('#ingredients>.options')
const $ingredient = document.querySelector('#ingredients')

const $display_options_span = document.querySelector('#ingredients>.select>span')

const $ingredient_search = document.querySelector('#ingredient-search')

const $search_vals = document.querySelectorAll('.search-val')




export const ingredientDisplay = (data) => {


	// display 
	$ingredient_options.innerHTML = ''

	const $ul = document.createElement('ul');

	const ingredientList = [];

	data.forEach((el) =>
		el.ingredients.forEach(ing => {
			const $li = document.createElement('li');
			$li.className = 'li-item ingredient';
			$li.id = el.id;
			$li.innerHTML += `${(ing.ingredient[0] + ing.ingredient.toLowerCase().slice(1))} `

			ingredientList.push($li)
		}
		))

	//filter index unique
	let textContents = ingredientList.map(el => el.textContent)

	let uniqueElements = ingredientList.filter((el, i, self) => i == textContents.indexOf(el.textContent))

	uniqueElements.sort((a, b) => a.textContent.localeCompare(b.textContent));
	uniqueElements.forEach(li => $ul.appendChild(li))

	$ingredient_options.appendChild($ul);

}

const ingredientSearch = () => {
	$ingredient_search.value;
}


// const bindEvent = (data) => {
// 	openCloseOptionsOnClick();
// 	searchValOnClick();

// 	// select one ingredient by key Word
// 	showBySelectedKeyWord(data)





// }



