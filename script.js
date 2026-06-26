const recipes = [
  {
    title: "Pesto Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    description: "A quick student pasta dish with fresh pesto and parmesan.",
    cost: "£1.20",
    time: "15 mins",
    rating: "★★★★☆",
    hotPick: false,
    ingredients: "Pasta, pesto, parmesan, olive oil, black pepper",
    instructions: "Boil the pasta until cooked. Drain it, stir through pesto and olive oil, then top with parmesan and black pepper."
  },
  {
    title: "Egg Fried Rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
    description: "Simple fried rice using egg, soy sauce and basic cupboard ingredients.",
    cost: "£0.90",
    time: "10 mins",
    rating: "★★★★☆",
    hotPick: false,
    ingredients: "Rice, egg, soy sauce, spring onions, oil",
    instructions: "Fry the egg in a pan, add cooked rice, mix in soy sauce and spring onions, then stir until hot."
  },
  {
    title: "Falafel Wrap",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    description: "A filling wrap with falafel, salad and garlic sauce.",
    cost: "£1.80",
    time: "10 mins",
    rating: "★★★★☆",
    hotPick: false,
    ingredients: "Wrap, falafel, lettuce, tomato, cucumber, garlic sauce",
    instructions: "Warm the wrap, add falafel and salad, drizzle with garlic sauce, then roll tightly and serve."
  },
  {
    title: "Chicken Gyros",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    description: "Greek-style chicken gyros with salad and tzatziki in warm pita bread.",
    cost: "£2.60",
    time: "20 mins",
    rating: "★★★★★",
    hotPick: true,
    ingredients: "Chicken, pita bread, lettuce, tomato, red onion, tzatziki",
    instructions: "Cook the chicken until golden. Warm the pita bread, add salad and chicken, then finish with tzatziki."
  }
];

let savedRecipes = [];

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");

  const menu = document.getElementById("navMenu");
  menu.classList.remove("show");

  if (pageId === "saved") {
    displaySavedRecipes();
  }
}

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}

function createRecipeCard(recipe, index) {
  const badge = recipe.hotPick ? `<span class="hot-badge">Hot Pick</span>` : "";

  return `
    <div class="card">
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="card-content">
        <h3>${recipe.title} ${badge}</h3>
        <p>${recipe.description}</p>
        <p><strong>${recipe.cost}</strong> • ${recipe.time} • ${recipe.rating}</p>
        <button onclick="viewRecipe(${index})">View Recipe</button>
        <button class="secondary" onclick="saveRecipe(${index})">Save Recipe</button>
      </div>
    </div>
  `;
}

function displayRecipes(recipeList = recipes) {
  const grid = document.getElementById("recipeGrid");
  const noResults = document.getElementById("noResults");

  grid.innerHTML = "";
  noResults.textContent = "";

  if (recipeList.length === 0) {
    noResults.textContent = "No recipes found. Try searching for another meal.";
    return;
  }

  recipeList.forEach((recipe, index) => {
    grid.innerHTML += createRecipeCard(recipe, index);
  });
}

function displayHomeRecipes() {
  const homeGrid = document.getElementById("homeRecipeGrid");
  homeGrid.innerHTML = "";

  recipes.slice(0, 3).forEach((recipe, index) => {
    homeGrid.innerHTML += createRecipeCard(recipe, index);
  });
}

function searchRecipes() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase().trim();

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchValue) ||
    recipe.description.toLowerCase().includes(searchValue) ||
    recipe.ingredients.toLowerCase().includes(searchValue)
  );

  displayRecipes(filteredRecipes);
}

function viewRecipe(index) {
  const recipe = recipes[index];
  const badge = recipe.hotPick ? `<p><span class="hot-badge">Hot Pick</span></p>` : "";

  document.getElementById("detailsContent").innerHTML = `
    <div class="details">
      <img src="${recipe.image}" alt="${recipe.title}">

      <div>
        <h2>${recipe.title}</h2>
        ${badge}

        <p>${recipe.description}</p>
        <p><strong>Price:</strong> ${recipe.cost}</p>
        <p><strong>Cooking Time:</strong> ${recipe.time}</p>
        <p><strong>Rating:</strong> ${recipe.rating}</p>

        <h3>Ingredients</h3>
        <p>${recipe.ingredients}</p>

        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>

        <button onclick="saveRecipe(${index})">Save Recipe</button>

        <h3>Leave a Review</h3>

        <select id="reviewRating">
          <option value="">Select rating</option>
          <option>★★★★★</option>
          <option>★★★★☆</option>
          <option>★★★☆☆</option>
          <option>★★☆☆☆</option>
          <option>★☆☆☆☆</option>
        </select>

        <textarea id="reviewText" placeholder="Write your review"></textarea>

        <button onclick="submitReview()">Submit Review</button>

        <p id="reviewMessage"></p>
      </div>
    </div>
  `;

  showPage("recipeDetails");
}

function saveRecipe(index) {
  const recipe = recipes[index];

  if (!savedRecipes.includes(recipe)) {
    savedRecipes.push(recipe);
    alert(`${recipe.title} has been saved.`);
  } else {
    alert(`${recipe.title} is already saved.`);
  }

  displaySavedRecipes();
}

function displaySavedRecipes() {
  const savedList = document.getElementById("savedList");

  if (!savedList) return;

  savedList.innerHTML = "";

  if (savedRecipes.length === 0) {
    savedList.innerHTML = `<p class="section-text">No saved recipes yet.</p>`;
    return;
  }

  savedRecipes.forEach(recipe => {
    savedList.innerHTML += `
      <div class="card">
        <img src="${recipe.image}" alt="${recipe.title}">
        <div class="card-content">
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <p><strong>${recipe.cost}</strong> • ${recipe.time} • ${recipe.rating}</p>
        </div>
      </div>
    `;
  });
}

function uploadRecipe(event) {
  event.preventDefault();

  const title = document.getElementById("recipeTitle").value.trim();
  const ingredients = document.getElementById("recipeIngredients").value.trim();
  const instructions = document.getElementById("recipeInstructions").value.trim();
  const image = document.getElementById("recipeImage").value.trim();

  if (title === "" || ingredients === "" || instructions === "") {
    document.getElementById("uploadMessage").textContent = "Please complete all required fields.";
    return;
  }

  recipes.push({
    title: title,
    image: image || "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=900&q=80",
    description: "Recipe uploaded by a Student Spoon user.",
    cost: "Budget meal",
    time: "Varies",
    rating: "New",
    hotPick: false,
    ingredients: ingredients,
    instructions: instructions
  });

  document.getElementById("uploadMessage").textContent = "Recipe uploaded successfully.";
  event.target.reset();

  displayRecipes();
  displayHomeRecipes();
}

function submitReview() {
  const rating = document.getElementById("reviewRating").value;
  const review = document.getElementById("reviewText").value.trim();

  if (rating === "" || review === "") {
    document.getElementById("reviewMessage").textContent = "Please select a rating and write a review.";
  } else {
    document.getElementById("reviewMessage").textContent = "Review submitted successfully.";
  }
}

function submitFeedback(event) {
  event.preventDefault();

  document.getElementById("feedbackMessage").textContent = "Thank you for your feedback.";
  event.target.reset();
}

displayRecipes();
displayHomeRecipes();
displaySavedRecipes();
