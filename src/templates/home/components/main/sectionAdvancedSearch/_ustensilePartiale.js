export const ustensileDisplay = (data) => {
	debugger;

	// Dom

	const $ustensiles_options = document.querySelector('#ustensiles>.options')
	const $ustensile = document.querySelector('#ustensiles')

	const $display_options_span = document.querySelector('#ustensiles>.select>span')

	const $ustensile_search = document.querySelector('#ustensile-search')

	// $ustensiles_options.style.display = 'flex'
	// $ustensile_search.style.display = 'flex'

	//bind event display ingredients
	$display_options_span.addEventListener('click', (ev) => {
		debugger
		ev.stopPropagation();

		$ustensiles_options.style.display = $ustensiles_options.style.display !== 'flex' ? 'flex' : 'none';
		$ustensile_search.style.display = $ustensile_search.style.display !== 'flex' ? 'flex' : 'none';
		$ustensile.style.height = "fit-content"
		$display_options_span.firstChild.className =
			$display_options_span.firstChild.className !== "bi bi-chevron-up" ? "bi bi-chevron-up" : "bi bi-chevron-down";

	})
	// display 
	$ustensiles_options.innerHTML = ''
	const $ul = document.createElement('ul');
	const ustensileList = new Set();
	data.forEach((el) =>
		el.ustensils.forEach(ust =>
			ustensileList.add(`<li class='li-item'>${(ust[0] + ust.toLowerCase().slice(1))} <span><i class="bi bi-x"></i></span></li>`)
		))
	Array.from(ustensileList).sort().forEach(i => $ul.innerHTML += i)

	$ustensiles_options.appendChild($ul);
}