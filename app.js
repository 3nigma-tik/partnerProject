"use strict"



//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 
app(people);
// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchMultipleTraits(people);
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let foundNames = ''

  for (const data of person) {
    let firstName = data.firstName ? data.firstName : ''
    let lastName = data.lastName ? data.lastName : ''
    foundNames += `${firstName} ${lastName} \n`
  }

  let displayOption
  if (person.length > 1) {
    // Too many people
    displayOption = promptFor("Found " + foundNames, autoValid);
    return false
  } else {
    displayOption = promptFor("Found " + foundNames + " Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  }
  

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      displayFamily(person, people);
      break;
    case "descendants":
      displayDescendants(person, people)
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
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);
  firstName = firstName? firstName.toLowerCase().trim() : "";
  lastName = lastName? lastName.toLowerCase().trim() : "";
  let foundPerson = people.filter(function (potentialMatch) {
    let potentialFirstName = potentialMatch.firstName? potentialMatch.firstName.toLowerCase().trim():"";
    let potentialLastName = potentialMatch.lastName? potentialMatch.lastName.toLowerCase().trim():"";
    if (potentialFirstName === firstName && potentialLastName === lastName) {
      return true;
    }
    else {
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.

  return foundPerson;
}




function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's eye color?", autoValid);

  let personEyeColor = people.filter(function (coloredEyes) {
    if (coloredEyes.eyeColor === eyeColor) {
      return true;
    }
    else {
      return false;
    }
  })
  return personEyeColor;
}


function searchByGender(people) {
  let gender = promptFor("Is the person male or female?", autoValid);

  let personGender = people.filter(function (whatGender) {
    if (whatGender.gender === gender) {
      return true;
    }
    else {
      return false;
    }
  })
  return personGender;
}


function searchByOccupation(people) {
  let occupation = promptFor("What is the person's occupation?", autoValid);

  let personOccupation = people.filter(function (whatOccupation) {
    if (whatOccupation.occupation === occupation) {
      return true;
    }
    else {
      return false;
    }
  })
  return personOccupation;
}


function searchByHeight(people) {
  let height = promptFor("What is the height of the person in inches?", autoValid);

  let personHeight = people.filter(function (whatHeight) {
    if (whatHeight.height == height) {
      return true;
    }
    else {
      return false;
    }
  })
  return personHeight;
}


function searchByWeight(people) {
  let weight = promptFor("What is the weight of the person in pounds?", autoValid);

  let personWeight = people.filter(function (whatWeight) {
    if (whatWeight.weight == weight) {
      return true;
    }
    else {
      return false;
    }
  })
  return personWeight;
}

// function kidsNames(people)
  


// if(foundYou[0].id === people.filter(parents[0]) || people.filter(parents[1])
//TODO: add other trait filter functions here.

// function for searching by traits.
function searchMultipleTraits(people) {
  let multipleTraits = people;
  do {
    let inputMultipleTraits = promptFor('Which trait would you like to search with?\neye color\ngender\noccupation\nheight\nweight\nname', autoValid,);

    switch (inputMultipleTraits) {
      case "eye color":
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
  while (promptFor("Would you like to use a another trait for your search? yes or no", yesNo) == "yes");
  return multipleTraits
}
// console.log(searchMultipleTraits(people));


function searchSingleTrait(people) {
  let trait = prompt("Which trait would you like to look for?");

  if (trait === "eye color") {
    console.log(searchByEyeColor(people));
  }
  else if (trait === "gender") {
    console.log(searchByGender(people));
  }
  else if (trait === "occupation") {
    console.log(searchByOccupation(people));
  }
  else if (trait == "height") {
    console.log(searchByHeight(people));
  }
  else if (trait == "weight") {
    console.log(searchByWeight(people));
  }
}
// searchSingleTrait(people);

function displayDescendants(person, people) {
  let ids = person.map(data => data.id)
  let descendantRecords = []
  let descendants = []

  for (const data of people) {
    for (const parent of data.parents) {
      if (ids.includes(parent) && !descendantRecords.includes(data)) {
        descendantRecords.push(data)
      }
    }
  }

  let childrenIDS = descendantRecords.map(data => data.id)
  for (const data of people) {
    for (const parent of data.parents) {
      if (childrenIDS.includes(parent) && !descendantRecords.includes(data)) {
        descendantRecords.push(data)
      }
    }
  }
  descendantRecords.map(descendant => descendants.push(`${descendant.firstName} ${descendant.lastName}`))

  alert(`Descendants: ${descendants.join(', ')}`)
}

function displayFamily(person, people) {
  let ids = person.map(data => data.id)
  let siblingRecords = []
  let siblings = []
  let parentRecords = []
  let parents = []
  let spouses = []

  // Get spouses
  people.map(function (data) {
    if (ids.includes(data.currentSpouse) && !spouses.includes(data.currentSpouse)) {
      spouses.push(`${data.firstName} ${data.lastName}`)
    }
  })

  // Get parents
  for (const personData of person) {
      for (const data of people) {
        if (personData.parents.includes(data.id) && !parentRecords.includes(data)) {
          parentRecords.push(data)
        }
    }
  }
  parentRecords.map(parent => parents.push(`${parent.firstName} ${parent.lastName}`))

  // Get siblings
  person.map(personData => {
    personData.parents.map(parent => {
      people.map(data => {
        if (data.parents.includes(parent) && !siblingRecords.includes(data) && personData.id !== data.id) {
          siblingRecords.push(data)
        }
      })
    })
  })
  siblingRecords.map(sibling => siblings.push(`${sibling.firstName} ${sibling.lastName}`))

  alert(`Spouses: ${spouses.join(', ')} \nParents ${parents.join(', ')} \nSiblings ${siblings.join(', ')}`)
}
//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return foundPerson.firstName + " " + foundPerson.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = ''
  for (let data of person) {
    personInfo += "\n First Name: " + data.firstName + "\n";
    personInfo += "Last Name: " + data.lastName + "\n";
    personInfo += "Gender: " + data.gender + "\n"
    personInfo += "Eye Color: " + data.eyeColor + "\n"
    personInfo += "Occupation: " + data.occupation + "\n"
    personInfo += "Height: " + data.height + "\n"
    personInfo += "Weight: " + data.weight + "\n"
    personInfo += "DOB: " + data.dob + "\n"
  }
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}
//#endregion


//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  do {
    var response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  }
  else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {

}

//#endregiongit add .



