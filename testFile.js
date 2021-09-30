//when user criteria is entered, return a list of people that have that single trait
//user is prompted to enter a trait (provide list of traits?); user enters trait;
//console logs all people who have that trait; people who have that trait coded in objects;
//function should cycle through array of objects(people), sort, and display new array of people
//containing that trait.



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

<<<<<<< HEAD
console.log(searchByEyeColor());
=======
  
  
  function mainMenu(person, people){
  
    if(!person){
      alert("Could not find that individual.");
      return app(people); // restart
    }
  
    let foundPerson = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  
    switch(displayOption){
      case "info":
      console.log(foundPerson.gender + foundPerson.occupation);
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

  console.log(mainMenu());
>>>>>>> b41602d09a8640dbad73424d4d589ab8b1ad0d81
