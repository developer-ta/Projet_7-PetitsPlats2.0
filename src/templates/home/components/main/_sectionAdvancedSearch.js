export const AdvancedSearch = (data) => {

	ingredientDisplay(data);

}

const ingredientDisplay = (data) => {
	debugger;
	const $ingredient_options = document.querySelector('#ingredients>.options')
	$ingredient_options.innerHTML = ''
	const $ul = document.createElement('ul');
	data.forEach(el =>
		el.ingredients.forEach(i =>
			$ul.innerHTML += `<li>${i.ingredient}</li>`));
	$ingredient_options.appendChild($ul);
}

const nameDisplay = (name) => { }

const ingredientSearch = () => { }

