/**
* Logan MacLeod
* Draw Table.js
* This file is responsible for parsing the users input, creating and
* displaying the table holding their entered ingredients.
*/

// Global Declarations
let ingredientList = []; 
let jsonData;

// Main Function
$(document).ready(() => {
    renderTable();
    $('#inputField').keypress(function (event) {
        handleEntry();   
    })
    $('#clearBtn').click(function (event) {
        clearTable();
    })
    $('#submitBtn').click(function (event) {
        getRecipes();
    })
});

/**
* @param: none
* @returns: none
* Functionality: this function makes the api call for the recipes and 
* parses the json response
*/
function getRecipes() {
    let iString = ingredientList.join();
    
    // setup parameters for the API query
    let params = {
        "apiKey" : "", // DELETE API KEY BEFORE PUSH
        "ingredients" : iString, // convert ingredients list to a sting seperated by commas
        "number" : "10",
        "limitLicense" : "true",
        "ranking" : "1",
        "ignorePantry" : "true"
    }
    let query = Object.keys(params)
                    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                    .join('&');
    let url = "https://api.spoonacular.com/recipes/findByIngredients?" + query;
    
    // make the API call
    fetch(url)
    .then(
        function(response) {
            // if response is not ok then log it
            if (response.status != 200) {
                console.log("There was a problem. Status Code: " + response.status + "\n");
                return;
            }
            // otherwise do stuff with data
            response.json().then(function(data) {
                console.log(data);
                jsonData = data;
                let counter = 0;
                for(let prop in data) {
                    // if the expected title and image are there then add them to the HTML elements
                    if (data[prop].title != null && data[prop].image != null) {
                        if (counter == 0) {
                            $('#titleOne').html(data[prop].title);
                            $('#recpOne').attr("src", data[prop].image );
                        }
                        else if (counter == 1) {
                            $('#titleTwo').html(data[prop].title);
                            $('#recpTwo').attr("src", data[prop].image );
                        }
                        else if (counter == 2) {
                            $('#titleThree').html(data[prop].title);
                            $('#recpThree').attr("src", data[prop].image );
                        }
                        else if (counter == 3) {
                            $('#titleFour').html(data[prop].title);
                            $('#recpFour').attr("src", data[prop].image );
                        }
                        else if (counter == 4) {
                            $('#titleFive').html(data[prop].title);
                            $('#recpFive').attr("src", data[prop].image );
                        }
                        else if (counter == 5) {
                            $('#titleSix').html(data[prop].title);
                            $('#recpSix').attr("src", data[prop].image );
                        }
                        else if (counter == 6) {
                            $('#titleSeven').html(data[prop].title);
                            $('#recpSeven').attr("src", data[prop].image );
                        }
                        else if (counter == 7) {
                            $('#titleEight').html(data[prop].title);
                            $('#recpEight').attr("src", data[prop].image );
                        }
                        else if (counter == 8) {
                            $('#titleNine').html(data[prop].title);
                            $('#recpNine').attr("src", data[prop].image );
                        }
                        else if (counter == 9) {
                            $('#titleTen').html(data[prop].title);
                            $('#recpTen').attr("src", data[prop].image );
                        }
                        else {
                            console.log("Something went wrong, check how many recipes you were expecting \n");
                        }
                    }
                    else {
                        console.log("response data image/title is null \n");
                    }
                    counter++;
                }
            });
        }
    )
    //catch fetch errors
    .catch(function (err) {
        console.log("Fetch Error: ", err, "\n");
    });
    return;
}

/**
* @param: none
* @returns: none
* Functionality: this checks for an enter key press when the user types
* into the HTML input field. 
*/
function handleEntry() {
    let key = (event.keyCode ? event.keyCode : event.which);
    let input = null;
    
    if (key == '13') {
        input = $('#inputField').val();
        addInputToTable(input);
        $('#inputField').val(" ");
    }
    return;
}

/**
* @param: none.
* @returns: none.
* Functionality: this renders and re-renders the HTML list of ingredients
* the user has entered.
*/
function renderTable() {
    // just clear the html stuff not the entire list
    $('#table').html('');
    for (let i = 0; i < ingredientList.length; i++) {
        $('#table').append('<li class="w3-display-container" id="i_' + i + '">' + ingredientList[i] + '<span onclick="removeFromTable(this.parentElement.id); this.parentElement.style.display=\'none\'" class="w3-button w3-transparent w3-display-right">&times;</span></li>');
        console.log( "ingredient is " + ingredientList[i].toString() + " ID: i" + i);
    }
    
    return;
};

/**
* @param: the user's input as a String
* @returns: none.
* Functionality: pushes the users input as a strong into the ingredients
* array.
*/
function addInputToTable(input) {
    ingredientList.push(input);
    renderTable(); // re render the table based on the updated list
    return;
}

/**
* @param: none
* @returns: none.
* Functionality: clears the html ingredients list/table as well as the
* ingredientsList array on the back-end.
*/
function clearTable() {
    $('#table').html('');
    ingredientList.length = 0; // this clears the list without creating errors if there are other refrences to the list
    return;
}

/**
* @param: The ID of the element to remove from the ingredients list.
* @returns: none.
* Functionality: clears an individual html element representing an ingredient from the list/table
*/
function removeFromTable(idToRemove) {
    if (idToRemove != null){
        let tempID = idToRemove;
        let numOfIdToDelete = tempID.split("_").pop();
        ingredientList.splice(numOfIdToDelete,1);
    }
    return;
}

/**
* @param: recipeNumber, The number (1-10) of the selected recipe.
* @returns: none.
* Functionality: displays the missing ingredients for the selected recipe.
*/
function displayRecipeData(recipeNumber) {
    let missIngredList = [];

    $('#missingIngredTable').html(''); // clear the table
    // update missing ingredients table
    if (recipeNumber == 1) {    
        for (let prop in jsonData[0].missedIngredients) {
            if (jsonData[0].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[0].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else if (recipeNumber == 2) {
        for (let prop in jsonData[1].missedIngredients) {
            if (jsonData[1].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[1].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else if (recipeNumber == 3) {
        for (let prop in jsonData[2].missedIngredients) {
            if (jsonData[2].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[2].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else if (recipeNumber == 4) {
        for (let prop in jsonData[3].missedIngredients) {
            if (jsonData[3].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[3].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else if (recipeNumber == 5) {
        for (let prop in jsonData[4].missedIngredients) {
            if (jsonData[4].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[4].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else if (recipeNumber == 6) {
        for (let prop in jsonData[5].missedIngredients) {
            if (jsonData[5].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[5].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else if (recipeNumber == 7) {
        for (let prop in jsonData[6].missedIngredients) {
            if (jsonData[6].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[6].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else if (recipeNumber == 8) {
        for (let prop in jsonData[7].missedIngredients) {
            if (jsonData[7].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[7].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else if (recipeNumber == 9) {
        for (let prop in jsonData[8].missedIngredients) {
            if (jsonData[8].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[8].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else if (recipeNumber == 10) {
        for (let prop in jsonData[9].missedIngredients) {
            if (jsonData[9].missedIngredients[prop].name != null) {
                let string = "";
                string = jsonData[9].missedIngredients[prop].name;
                $('#missingIngredTable').append('<li class="w3-display-container">' + string + '</li>');
            }
        }
    }
    else {
        console.log("Error recipieNumber is not a valid number: " + recipieNumber);
    }
    return;
}