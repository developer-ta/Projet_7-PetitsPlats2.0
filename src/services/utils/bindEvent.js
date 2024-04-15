import { SectionResult } from "../../templates/home/components/main/sectionResult/SectionResult.js";

//dom 
const $labelSearches = Array.from(document.querySelectorAll("#labelSearch"));
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
	openCloseOptionsOnClick();

	searchValOnClick('ingredient');
	searchValOnClick('appareil');
	searchValOnClick('ustensile');

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

			//const $display_options_spanIng = document.querySelector('#ingredients>.select>span')

			const el = document.querySelector('.labelSearch-ingredient')

			$display_options_spanIng.click()

			labelSearchShow(el, ev, dataList);



		}
		else if (ev.target.className.includes('ustensile')) {

			//const $display_options_spanUst = document.querySelector('#ingredients>.select>span')

			const el = document.querySelector('.labelSearch-ustensile')

			$display_options_spanUst.click()

			labelSearchShow(el, ev, dataList);
		}
		else if (ev.target.className.includes('appareil')) {
			debugger


			const el = document.querySelector('.labelSearch-appareil')

			$display_options_spanApp.click()

			labelSearchShow(el, ev, dataList);
		}



	}))


	const labelSearchShow = ($labelSearch, event, dataList) => {


		debugger;

		$labelSearch.firstChild.textContent = event.target.textContent;

		$labelSearch.style.display = $labelSearch.style.display !== 'flex' && 'flex';
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
const searchValOnClick = (option) => {
	debugger
	let $el = null;
	let element = null;
	if (option === 'ingredient') {
		$el = document.querySelector('#ingredients>.options')
		element = $search_vals[0]

	}
	else if (option === 'appareil') {
		$el = document.querySelector('#appareils>.options')
		element = $search_vals[1]
	}
	else if (option === 'ustensile') {
		$el = document.querySelector('#ustensiles>.options')
		element = $search_vals[2]
	}

	//$search_vals.forEach(ele => console.dir(ele))


	element.addEventListener('click', ev => {
		debugger
		let searchVal = '';
		let foundLis = '';

		const itemList = [];
		//1
		const lis = $el.querySelectorAll(".li-item");
		if (ev.target.tagName == 'SPAN')
			searchVal = ev.target.parentElement.firstElementChild.value;

		else if (ev.target.tagName == 'I')
			searchVal = ev.target.parentElement.parentElement.firstElementChild.value;

		lis.forEach(el =>

			el.textContent.includes(`${searchVal}`)
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

//event func
const openCloseOptionsOnClick = () => {
	$display_options_spanIng.addEventListener('click', (ev) => {
		debugger
		//ev.stopPropagation();

		$ingredient_options.style.display = $ingredient_options.style.display !== 'flex' ? 'flex' : 'none';
		$ingredient_search.style.display = $ingredient_search.style.display !== 'flex' ? 'flex' : 'none';
		$ingredient.style.height = "fit-content"
		$display_options_spanIng.firstChild.className =
			$display_options_spanIng.firstChild.className !== "bi bi-chevron-up" ? "bi bi-chevron-up" : "bi bi-chevron-down";
	})
}


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