import { showBySelectedKeyWord } from "../../../../../services/utils/showBySelectedKeyWord.js"

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

	//bind event display ingredients
	bindEvent(data);
}

const ingredientSearch = () => {
	$ingredient_search.value;
}


const bindEvent = (data) => {
	openCloseOptionsOnClick();
	searchValOnClick();

	// select one ingredient by key Word
	showBySelectedKeyWord(data)





}

//event func
const openCloseOptionsOnClick = () => {
	$display_options_span.addEventListener('click', (ev) => {

		ev.stopPropagation();

		$ingredient_options.style.display = $ingredient_options.style.display !== 'flex' ? 'flex' : 'none';
		$ingredient_search.style.display = $ingredient_search.style.display !== 'flex' ? 'flex' : 'none';
		$ingredient.style.height = "fit-content"
		$display_options_span.firstChild.className =
			$display_options_span.firstChild.className !== "bi bi-chevron-up" ? "bi bi-chevron-up" : "bi bi-chevron-down";
	})
}

const searchValOnClick = () => {

	$search_vals.forEach(el => el.addEventListener('click', ev => {

		let searchVal = '';
		let foundLis = '';

		const ingredientList = [];
		const lis = $ingredient_options.querySelectorAll(".li-item");
		if (ev.target.tagName == 'SPAN')
			searchVal = ev.target.parentElement.firstElementChild.value;

		else if (ev.target.tagName == 'I')
			searchVal = ev.target.parentElement.parentElement.firstElementChild.value;

		lis.forEach(el =>

			el.textContent.includes(`${searchVal}`)
				? ingredientList.push(el) : '');

		// display 
		foundLis = ingredientList.sort((a, b) => a.textContent.localeCompare(b.textContent));
		if (foundLis.length > 0) {
			$ingredient_options.style.height = 'fit-content'
			$ingredient_options.firstElementChild.innerHTML = '';
			foundLis.forEach(el => $ingredient_options.firstElementChild.appendChild(el));

		}
	})
	)
}