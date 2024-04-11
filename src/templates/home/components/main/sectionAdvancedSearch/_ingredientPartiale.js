//Dom element
const $ingredient_options = document.querySelector('#ingredients>.options')
const $ingredient = document.querySelector('#ingredients')

const $display_options_span = document.querySelector('#ingredients>.select>span')

const $ingredient_search = document.querySelector('#ingredient-search')

const $search_vals = document.querySelectorAll('.search-val')


export const ingredientDisplay = (data) => {


	$ingredient_options.style.display = 'flex'
	$ingredient_search.style.display = 'flex'

	// display 
	$ingredient_options.innerHTML = ''

	const $ul = document.createElement('ul');

	const ingredientList = new Set();

	data.forEach((el) =>
		el.ingredients.forEach(ing =>
			ingredientList.add(`<li class='li-item'>${(ing.ingredient[0] + ing.ingredient.toLowerCase().slice(1))} <span><i class="bi bi-x"></i></span></li>`)
		))
	Array.from(ingredientList).sort().forEach(i => $ul.innerHTML += i)


	$ingredient_options.appendChild($ul);

	//bind event display ingredients
	bindEvent();
}

const ingredientSearch = () => {
	$ingredient_search.value;
}


const OptionsSpan = () => { }



const bindEvent = () => {
	optionsSpanClick();
	searchValSpanClick();

}

//event func
const optionsSpanClick = () => {
	$display_options_span.addEventListener('click', (ev) => {
		debugger
		ev.stopPropagation();

		$ingredient_options.style.display = $ingredient_options.style.display !== 'flex' ? 'flex' : 'none';
		$ingredient_search.style.display = $ingredient_search.style.display !== 'flex' ? 'flex' : 'none';
		$ingredient.style.height = "fit-content"
		$display_options_span.firstChild.className =
			$display_options_span.firstChild.className !== "bi bi-chevron-up" ? "bi bi-chevron-up" : "bi bi-chevron-down";
	})
}

const searchValSpanClick = () => {

	$search_vals.forEach(el => el.addEventListener('click', ev => {
		debugger
		let searchVal = '';
		let foundLis = '';
		const ingredientList = new Set();
		const lis = document.querySelectorAll(".li-item");
		if (ev.target.tagName == 'SPAN')
			searchVal = ev.target.parentElement.firstElementChild.value;

		else if (ev.target.tagName == 'I')
			searchVal = ev.target.parentElement.parentElement.firstElementChild.value;

		lis.forEach(el =>

			el.textContent.includes(`${searchVal}`)
				? ingredientList.add(`<li class='li-item'>${el.innerHTML} </li>`)
				: '');
		// display 
		foundLis = Array.from(ingredientList).sort()
		if (foundLis.length > 0) {
			$ingredient_options.style.height = 'fit-content'
			$ingredient_options.firstElementChild.innerHTML = '';
			foundLis.forEach(el => $ingredient_options.firstElementChild.innerHTML += el);

		}
	})
	)
}