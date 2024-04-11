//Dom element
const $ingredient_options = document.querySelector('#ingredients>.options')
const $ingredient = document.querySelector('#ingredients')

const $display_options_span = document.querySelector('#ingredients>.select>span')
const $ingredient_search = document.querySelector('#ingredient-search')





export const ingredientDisplay = (data) => {
	debugger;

	$ingredient_options.style.display = 'flex'
	$ingredient_search.style.display = 'flex'

	//bind event display ingredients
	bindEvent();

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
}

const ingredientSearch = () => { }


const OptionsSpan = () => { }



const bindEvent = () => {
	optionsSpanClick();
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