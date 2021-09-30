"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  
  if(!foundPerson){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let foundPerson = promptFor("Found " + people.firstName + " " + people.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(foundPerson){
    case "info":
    // TODO: get person's
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

console.log(searchByName(people));



function searchByEyeColor(){
  let eyeColor = promptFor("What is the person's eye color?", autoValid);

  let personEyeColor = people.filter(function(coloredEyes){
    if(coloredEyes.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  return personEyeColor;
}


function searchByGender(people){
  let gender = promptFor("Is the person male or female?", autoValid);

  let personGender = people.filter(function(whatGender){
        if(whatGender.gender === gender){
          return true;
        }
        else{
          return false;
        }
      })
      return personGender;
}


function searchByOccupation(people){
	let occupation = promptFor("What is the person's occupation?", autoValid);

    let personOccupation = people.filter(function(whatOccupation){
        if(whatOccupation.occupation === occupation){
          return true;
    }
    else{
      return false;
    }
  })
    return personOccupation;
}


function searchByHeight(people){
  let height = promptFor("What is the height of the person in inches?", autoValid);

  let personHeight = people.filter(function(whatHeight){
    if(whatHeight.height == height){
      return true;
  }
  else{
    return false;
  }
  })
    return personHeight;
}


function searchByWeight(people){
  let weight = promptFor("What is the weight of the person in pounds?", autoValid);

  let personWeight = people.filter(function(whatWeight){
    if(whatWeight.weight == weight){
      return true;
  }
  else{
    return false;
  }
  })
    return personWeight;
}


//TODO: add other trait filter functions here.

// function for searching by traits.
function searchMultipleTraits(people){
  let multipleTraits = people;
  do{
    let inputMultipleTraits = promptFor('What trait would you like to search?\neyecolor\ngender\noccupation\nheight\nweight', autoValid);

    switch(inputMultipleTraits){ 
      case "eyecolor":
        multipleTraits = searchByEyeColor(multipleTraits);
        break;
        case "gender":
        multipleTraits = searchByGender(multipleTraits);
        break;
        case "occupation":
        multipleTraits = searchByOccupation(multipleTraits);
        break;
        case "height":
        multipleTraits = searchByHeight(multipleTraits);
        break;  
        case "weight":
        multipleTraits = searchByWeight(multipleTraits);
        break;
      default:
    } 
  }
  while(promptFor("Keep searching yes or no", autoValid) == "yes");
  return multipleTraits
}
console.log(searchMultipleTraits(people));


function searchSingleTrait(people){
  let trait = prompt("Which trait would you like to look for?");
  
  if (trait === "eyecolor"){
    console.log(searchByEyeColor(people));
  }
  else if (trait === "gender"){
    console.log(searchByGender(people));
  }
  else if (trait === "occupation"){
    console.log(searchByOccupation(people));
  }
  else if (trait == "height"){
    console.log(searchByHeight(people));
  }
  else if (trait == "weight"){
    console.log(searchByWeight(people));
  }
}
// searchSingleTrait(people);


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(){
  alert(people.map(function(people){
    return people.firstName + " " + people.lastName;
  }).join("\n"));
}

function displayPerson(people){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + people.firstName + "\n";
  personInfo += "Last Name: " + people.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

displayPeople("billy bob")
//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregiongit add .