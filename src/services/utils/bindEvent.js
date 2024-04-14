import { SectionResult } from "../../templates/home/components/main/sectionResult/SectionResult.js";

//dom 
const $labelSearches = Array.from(document.querySelectorAll("#labelSearch"));
const $display_options_span = document.querySelector('#ingredients>.select>span')
const $ingredient_search = document.querySelector('#ingredient-search')
const $ingredient_options = document.querySelector('#ingredients>.options')
const $search_vals = document.querySelectorAll('.search-val')
const $ingredient = document.querySelector('#ingredients')

export const bindEvent = (data) => {
	// on click event
	openCloseOptionsOnClick();

	searchValOnClick();

	// select one ingredient by key Word
	showBySelectedKeyWord(data)

	labelSearchesCloseOnClick(data)





}
const labelSearchesCloseOnClick = (dataList) => {
	//add event on click 
	$labelSearches.forEach(i => i.lastElementChild.addEventListener('click', (ev) => {
		ev.preventDefault()
		debugger
		if (ev.target.tagName == 'I') {
			ev.target.parentElement.parentElement.style.display = 'none';
		} else {

			ev.target.parentElement.style.display !== 'flex' ? 'flex' : 'none';
		}

		const el = document.querySelector('.labelSearch-ingredient')
		el.firstElementChild.textContent = "";
		el.idKey = "";

		filterBySelectedKey(dataList)

	}))
}

const showBySelectedKeyWord = (dataList) => {
	//const $ingredient_options = document.querySelector('#ingredients>.options')
	const lis = document.querySelectorAll(".li-item");
	lis.forEach(x => x.addEventListener("click", (ev) => {
		ev.preventDefault();
		debugger
		if (ev.target.className.includes('ingredient')) {

			const $display_options_span = document.querySelector('#ingredients>.select>span')

			const el = document.querySelector('.labelSearch-ingredient')

			$display_options_span.click()

			labelSearchShow(el, ev, dataList);



		}
		//else if (el.className.includes('ingredient') && ev.target.includes('ingredient')) { }
		else if (el.className.includes("")) { }



	}))


	const labelSearchShow = ($labelSearch, event, dataList) => {


		debugger;

		$labelSearch.firstChild.textContent = event.target.textContent;

		$labelSearch.style.display = $labelSearch.style.display !== 'flex' ? 'flex' : 'none';
		$labelSearch.idKey = event.target.id

		filterBySelectedKey(dataList)


	}



}
const filterBySelectedKey = (dataList) => {
	debugger
	const $labelSearches = Array.from(document.querySelectorAll("#labelSearch"));
	const keys = $labelSearches.map(x => x.idKey);
	const res = dataList.filter(el => keys.includes(`${el.id}`))

	SectionResult(res);


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