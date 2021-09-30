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

console.log(searchByEyeColor());