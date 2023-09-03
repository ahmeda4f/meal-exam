

let logo = document.getElementsByClassName("img")[0];
let datashow = document.getElementById("datashow");
let searchContainer = document.getElementById("searchContainer");
let submit;
/////////////////////////////////



$(document).ready(() => {
    nameSearch("").then(() => {
        $(".loader").fadeOut(3500)
        $("body").css("overflow", "visible")

    })
})


logo.addEventListener("click", function(e) {
    location.reload();
});

    

/// Side Navbar Functions//////////////`
function openNav() {
        $(".sideNav").animate({
      left: 0 }, 380)


    $(".open-close-icon").addClass("fa-x");

    $(".links li").each(function(index) {
        $(this).delay((index + 1) * 100).animate({
            top: 0
        }, 340);
    });
}


function navClose() {
    let width = $(".sideNav .navLinks").outerWidth()
    $(".sideNav").animate({
        left: -width
    }, 340)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 400)
}

navClose()

$(".sideNav i.open-close-icon").click(() => {
    if ($(".sideNav").css("left") == "0px") {
        navClose()
    } else {
        openNav()
    }
})


///////////////////////////////////////

/** 
* ! Home Display //////////////////////
*/

function displayMeals(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${data[i].idMeal}')" class="meal overflow-hidden position-relative  rounded-3 customCursor">
                    <img class="img-fluid" src="${data[i].strMealThumb}" alt="${data[i].strMeal}">
                    <div class="mealoverlay p-3 d-flex align-items-center justify-content-center  position-absolute  text-center text-black ">
                        <h3 class="text-center">${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    datashow.innerHTML = box
}

///////////////////////////////////////


/**
 * ? Area //////////////////////////
 */
async function getMealsOfArea(area) {
    datashow.innerHTML = ""
    $(".loadercontent").fadeIn(340)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loadercontent").fadeOut(340)

}
async function getAreas() {
    datashow.innerHTML = ""
    $(".loadercontent").fadeIn(340)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayAreas(respone.meals)
    $(".loadercontent").fadeOut(340)

}


function displayAreas(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getMealsOfArea('${data[i].strArea}')" class="text-center rounded-4 customCursor">
                        <i class="fa-solid fa-map-location fs-1 hovers"></i>
                        <h3 class="text-secondary hovers">${data[i].strArea}</h3>
                </div>
        </div>
        `
    }

    datashow.innerHTML = box
}

////////////////////////////////////


/*
* * Category //////////////////////////
*/

async function getMealsOfCat(category) {
    datashow.innerHTML = ""
    $(".loadercontent").fadeIn(320)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".loadercontent").fadeOut(320)

}
async function getCategories() {
    datashow.innerHTML = ""
    $(".loadercontent").fadeIn(320)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".loadercontent").fadeOut(320)

}

function displayCategories(data) {
    let box = "";

    for (let index = 0; index < data.length; index++) {
        box += `
        <div class="col-md-3">
                <div onclick="getMealsOfCat('${data[index].strCategory}')" class="meal rounded-3 overflow-hidden position-relative customCursor">
                    <img class="img-fluid" src="${data[index].strCategoryThumb}" alt="" srcset="">
                    <div class="mealoverlay text-center text-black p-3 position-absolute ">
                        <h3>${data[index].strCategory}</h3>
                        <p>${data[index].strCategoryDescription.split(" ").slice(0,16).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    datashow.innerHTML = box
}

/**
 * * Ingredients ///////////////////
 */
async function getMealsofIngs(ingredients) {
    datashow.innerHTML = ""
    $(".loadercontent").fadeIn(335)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()
    displayMeals(response.meals.slice(0, 16))
    $(".loadercontent").fadeOut(335)

}

async function getIngredients() {
    datashow.innerHTML = ""
    $(".loadercontent").fadeIn(328)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    displayIngredients(respone.meals.slice(0, 16))
    $(".loadercontent").fadeOut(328)

}


function displayIngredients(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getMealsofIngs('${data[i].strIngredient}')" class="rounded-3 text-center customCursor">
                        <i class="fa-solid fa-bowl-food fs-1 hover"></i>
                        <h3 class="hover">${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    datashow.innerHTML = box
}



////////////////////////////////////


/**
 * ! Meal Details ///////////////////
 */
async function getMealDetails(mealId) {
    navClose()
    datashow.innerHTML = ""
    $(".loadercontent").fadeIn(333)
    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    respone = await respone.json();
    displayMealDetails(respone.meals[0])
    $(".loadercontent").fadeOut(333)

}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";

    const ingredientsList = Array.from({ length: 20 }, (_, index) => {
        const ingredient = meal[`strIngredient${index + 1}`];
        const measure = meal[`strMeasure${index + 1}`];
        return ingredient ? `
          <li class="alert m-2 p-1 alert-dark hoverbg">
            <span class="measure">${measure}</span>
            <span class="ingredient">${ingredient}</span>
          </li>` : null;
      })
      .filter(Boolean)
      .join('');
      
    
      const tags = meal.strTags?.split(',') || [];
      const tagsList = tags
        .map((tag) => `<li class="alert m-2 p-1 alert-warning hoversbg">${tag}</li>`)
        .join('');
      


    let box = `
    <div class="col-md-5">
                <img class="img-fluid rounded-4" src="${meal.strMealThumb}"
                    alt=">${meal.strMeal}">
                    <h2 class="my-4 mx-2 text-warning">${meal.strMeal}</h2>
            </div>
            <div class="col-md-6 m-2">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h4 class="text-warning"><span class="text-white fw-light">Area : </span>${meal.strArea}</h4>
                <h4 class="text-warning"><span class="text-white fw-light">Category : </span>${meal.strCategory}</h4>
                <h3 class="my-2 fw-light">Recipes :</h3>

                <ul class=" d-flex flex-wrap g-4 list-unstyled " >
                    ${ingredientsList}
                </ul>

                <h3 class="my-2 fw-light">Tags :</h3>

                <ul class="d-flex flex-wrap g-4 list-unstyled hovers">
                    ${tagsList}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-primary">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    datashow.innerHTML = box
}






////////////////////////////////////

/** 
 * ? Search ////////////////////////
*/
function searchInput() {
    searchContainer.innerHTML = `
    <div class="row py-5 ">
        <div class="col-md-6 ">
            <input oninput="nameSearch(this.value)" class="form-control sty  " type="text" placeholder="Search with name..">
        </div>
        <div class="col-md-6">
            <input oninput="letterSearch(this.value)" class="form-control sty " type="text" placeholder="Search with first letter.."  maxlength="1">
        </div>
    </div>`

    datashow.innerHTML = ""
}

async function nameSearch(namevalue) {
    navClose()
    datashow.innerHTML = ""
    $(".loadercontent").fadeIn(310)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${namevalue}`)
    response = await response.json()
    if (response.meals) {
        displayMeals(response.meals)
    }
    else{
        displayMeals([])
    }



    $(".loadercontent").fadeOut(310)

}

async function letterSearch(lettervalue) {
    navClose()
    datashow.innerHTML = ""

    $(".loadercontent").fadeIn(290)
    if (lettervalue === "") {
        lettervalue = "a";
      }

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${lettervalue}`)
    response = await response.json()
    if (response.meals) {
        displayMeals(response.meals)
    }
    else{
        displayMeals([])
    }
        $(".loadercontent").fadeOut(290)

}

////////////////////////////////////














function contactSectionShow() {
    datashow.innerHTML = `<div class="contact  d-flex justify-content-center align-items-center vh-100">
    <div class="container bg-dark p-4 text-center w-75">
        <div class="row g-5">
            <div class="col-md-6">
                <input id="nameInput" oninput="inputsValidation()" type="text" class="form-control sty" placeholder="Enter Your Name..">
                <div id="nameAlert" class= " mt-3 alert alert-danger w-100  d-none">
                    Special characters and numbers aren't  allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" oninput="inputsValidation()" type="email" class="form-control sty " placeholder="Enter Your Email..">
                <div id="emailAlert" class= " mt-3 alert alert-danger w-100  d-none">
                   Enter valid Email (ahmed@gmail.com)
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" oninput="inputsValidation()" type="text" class="form-control sty " placeholder="Enter Your Phone Number..">
                <div id="phoneAlert" class= " mt-3 alert alert-danger w-100  d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" oninput="inputsValidation()" type="number" class="form-control sty " placeholder="Enter Your Age..">
                <div id="ageAlert" class= " mt-3 alert alert-danger w-100  d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" oninput="inputsValidation()" type="password" class="form-control sty " placeholder="Enter Your Password">
                <div id="passwordAlert" class="  mt-3 alert alert-danger w-100 d-none">
                    Enter valid password (10 chars min , letter and number required) 
                </div>
            </div>
            <div class="col-md-6">
                <input  id="confrimPassInput" oninput="inputsValidation()" type="password" class="form-control sty " placeholder="Confrim Password">
                <div id="confrimPassAlert" class=" mt-3 alert alert-danger w-100  d-none"
                   Password doesnt match
                </div>
            </div>
        </div>
        <button  type="submit" id="submit" disabled class="btn btn-outline-danger px-5 mt-4">Submit</button>
    </div>
</div> `
    submit = document.getElementById("submit")

    submit.addEventListener('click',function (params) {
        location.reload()
        
    })
//////////////////////////////////////////////////

    /**
     * ! INPUT VALIDATION
     */

       

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameFocus = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailFocus = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneFocus = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageFocus = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordFocused = true
    })

    document.getElementById("confrimPassInput").addEventListener("focus", () => {
        confrimPasswordFocus = true
    })
}
let nameFocus = false;

let emailFocus = false;
let phoneFocus = false;

let ageFocus = false;

let passwordFocused = false;
let confrimPasswordFocus = false;
//////////////////////////////////////////////////////////



/// Validate func
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("emailInput").value)
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|100)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{10,}$/.test(document.getElementById("passwordInput").value))
}

function confrimPassVlaidation () {
    return document.getElementById("confrimPassInput").value == document.getElementById("passwordInput").value
}

/////////////////////////////////////////////////// 

function inputsValidation() {
    if (nameFocus) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailFocus) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneFocus) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageFocus) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordFocused) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (confrimPasswordFocus) {
        if (confrimPassVlaidation ()) {
            document.getElementById("confrimPassAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("confrimPassAlert").classList.replace("d-none", "d-block")

        }
    }
/////////////////////////////////////////////

    if (nameValidation() &&  emailValidation() &&phoneValidation() &&ageValidation() &&passwordValidation() &&confrimPassVlaidation ()) {
        submit.removeAttribute("disabled")
    } 
    else {
        submit.setAttribute("disabled", true)
    }
}
