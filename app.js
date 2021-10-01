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
      searchResults = searchByName
      break;
    case 'no':
      searchResults = searchMultipleTraits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}


// Menu function to call once you find who you are looking for
function mainMenu(){
  let finalPerson;
  
  if(!foundYou){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let inputFinalPerson = promptFor("Found " + foundYou[0].firstName + " " + foundYou[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(inputFinalPerson){
    case "info":
    finalPerson = foundYou[0].firstName + " " + foundYou[0].lastName + " " + foundYou[0].gender + " " + foundYou[0].dob;
    console.log(finalPerson);
    break;
    case "family":
    finalPerson = foundYou[0].parents + "(Parents) " + " " + foundYou[0].currentSpouse + "(Spouse)" + 
    console.log(finalPerson);
    break;
    case "descendants":
    finalPerson = people.filter + people.filter === foundYou[0].id;
    console.log(finalPerson);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(); // ask again`
  }
  return inputFinalPerson;
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
  
  return foundPerson;
}






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

// function kidsNames(people)
  


// if(foundYou[0].id === people.filter(parents[0]) || people.filter(parents[1])
//TODO: add other trait filter functions here.

// function for searching by traits.
function searchMultipleTraits(people){
  let multipleTraits = people;
  do{

    let inputMultipleTraits = promptFor('What trait would you like to search?\neye color\ngender\noccupation\nheight\nweight\nname', autoValid);
    

    switch(inputMultipleTraits){ 
      case "eye color":0
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
        case "name":
        multipleTraits = searchByName(multipleTraits);
        break; 
      default:
    } 
  }
  while(promptFor("Would you like to use a another trait for your search? yes or no", autoValid) == "yes");
  return multipleTraits
}
let foundYou = searchMultipleTraits(people);



function searchSingleTrait(people){
  let trait = prompt("Which trait would you like to look for?");
  
  if (trait === "eye color"){
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
  alert(foundYou.map(function(foundYou){
    return foundYou.firstName + " " + foundYou.lastName;
  }).join("\n"));
}

displayPeople(foundYou);


function displayPerson(){
  // print all of the information about a person:
  let personInfo = "First Name: " + foundYou[0].firstName + "\n";
  personInfo += "Last Name: " + foundYou[0].lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}
//#endregion

displayPerson(foundYou);
mainMenu(foundYou);

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