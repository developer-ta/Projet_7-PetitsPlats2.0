import { SectionResult } from "../../templates/home/components/main/sectionResult/SectionResult.js";

export const showBySelectedKeyWord = (dataList) => {
	//const $ingredient_options = document.querySelector('#ingredients>.options')
	const lis = document.querySelectorAll(".li-item");


	lis.forEach(x => x.addEventListener("click", (ev) => {
		ev.preventDefault();




		if (ev.target.className.includes('ingredient')) {

			const $display_options_span = document.querySelector('#ingredients>.select>span')

			const el = document.querySelector('.labelSearch-ingredient')

			$display_options_span.click()

			labelSearchShow(el, ev, dataList);



		}
		//else if (el.className.includes('ingredient') && ev.target.includes('ingredient')) { }
		else if (el.className.includes("")) { }



	}))
}
const labelSearchShow = ($labelSearch, event, dataList) => {


	debugger;

	$labelSearch.firstChild.textContent = event.target.textContent;

	$labelSearch.style.display = 'flex'
	$labelSearch.idKey = event.target.id

	filterBySelectedKey(dataList)


}

const filterBySelectedKey = (dataList) => {
	debugger
	const $labelSearches = Array.from(document.querySelectorAll("#labelSearch"));
	const textContents = $labelSearches.map(x => x.idKey);
	const res = dataList.filter(el => textContents.includes(`${el.id}`))

	console.log('res: ', res);
	SectionResult(res);


}

// const filterBySelectedKey = (keyWord, data, option) => {
// 	if (option=='ingredient') {

// 	}else if (option) {

// 	}
// 	data.forEach(el => el[`${option}`].)

// }
// const filterBySelectedKey = (dataList, keyWordObj) => {
// 	debugger

// 	const res = dataList.filter(el =>
// 		el.ingredients.map(x => x.ingredient.toLowerCase()).includes(keyWordObj?.ingredient.toLowerCase().trim())




// 		// && el.ustensiles.includes(keyWordObj?.ustensile)
// 		// && el.appliance.includes(keyWordObj?.appliance)

// 	);
// 	console.log('res: ', res);
// 	SectionResult(res);


// }


