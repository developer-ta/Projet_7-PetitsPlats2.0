//Dom element
const $ingredient_options = document.querySelector('#ingredients>.options');

export const ingredientDisplay = (data) => {
  $ingredient_options.innerHTML = '';

  const $ul = document.createElement('ul');

  const ingredientList = [];

  data.forEach((el) =>
    el.ingredients.forEach((ing) => {
      const $li = document.createElement('li');
      $li.className = 'li-item ingredient';
      $li.id = el.id;
      $li.innerHTML += `${
        ing.ingredient[0].toUpperCase() + ing.ingredient.slice(1).toLowerCase()
      } `;

      ingredientList.push($li);
    })
  );

  //filter index unique
  let textContents = ingredientList.map((el) => el.textContent.toLowerCase());

  let uniqueElements = ingredientList.filter(
    (el, i) => i == textContents.indexOf(el.textContent.toLowerCase())
  );

  uniqueElements.sort((a, b) => a.textContent.localeCompare(b.textContent));
  uniqueElements.forEach((li) => $ul.appendChild(li));

  $ingredient_options.appendChild($ul);
};
