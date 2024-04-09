const searchBox = document.querySelector('.searchBox')
const searchButton = document.querySelector('.searchButton')
const container = document.querySelector('.recipe-container')
const recipeDetailContent = document.querySelector('.recipe-detail-content')
const recipeCloseBtn = document.querySelector('.recipe-close-btn')

//function to get reciepes
const fetchRecipes = async (queries) => {
  container.innerHTML = "<h2>Searching...</h2>"
  const apiUrl = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${queries}`)
  const response = await apiUrl.json();

  container.innerHTML = "";
  response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div')
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
      <img src ="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <p><span>${meal.strArea}</span> Dish</p>
      <p> Belongs to <span>${meal.strCategory}</span> Category</p>
 `
    const button = document.createElement('button')
    button.textContent = "View Recipe"
    recipeDiv.appendChild(button)

    button.addEventListener('click', () => {
      openRecipePopup(meal)
    })

    container.appendChild(recipeDiv)
  });
}
const openRecipePopup = (meal) => {
  recipeDetailContent.innerHTML = `
    <h3 class="recipeName">${meal.strMeal}</h3>
    <h4>Ingredients : </h4>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
   
    <div class="recipeInstructions">
      <h3>Instructions:</h3>
       <p > ${meal.strInstructions}</p>
    </div>
    
    `
  recipeDetailContent.parentElement.style.display = "block";
}

const fetchIngredients = (meal) => {
  let ingredientslist = ""
  for (let i = 1; i <= 20; i++) {
    const Ingredients = meal[`strIngredient${i}`]
    if (Ingredients) {
      const measure = meal[`strMeasure${i}`];
      ingredientslist += `<li>${measure} ${Ingredients}</li>`
    }
    else {
      break;
    }
  }
  return ingredientslist;
}

recipeCloseBtn.addEventListener('click', ()=>{
  recipeDetailContent.parentElement.style.display="none";
})
searchButton.addEventListener('click', (e) => {
  e.preventDefault()
  const data = searchBox.value.trim();
  fetchRecipes(data)


});
