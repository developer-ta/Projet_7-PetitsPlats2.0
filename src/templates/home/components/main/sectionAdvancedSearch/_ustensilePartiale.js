const ustensileDisplay = (data) => {
  // Dom
  const $ustensilesOptions = document.querySelector("#ustensiles>.options");

  // display

  $ustensilesOptions.innerHTML = "";
  const $ul = document.createElement("ul");
  const ustensileList = [];
  data.forEach((el) =>
    el.ustensils.forEach((ust) => {
      const $li = document.createElement("li");
      $li.className = "li-item ustensile";
      $li.id = el.id;
      $li.innerHTML += `${ust[0].toUpperCase() + ust.slice(1).toLowerCase()}`;
      ustensileList.push($li);
    }),
  );

  // filter index unique
  const textContents = ustensileList.map((el) => el.textContent.toLowerCase());

  const uniqueElements = ustensileList.filter(
    (el, index) => index === textContents.indexOf(el.textContent.toLowerCase()),
  );
  uniqueElements.sort((a, b) => a.textContent.localeCompare(b.textContent));
  uniqueElements.forEach((li) => $ul.appendChild(li));
  $ustensilesOptions.appendChild($ul);
};

export { ustensileDisplay };
