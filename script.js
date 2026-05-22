// Confirms that the JavaScript file has connected correctly

console.log("Student Spoon website loaded");

// Recipe search function for recipes.html

function searchRecipes() {

    // Gets the search input and changes it to lowercase for easier matching

    const input = document.getElementById("searchInput").value.toLowerCase();

    // Selects all recipe cards on the page

    const cards = document.querySelectorAll(".recipe-card");

    // Message area used to give feedback to the user

    const message = document.getElementById("searchMessage");

    let found = false;

    // Loops through each recipe card and checks if it matches the search input

    cards.forEach(card => {

        const recipeName = card.getAttribute("data-name");

        if (recipeName.includes(input)) {

            card.style.display = "block";

            found = true;

        } else {

            card.style.display = "none";

        }

    });

    // Displays feedback depending on whether a recipe was found

    if (found) {

        message.textContent = "Matching recipes found.";

    } else {

        message.textContent = "No recipes found.";

    }

}

// Recipe upload form functionality for upload.html

const recipeForm = document.getElementById("recipeForm");

if (recipeForm) {

    recipeForm.addEventListener("submit", function(event) {

        // Prevents the page from refreshing when the form is submitted

        event.preventDefault();

        // Gets user input values from the form

        const recipeName = document.getElementById("recipeName").value;

        const ingredients = document.getElementById("ingredients").value;

        const instructions = document.getElementById("instructions").value;

        const cost = document.getElementById("cost").value;

        // Selects the message area and uploaded recipe display section

        const message = document.getElementById("formMessage");

        const uploadedRecipes = document.getElementById("uploadedRecipes");

        // Checks that all fields have been completed before adding the recipe

        if (recipeName === "" || ingredients === "" || instructions === "" || cost === "") {

            message.textContent = "Please complete all fields before submitting.";

            return;

        }

        // Creates a new recipe card on the page

        const newCard = document.createElement("div");

        newCard.classList.add("card");

        // Adds the submitted recipe details into the new card

        newCard.innerHTML = `
<h3>${recipeName}</h3>
<p><strong>Ingredients:</strong> ${ingredients}</p>
<p><strong>Instructions:</strong> ${instructions}</p>
<p><strong>Estimated Cost:</strong> ${cost}</p>

        `;

        // Adds the new recipe card to the upload page

        uploadedRecipes.appendChild(newCard);

        // Gives the user a success message and clears the form

        message.textContent = "Recipe added successfully.";

        recipeForm.reset();

    });

}

// Review form functionality for reviews.html

const reviewForm = document.getElementById("reviewForm");

if (reviewForm) {

    reviewForm.addEventListener("submit", function(event) {

        // Prevents the page from refreshing when the review is submitted

        event.preventDefault();

        // Gets user input values from the review form

        const name = document.getElementById("reviewName").value;

        const recipe = document.getElementById("reviewRecipe").value;

        const review = document.getElementById("reviewText").value;

        // Selects the message area and review display section

        const message = document.getElementById("reviewMessage");

        const newReviews = document.getElementById("newReviews");

        // Checks that all fields have been completed before adding the review

        if (name === "" || recipe === "" || review === "") {

            message.textContent = "Please complete all review fields.";

            return;

        }

        // Creates a new review card on the page

        const reviewCard = document.createElement("div");

        reviewCard.classList.add("card");

        // Adds the submitted review details into the new card

        reviewCard.innerHTML = `
<h3>${name}</h3>
<p>⭐ 5/5</p>
<p><strong>${recipe}</strong></p>
<p>${review}</p>

        `;

        // Adds the new review card to the reviews page

        newReviews.appendChild(reviewCard);

        // Gives the user a success message and clears the form

        message.textContent = "Review added successfully.";

        reviewForm.reset();

    });

}
 