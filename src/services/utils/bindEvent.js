import { recettesQuantityDisplay } from "../../templates/home/components/main/sectionAdvancedSearch/AdvancedSearch.js";
import { SectionResult } from "../../templates/home/components/main/sectionResult/SectionResult.js";

//dom 
const $labelSearches = Array.from(document.querySelectorAll(".labelSearch"));
const $display_options_spanIng = document.querySelector('#ingredients>.select>span')
const $ingredient_search = document.querySelector('#ingredient-search')
const $ingredient_options = document.querySelector('#ingredients>.options')
const $search_vals = document.querySelectorAll('.search-val')
const $ingredient = document.querySelector('#ingredients')


const $ustensiles_options = document.querySelector('#ustensiles>.options')
const $ustensile = document.querySelector('#ustensiles')
const $display_options_spanUst = document.querySelector('#ustensiles>.select>span')
const ustensile = document.querySelector('#ustensiles>.select>span')

const $ustensile_search = document.querySelector('#ustensile-search')

//Dom
const $appareils_options = document.querySelector('#appareils>.options')
const $appareil = document.querySelector('#appareils')

const $display_options_spanApp = document.querySelector('#appareils>.select>span')
const $appareil_search = document.querySelector('#appareil-search')

export const bindEvent = (data) => {
	// on click event
	//openCloseOptionsOnClick();

	searchValOnClick('ingredient');
	searchValOnClick('appareil');
	searchValOnClick('ustensile');

	// select one ingredient by key Word
	showBySelectedKeyWord(data)

	labelSearchesCloseOnClick(data)





}
const labelSearchesCloseOnClick = (dataList) => {
	//add event on click 
	debugger
	let $el = null
	$labelSearches.forEach(i => i.lastElementChild.addEventListener('click', (ev) => {
		ev.preventDefault()
		debugger
		if (ev.target.tagName == 'I') {
			$el = ev.target.parentElement.parentElement
			$el.style.display = 'none';
		} else {

			$el = ev.target.parentElement
			$el.style.display !== 'flex' ? 'flex' : 'none';

		}

		$el.firstElementChild.textContent = "";
		$el.idKey = "";

		filterBySelectedKey(dataList)

	}))
}

const showBySelectedKeyWord = (dataList) => {

	const lis = document.querySelectorAll(".li-item");
	lis.forEach(x => x.addEventListener("click", (ev) => {
		ev.preventDefault();
		debugger
		let $el = null;
		let event = null;
		if (ev.target.className.includes('ingredient')) {

			$el = document.querySelector('.labelSearch-ingredient')

			$display_options_spanIng.click()
			event = ev;

		}
		else if (ev.target.className.includes('ustensile')) {

			$el = document.querySelector('.labelSearch-ustensile')

			$display_options_spanUst.click()

			event = ev;
		}
		else if (ev.target.className.includes('appareil')) {
			debugger


			$el = document.querySelector('.labelSearch-appareil')

			$display_options_spanApp.click()

			event = ev;
		}

		labelSearchShow($el, event, dataList);

	}))


	const labelSearchShow = ($labelSearch, event, dataList) => {


		debugger;

		$labelSearch.firstElementChild.textContent = event.target.textContent;

		$labelSearch.style.display = $labelSearch.style.display !== 'flex' && 'flex';
		$labelSearch.idKey = event.target.id

		filterBySelectedKey(dataList)


	}



}
const filterBySelectedKey = (dataList) => {
	debugger
	const $labelSearches = Array.from(document.querySelectorAll(".labelSearch"));
	const keys = $labelSearches.map(x => x.idKey);
	let res = dataList.filter(el => keys.includes(`${el.id}`))
	if (res.length == 0) {
		res = document.getElementById('advance_search').dataCurrent

	}


	recettesQuantityDisplay(res);
	SectionResult(res);


}
const searchValOnClick = (option) => {
	debugger
	let $el = null;
	let element = null;
	let lis = null;
	if (option === 'ingredient') {
		$el = document.querySelector('#ingredients>.options')
		element = $search_vals[0]
		lis = $el.querySelectorAll(".li-item");

	}
	else if (option === 'appareil') {
		$el = document.querySelector('#appareils>.options')
		element = $search_vals[1]
		lis = $el.querySelectorAll(".li-item");
	}
	else if (option === 'ustensile') {
		$el = document.querySelector('#ustensiles>.options')
		element = $search_vals[2]
		lis = $el.querySelectorAll(".li-item");
	}



	element.addEventListener('click', ev => {
		debugger
		let searchVal = '';
		let foundLis = '';

		const itemList = [];
		//1

		if (ev.target.tagName == 'SPAN')
			searchVal = ev.target.parentElement.firstElementChild.value;

		else if (ev.target.tagName == 'I')
			searchVal = ev.target.parentElement.parentElement.firstElementChild.value;

		lis.forEach(el =>

			el.textContent.toLowerCase().startsWith(`${searchVal}`)
				? itemList.push(el) : '');

		// display 
		foundLis = itemList.sort((a, b) => a.textContent.localeCompare(b.textContent));
		if (foundLis.length > 0) {
			$el.style.height = 'fit-content'
			$el.firstElementChild.innerHTML = '';
			foundLis.forEach(el => $el.firstElementChild.appendChild(el));

		}
	})

}


$display_options_spanIng.addEventListener('click', (ev) => {
	debugger
	ev.stopPropagation();

	$ingredient_options.style.display = $ingredient_options.style.display !== 'flex' ? 'flex' : 'none';
	$ingredient_search.style.display = $ingredient_search.style.display !== 'flex' ? 'flex' : 'none';
	$ingredient.style.height = "fit-content"
	$display_options_spanIng.firstChild.className =
		$display_options_spanIng.firstChild.className !== "bi bi-chevron-up" ? "bi bi-chevron-up" : "bi bi-chevron-down";
})

//bind event display ustensile
$display_options_spanUst.addEventListener('click', (ev) => {

	ev.stopPropagation();

	$ustensiles_options.style.display = $ustensiles_options.style.display !== 'flex' ? 'flex' : 'none';
	$ustensile_search.style.display = $ustensile_search.style.display !== 'flex' ? 'flex' : 'none';
	$ustensile.style.height = "fit-content"
	$display_options_spanUst.firstChild.className =
		$display_options_spanUst.firstChild.className !== "bi bi-chevron-up" ? "bi bi-chevron-up" : "bi bi-chevron-down";

})


//bind event display App
$display_options_spanApp.addEventListener('click', (ev) => {

	ev.stopPropagation();

	$appareils_options.style.display = $appareils_options.style.display !== 'flex' ? 'flex' : 'none';
	$appareil_search.style.display = $appareil_search.style.display !== 'flex' ? 'flex' : 'none';
	$appareil.style.height = "fit-content"
	$display_options_spanApp.firstChild.className =
		$display_options_spanApp.firstChild.className !== "bi bi-chevron-up" ? "bi bi-chevron-up" : "bi bi-chevron-down";
})