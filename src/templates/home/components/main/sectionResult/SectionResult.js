import { isExciteOrNotEmpty } from '../../../../../services/utils/validator.js';

export const SectionResult = (dataList) => {
  cardRecipes(dataList);
};

const cardRecipeTemplate = (data) => {
  const $search_result = document.getElementById('search_result');
  const $advance_search = document.getElementById('advance_search');
  const $interface = document.querySelector('.alert-warning');
  const $searchInputVal = document.querySelector('#user_input').value;
  if (data.length == 0) {
    $interface.innerHTML = '';
    // $advance_search.style
    $advance_search.style.display = $advance_search.style.display !== 'none' && 'none';
    $interface.style.display = $interface.style.display !== 'flex' && 'flex';
    const $nonResultStr = `<p>Aucune recette ne contient <strong>${$searchInputVal} </strong> <br />
		vous pouvez chercher « tarte aux pommes », « poisson » etc ...!</p>`;
    $interface.insertAdjacentHTML('afterbegin', $nonResultStr);
    return;
  }

  const { image, name, ingredients, description, time } = data;

  const $tbs = setTableData(ingredients);

  const card_html = `<div class="col-2">
	<div class="card h-100">
		<img src="/assets/Photos P7 JS Les petits plats/${image}" class="card-img-top" alt="...">
		<div class="card-body">
			<h5 class="card-title">${name}</h5>
			<h6 class="card-title">RECETTE</h6>
			<p class="card-text">${description.slice(0, 202)}</p>
			<span class='time'>${time}min</span>
		</div>
		<div class="card-footer container m-0 p-0 border-0">
			<table class="table border-white ">
				<tr>
					<th>
						<h4>ingredients</h4>
					</th>
					<th></th>
				</tr>
				
                 ${$tbs}
			</table>
			</div>
			</div>
			</div>`;

  $advance_search.style.display = $advance_search.style.display !== 'block' && 'block';
  $interface.style.display = $interface.style.display !== 'none' && 'none';
  $search_result.insertAdjacentHTML('beforeend', card_html);
};
const cardRecipes = (dataList) => {
  const $search_result = document.getElementById('search_result');
  $search_result.innerHTML = '';
  if (isExciteOrNotEmpty(dataList)) {
    dataList.forEach((data) => {
      cardRecipeTemplate(data);
    });
    return;
  }
  cardRecipeTemplate(dataList);
};

const setTableData = (ingredients) => {
  let index = 0;
  let ingredientData = '';
  while (index < ingredients.length) {
    const { ingredient, quantity, unit } = ingredients[index];

    ingredientData += `<tr>
				<td>${ingredient}<br>
				<span class='quantity'>${quantity ?? ''} ${unit ?? ''}</span>
				</td>`;

    if (index + 1 < ingredients.length) {
      index++;
      const { ingredient, quantity, unit } = ingredients[index];
      ingredientData += `<td>${ingredient}<br>
				<span class='quantity'>${quantity ?? ''} ${unit ?? ''}</span>
				</td>
			</tr>`;
    } else {
      ingredientData += '<td></td></tr>';
    }

    index++;
  }

  return ingredientData;
};
