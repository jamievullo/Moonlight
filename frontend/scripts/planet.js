const planetUrl = `${targetUrl}/planets`;
const clearForm = document.getElementById('user-form');
const clearMainImage = document.getElementById('main-pic');
const clearWelcomeUserBox = document.getElementById('welcome-user');
const clearPlanetPics = document.getElementById('planet-pics');

function renderPlanets() {
    //clear form and main image
    clearForm.innerHTML = "";
    clearMainImage.remove();
    const selectPicElement = document.getElementById('planet-pics');
    const loadPlanetPics = `
    <div class="accordian">
	<ul>
		<li>
			<div class="image_title">
				<a href="#">Mercury</a>
			</div>
			<a href="#">
				<img class="planet-picture" id="1" src="images/Planets/Mercury-Colored1.jpg" alt="Mercury">
			</a>
		</li>
		<li>
			<div class="image_title">
				<a href="#">Venus</a>
			</div>
			<a href="#">
				<img class="planet-picture" id="2" src="images/Planets/Venus-Main3.jpg" alt="Venus">
			</a>
		</li>
        <li>
			<div class="image_title">
				<a href="#">Earth</a>
			</div>
			<a href="#">
				<img class="planet-picture" id="3" src="images/Planets/Earth-Main2.jpg" alt="Earth">
			</a>
		</li>
		<li>
			<div class="image_title">
				<a href="#">Mars</a>
			</div>
			<a href="#">
				<img class="planet-picture" id="4" src="images/Planets/Mars-Main6.jpg" alt="Mars">
			</a>
		</li>
		<li>
			<div class="image_title">
				<a href="#">Jupiter</a>
			</div>
			<a href="#">
				<img class="planet-picture" id="5" src="images/Planets/Jupiter-Main.jpg" alt="Jupiter">
			</a>
		</li>
        <li>
			<div class="image_title">
				<a href="#">Saturn</a>
			</div>
			<a href="#">
				<img class="planet-picture" id="6" src="images/Planets/Saturn-Main-Main2.jpeg" alt="Saturn"> 
			</a>
		</li>
		<li>
			<div class="image_title">
				<a href="#">Uranus</a>
			</div>
			<a href="#">
				<img class="planet-picture" id="7" src="images/Planets/Uranus-Main2.jpg" alt="Uranus">
			</a>
		</li>
        <li>
			<div class="image_title">
				<a href="#">Neptune</a>
			</div>
			<a href="#">
				<img class="planet-picture" id="8" src="images/Planets/Neptune-Main.jpg" alt="Neptune">
			</a>
		</li>
        <li>
			<div class="image_title">
				<a href="#">Pluto</a>
			</div>
			<a href="#">
				<img class="planet-picture" id="9" src="images/Planets/Pluto-Main.jpg" alt="Pluto">
			</a>
		</li>
	</ul>
</div>`;
    //render planets
    selectPicElement.innerHTML = loadPlanetPics;
}

function welcomeUser(name) {
    const welcomeUserBox = document.getElementById('welcome-user');
    //create variable that displays welcome message based on username.
    const welcome = `<div><h2 style="color: white"><center>Welcome ${name}, please select a Planet 
    by clicking on a tile.</center></h2></div>`;

    welcomeUserBox.innerHTML = welcome;
    selectPlanet();
}

let chosenPlanetPicture;

function selectPlanet() {
    // set variable to pic id for planets
    const selectFromPlanets = document.querySelectorAll('.accordian');
    // iterate over pic collection and listen for which pic is being
    // selected then pass in resulting =>(e.target.outerHTML)=> into renderSelectedPlanet().
    selectFromPlanets.forEach(planet => {
        planet.addEventListener('click', e => {            
            //renderSelectedPlanet(e.target.outerHTML);
            chosenPlanetPicture = e.target.outerHTML
            //console.log(e)
            //console.log(e.target.outerHTML);
            //console.log(e.toElement.id)
            fetchPlanetData(e.toElement.id);//gets pic id from selected planet to compare to DB id to render planets data
        })
    })    
}

function fetchPlanetData(id) { //need to pass in db "id" of selected planet
    fetch(planetUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        fetchSelectedPlanetData(data, id);
    })
}    

function renderSelectedPlanet(chosenPlanet) { //passes in e.target.previousElementSibling.outerHTML
    clearPlanetPics.remove();
    clearWelcomeUserBox.remove();
    const planetElement = document.getElementById('planet');
    const selection = `
    <div class="second-render"></div>
        <div class="wrapper">
            <ul class="stage">
                <li class="scene">
                    <div class="movie">
                        <div class="planet-animation">${chosenPlanetPicture}</div>
                        <div class="info">
                        <header>
                            <h1>${chosenPlanet.name}</h1>
                            <div class="size">Size: ${chosenPlanet.size}</div>
                            <div class="distance">Distance from Sun: ${chosenPlanet.distance}</div>
                            <div class="orbital-period">Orbital Period: ${chosenPlanet.orbital_period}</div>
                            <div class="day-length">Day Length: ${chosenPlanet.day_length}</div>
                            <div class="gravity">Gravity: ${chosenPlanet.gravity}</div>
                            <a href="${chosenPlanet.link}">${chosenPlanet.link}</a>
                        </header>
                        <p>
                            <div class="description" style="color: white">${chosenPlanet.description}</div>
                            </p>
                        <button type="submit" id="moon-button">Explore Moons of ${chosenPlanet.name}</button>
                    </div>
                </div>
            </li>
        </ul> 
    </div>`;
    //<button onclick="window.location.reload()">Reload</button>
    planetElement.innerHTML = selection;
    listenForMoonSubmit();
}

function fetchSelectedPlanetData(planetData, id) {
    fetch(`${planetUrl}/${id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        chosenPlanet = new Planet(data.name, data.size, data.distance, data.orbital_period, data.day_length, data.gravity, data.description, data.link)
        console.log(chosenPlanet)
        renderSelectedPlanet(chosenPlanet);
    })
}

let chosenPlanet; 

class Planet {
    constructor(name, size, distance, orbital_period, day_length, gravity, description, link) {
    this.name = name
    this.size = size
    this.distance = distance
    this.orbital_period = orbital_period
    this.day_length = day_length
    this.gravity = gravity
    this.description = description
    this.link = link 
    }
}