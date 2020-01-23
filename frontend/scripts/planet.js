class Planet {
    constructor(id, name, size, distance, orbital_period, day_length, gravity, description, link, has_moons, picture) {
        this.id = id
        this.name = name
        this.size = size
        this.distance = distance
        this.orbital_period = orbital_period
        this.day_length = day_length
        this.gravity = gravity
        this.description = description
        this.link = link
        this.has_moons = has_moons
        this.picture = picture
    }

    static renderPlanets(planet) {
       
        const showAccordian = document.querySelector('.accordian')
        showAccordian.classList.remove('d-none')
        const selectPicElement = document.querySelector('ul');
        const loadPlanetPics = `
        <li>
            <div class="image_title">
                <a href="#">${planet.name}</a>
            </div>
                <a href="#">
                    <img class="planet-picture" id=${planet.id} src=${planet.picture} alt=${planet.name}>
                </a>
        </li>`;
        selectPicElement.innerHTML += loadPlanetPics;
        
    }

    static renderSelectedPlanet(chosenPlanet) { //passes in e.target.previousElementSibling.outerHTML
        //debugger
        const clearWelcomeUserBox = document.getElementById('welcome-user');
        const clearUserFormDiv = document.getElementById('user-form');
        const clearPlanetPics = document.getElementById('planet-pics');
        clearPlanetPics.remove();
        clearWelcomeUserBox.remove();
        clearUserFormDiv.remove();
        const planetElement = document.getElementById('planet');
        const selection = `
        <div class="second-render"></div>
            <div class="wrapper">
                <ul class="stage">
                    <li class="screen">
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
                                <a href="${chosenPlanet.link}"/target="_blank">${chosenPlanet.link}</a>
                            </header>
                            <p>
                                <div class="description" style="color: white">${chosenPlanet.description}</div>
                                </p>
                                    ${renderMoonButton(chosenPlanet)}
                                    <button type="submit" id="back-button">Go back to Planets</button>
                            </div>
                    </div>
                </li>
            </ul> 
        </div>`;
        //<button onclick="window.location.reload()">Reload</button>
        planetElement.innerHTML = selection;
        listenForMoonSubmit();
        quizListener();
        listenForGoBackToPlanets();
    }

    static rerenderPlanets() {
        //recreates planet accordian and appends to body of HTML after clearing of all elements in functions
        const snippet = `
        <div id="navbar">
            ${navbar()}
        </div>
        <div id="user-form"></div>
        <div id="welcome-user"><div class="welcome"><h2 style="color: white"><center>${user.name}, please select a Planet 
        by clicking on a tile.</center></h2></div><center><button id="sort-planets">Sort Planets</button></center></div>
        <div id="planet-pics">
            <div class="accordian">
                <ul>
                    ${fetchAllPlanets()}
                </ul>
            </div>
        </div>
        <div id="planet"></div>
        <div id="planet-attributes"></div>
        <div id="moon-instructions"></div>
        <div id="moon-pics">
            <div class="moon-row"></div>
        </div>
        <div id="moon"></div>
        <div id="moon-attributes"></div>
        `;

        document.querySelector('body').innerHTML = snippet

        selectPlanet();
        listeners();
        //listener for sort button
        sortButtonListener();
    }
}

//declares variable for sort array
let sortArray;

const fetchAllPlanets = () => {  
    //clears out sort array for each use because we will be rendering 36 planets after 4 go's
    sortArray = []
    fetch(`${targetUrl}/planets`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        data.forEach(planet => {
            //console.log(planet)
            //pushes each planet into an array to be able to sort them alphabetically
            sortArray.push(planet)
            // console.log(sortArray)
        Planet.renderPlanets(planet)
        })
    })
    .catch(err => alert(err))
}

const welcomeUser = (name) => {
    const welcomeUserBox = document.getElementById('welcome-user');
    //create variable that displays welcome message based on username.
    const welcome = `<div class="welcome"><h2 style="color: white"><center>Welcome ${name}, please select a Planet 
    by clicking on a tile.</center></h2></div>
    <center><button id="sort-planets">Sort Planets</button></center>
    `;

    
    const x = document.getElementById('navbar')
    x.innerHTML = navbar();
    listeners();
    welcomeUserBox.innerHTML = welcome;
    //listener for 1st sort button
    sortButtonListener();
    selectPlanet();
}

let chosenPlanetPicture;

const selectPlanet = () => {
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
            fetchSelectedPlanetData(e.toElement.id); //gets pic id from selected planet to compare to DB id to render planets data
        })
    })
}

const renderMoonButton = (chosenPlanet) => {
    if (chosenPlanet.has_moons === "true" && chosenPlanet.id !== 3) {
        return `<button type="submit" id="moon-button">Explore the Moons of ${chosenPlanet.name}</button>`
    } else if (chosenPlanet.id === 3) {
        return `<button type="submit" id="moon-button">Explore ${chosenPlanet.name}'s Moon</button>`
    } else {
        //without return of ``, rendered undefined instead of no button
        return ``
    }
}

let chosenPlanet;

const fetchSelectedPlanetData = (id) => {
    fetch(`${targetUrl}/planets/${id}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            chosenPlanet = new Planet(data.id, data.name, data.size, data.distance, data.orbital_period, data.day_length, data.gravity, data.description, data.link, data.has_moons, data.picture)
            //console.log(chosenPlanet)
            Planet.renderSelectedPlanet(chosenPlanet);
        })
        .catch(err => alert(err))
}

const clearFormAndMainImage = () => {
    const clearForm = document.getElementById('user-form');
    const clearMainImage = document.getElementById('main-pic');
    //clear form and main image
    clearForm.innerHTML = "";
    clearMainImage.remove();

    fetchAllPlanets();
}