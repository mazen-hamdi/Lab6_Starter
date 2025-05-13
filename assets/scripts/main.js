// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {

  return JSON.parse(localStorage.getItem('recipes')) || [];
}


/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	
  const main = document.querySelector('main');
  recipes.forEach((recipe) => {
    const card = document.createElement('recipe-card');
    card.data = recipe;
    main.appendChild(card);
  });
}
	// A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>


/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {


  localStorage.setItem('recipes', JSON.stringify(recipes));
}
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.


/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
/* ----------  B2‑B13  ---------- */
function initFormHandler() {
  /* -- references -- */
  const form      = document.getElementById('new-recipe');
  const main      = document.querySelector('main');
  const clearBtn  = form.querySelector('button.danger');

  /* -- B3: submit handler -- */
  form.addEventListener('submit', (event) => {
    event.preventDefault();                // stop page refresh

    /* -- B4: grab form data -- */
    const formData = new FormData(form);

    /* -- B5: build recipeObject -- */
    const recipeObject = {};
    formData.forEach((value, key) => (recipeObject[key] = value));
    if (!recipeObject.rating) recipeObject.rating = 0;  // radio might be unset

    /* -- B6 & B7: create and fill card -- */
    const card = document.createElement('recipe-card');
    card.data = recipeObject;

    /* -- B8: append to page -- */
    main.appendChild(card);

    /* -- B9: persist in localStorage -- */
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);

    form.reset();   // convenient UX
  });

  /* -- B10‑B13: clear‑storage button -- */
  clearBtn.addEventListener('click', () => {
    localStorage.clear();            // B12
    main.innerHTML = '';             // B13
  });
}