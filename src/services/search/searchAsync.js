import { HomeController } from "../../controllers/HomeController.js";
import { isExciteOrNotEmpty } from "../utils/validator.js";

export class searchAsync {
  constructor(recipeViewModel) {
    this.$searchInput = document.querySelector("#user_input");

    this._recipes = recipeViewModel.recipes;

    this._valUserInReg = null;

    this.resultRecipes = null;

    this.init();
  }

  init() {
    HomeController.mainDisplay(this._recipes);

    this.bindEventSearch();
  }

  bindEventSearch() {
    let $searchInput = document.querySelector("#user_input");

    let $search_btn = document.querySelector(".bi-search");

    let isDataExcite = isExciteOrNotEmpty(this._recipes);

    $search_btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      if ($searchInput.value.length === 0 && isDataExcite) {
        HomeController.mainDisplay(this._recipes);
        return;
      } else if ($searchInput.value.length < 3 && isDataExcite) {
        debugger;
        if (
          this.ValUserInRegExp === null &&
          new RegExp("^[a-zA-Z]+$").test($searchInput.value)
        )
          HomeController.mainDisplay([]);
        else HomeController.mainDisplay(this._recipes);
        return;
      }

      this.resultRecipes = [];

      this.resultRecipes = await this.getResultByChunkListAsync();

      if (isExciteOrNotEmpty(this.resultRecipes)) {
        HomeController.mainDisplay(this.resultRecipes);
      }
      // by default this.resultRecipes=[]
      HomeController.mainDisplay(this.resultRecipes);
    });
  }

  get ValUserInRegExp() {
    let $searchInput = document.querySelector("#user_input");
    let $searchWrapper = document.querySelector(".wrapper");
    let $mgErrorSpan = document.querySelector(".mgError");

    const mgError = "Veuillez entrer Caractère valide ! Veuillez réessayer !";
    let valInput = $searchInput.value;
    let isValideInStr = new RegExp("^[a-zA-Z]+$").test(valInput);

    if (!isValideInStr) {
      if (!$mgErrorSpan)
        $searchWrapper.insertAdjacentHTML(
          "afterend",
          `<span class="mgError">${mgError}</span>`,
        );
      else $mgErrorSpan.style.display = "block";
    } else if (valInput.length >= 3 && isValideInStr) {
      if ($mgErrorSpan) $mgErrorSpan.style.display = "none";

      ///\bc(oc)\b/gim
      // new RegExp(`\\b${valInput}\\w+`, "gim");
      // new RegExp(`\\b${valInput}\\w`, "gim");
      // new RegExp(`\\b${valInput}`, "gim");
      return (this._valUserInReg = new RegExp(`\\b${valInput}`, "gim"));
    }
    return null;
  }

  searchUserIn = async (start, end) => {
    const foundIndexes = [];

    if (!this.ValUserInRegExp) return foundIndexes;

    const resultPromise = new Promise((resolve) => {
      for (let index = start; index < end; index++) {
        const recipe = this._recipes[index];

        const { name, ingredients, description } = recipe;

        if (
          name.search(this._valUserInReg) !== -1 ||
          description.search(this._valUserInReg) !== -1 ||
          ingredients
            .map((obj) => obj.ingredient)
            .toString()
            .search(this._valUserInReg) !== -1
        ) {
          foundIndexes.push(recipe);
        }
      }

      resolve(foundIndexes);
    });

    return resultPromise;
  };

  getResultByChunkListAsync = async () => {
    const maxQuantityLot = 4;
    const lengthArr = this._recipes.length;
    const lot = lengthArr / maxQuantityLot;
    const promises = [];

    for (let i = 0; i < maxQuantityLot; i++) {
      const lotStart = Math.floor(i * lot);
      const lotEnd = Math.floor((i + 1) * lot);
      // res type []
      promises.push(this.searchUserIn(lotStart, lotEnd));
    }
    const res = await Promise.all(promises);
    return res.flat();
  };
}
