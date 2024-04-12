export const appareilsDisplay = (data) => {
	debugger
	//Dom
	const $appareils_options = document.querySelector('#appareils>.options')
	const $appareil = document.querySelector('#appareils')

	const $display_options_span = document.querySelector('#appareils>.select>span')
	const $appareil_search = document.querySelector('#appareil-search')

	// $appareils_options.style.display = 'flex'
	// $appareil_search.style.display = 'flex'

	//bind event display ingredients
	$display_options_span.addEventListener('click', (ev) => {
		debugger
		ev.stopPropagation();

		$appareils_options.style.display = $appareils_options.style.display !== 'flex' ? 'flex' : 'none';
		$appareil_search.style.display = $appareil_search.style.display !== 'flex' ? 'flex' : 'none';
		$appareil.style.height = "fit-content"
		$display_options_span.firstChild.className =
			$display_options_span.firstChild.className !== "bi bi-chevron-up" ? "bi bi-chevron-up" : "bi bi-chevron-down";
	})

	// display 
	$appareils_options.innerHTML = ''
	const $ul = document.createElement('ul');
	const applianceList = new Set();
	data.forEach((el) =>
		applianceList.add(`<li class='li-item'>${(el.appliance[0] + el.appliance.toLowerCase().slice(1))} <span><i class="bi bi-x"></i></span></li>`)
	)
	Array.from(applianceList).sort().forEach(i => $ul.innerHTML += i)

	$appareils_options.appendChild($ul);
}