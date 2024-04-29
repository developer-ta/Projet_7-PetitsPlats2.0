import { isExciteOrNotEmpty } from '../services/utils/validator.js';

export class RecipeModel {
  constructor(data) {
    const { recipes } = data;
    this._recipes = recipes;

    this.isStocked = false;

    // set recipes
    this.recipes = this._recipes;
  }

  get recipes() {
    if (isExciteOrNotEmpty(this._recipes)) {
      console.log('this._recipes: ', this._recipes);

      return this._recipes;
    }

    return (this.getLocalStorage('recipes'));
  }

  /**
	 * @param {[]} recipes
	 */

  set recipes(recipes) { this.setLocalStorage('recipes', recipes); }

  setLocalStorage(key, recipes) {
    if (this.getLocalStorage(key) == null || isExciteOrNotEmpty(recipes)) {
      const recipesStr = JSON.stringify(recipes);
      localStorage.setItem(key, recipesStr);

      this.isStocked = true;
    }

    this.isStocked = false;
  }

  getLocalStorage(key) {
    const data = localStorage.getItem(key);

    if (data != null) {
      return JSON.parse(data);
    }
    return null;
  }
}
