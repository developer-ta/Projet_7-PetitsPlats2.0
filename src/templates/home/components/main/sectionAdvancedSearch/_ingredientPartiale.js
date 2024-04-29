// Dom element
const $ingredient_Options = document.querySelector('#ingredients>.options');

export const ingredientDisplay = (data) => {
  // display

  $ingredient_Options.innerHTML = '';

  const $ul = document.createElement('ul');

  const ingredientList = [];

  data.forEach((el) => el.ingredients.forEach((ing) => {
    const $li = document.createElement('li');
    $li.className = 'li-item ingredient';
    $li.id = el.id;
    $li.innerHTML += `${
      ing.ingredient[0].toUpperCase() + ing.ingredient.slice(1).toLowerCase()
    } `;

    ingredientList.push($li);
  }));

  // filter index unique
  const textContents = ingredientList.map((el) => el.textContent.toLowerCase());

  const uniqueElements = ingredientList.filter(
    (el, i) => i === textContents.indexOf(el.textContent.toLowerCase()),
  );

  uniqueElements.sort((a, b) => a.textContent.localeCompare(b.textContent));
  uniqueElements.forEach((li) => $ul.appendChild(li));

  $ingredient_Options.appendChild($ul);
};
