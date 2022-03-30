// Quinn Douglas Scrivner
//The global variables 
var httpRequest;
//location of the buttons 
var rocketPage = document.getElementById("astroInfo");
var astroPage = document.getElementById("astroNauts");
rocketPage.addEventListener("click", () => {
  httpRequest = new XMLHttpRequest();
  //setup our api call with the method and the url
  httpRequest.open(
    "get",
    "https://lldev.thespacedevs.com/2.2.0/launch/?limit=4&is_crewed=true&include_suborbital=true&related=false"
  );
  //send the request to the server
  httpRequest.send();
  //TO THE FUNCTION
  httpRequest.onreadystatechange = launchData;
});
//This function will lead to another function IF the other button is clicked, then it will be locked into a giant loop, only working with user input
function launchData() {
  //This line is super important as if I didn't put it, it would've gave me 8 pics instead of 4
  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    //Store our JSON string in a variable 
    var launches = httpRequest.responseText;
    //JS Parse
    launchesObj = JSON.parse(launches);
    //This is for me to find my drill locations
    console.log(launchesObj);
    //The MAP function is quite literally a backwards .push, but it makes an array without having to pre make it
    spaceShips = launchesObj.results.map((obj) => {
      return obj.name;
    });
    //This one is for the images of the rocket ships
    shipImages = launchesObj.results.map((obj) => {
      return obj.image;
    });
    //This makes for the descriptions
    spaceDescriptions = launchesObj.results.map((obj) => {
      return obj.mission.description;
    });
    //soft code location for where all of this goes, I had to create the element because I make JS delete the div entriely later on
    var firstDiv = document.createElement("div");
    firstDiv.id = "spaceContainer";
    //Everytime I click the SpaceShips button it is created 
    document.body.appendChild(firstDiv);
    //softcode location 
    var spaceShipLocation = document.getElementById("spaceContainer");
    //hueMUNGIS for loop that will make my little "cards" that have each rockect, its name, and a descriptions of the mission
    for (i = 0; i <= 3; i++) {
      //create elements that define formatting in some areas, and some for img tags
      var subDiv = document.createElement("div");
      //add an id for formatting
      subDiv.id = "space";
      var createDescripton = document.createElement("h3");
      var createSpace = document.createElement("img");
      var createShipName = document.createElement("h3");
      //Changing the innerhtml to display the rockets names and missions
      createDescripton.innerHTML = spaceDescriptions[i];
      //adding the images to the created tags
      createSpace.src = shipImages[i];
      createShipName.innerHTML = spaceShips[i];
      //appending it all when the webpage loads
      subDiv.appendChild(createSpace);
      subDiv.appendChild(createShipName);
      subDiv.appendChild(createDescripton);
      //append divs to one big boy div that gets created everytime the SpaceShips button is clicked
      spaceShipLocation.appendChild(subDiv);
    }
    //the kicker, the continuer, THE ASTROFUNCTION 
          astroPage.addEventListener("click", () => {
            //remove the rockets 
            spaceShipLocation.remove();
            //grab some astronauts
  httpRequest = new XMLHttpRequest();
  //setup our api call with the method and the url
  httpRequest.open(
    "get",
    "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=4"
  );
  //send the request to the server
  httpRequest.send();
  //TO THE FUNCTION
  httpRequest.onreadystatechange = astroData;
          });
  }
}
//Basically the same as the original
function astroData()
{
  //Again, create a div that will later on create multiple subdivs with the information/pictures of astronauts
    var secondDiv = document.createElement("div");
    //formatting 
    secondDiv.id = "astroContainer";
    document.body.appendChild(secondDiv);

  //this if statements prevents doubling of every image 
  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
    //store the JSON
        var nauts = httpRequest.responseText;
    //Parse 'er
        astronautsObj = JSON.parse(nauts);
//Console.log(astronautsObj) to find drilling locations 
        console.log(astronautsObj);
        //The faces of the astronauts 
        astronautImage = astronautsObj.results.map((obj) => {
          return obj.profile_image;
        })
        //The bio and names of the astronauts
        astronautBio = astronautsObj.results.map((obj) => {
          return obj.bio;
        })

        ///fail safe V
        // console.log(astronautImage);
        // console.log(astronautBio);

        //softcode location 
    var astronautLocation = document.getElementById("astroContainer");

    //the exact same as line 49
            for (i = 0; i <= 3; i++) {
      var subDiv = document.createElement("div");
      subDiv.id = "astronaut";
      var createDescripton = document.createElement("h3");
      var createAstronaut = document.createElement("img");


      createDescripton.innerHTML = astronautBio[i];
      createAstronaut.src = astronautImage[i];
      subDiv.appendChild(createAstronaut);
      subDiv.appendChild(createDescripton);
  
      astronautLocation.appendChild(subDiv);
            }
  }

  //This keeps the loop, well looping
  rocketPage.addEventListener("click", () => {
  astronautLocation.remove();
  });
}
