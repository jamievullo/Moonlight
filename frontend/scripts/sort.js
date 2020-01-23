//sorts array of planets created after fetch to alphabetical order by name
const createSortArray = () => {
    return sortArray.sort((a, b) => (a.name > b.name) ? 1 : -1)
}

//listener on sort button
const sortButtonListener = () => {
    const sortButtonElement = document.getElementById('sort-planets')
    sortButtonElement.addEventListener('click', e => {
        // console.log(e)
        wipeAccordian();
        renderTheSortedArray();
        toggleButtonText();
    })
}

//iterates over alphabetically sorted array and renders planets in li's in accordian
const renderTheSortedArray = () => { 
    // const createSortArrayVariable = createSortArray
    createSortArray().forEach(sortedPlanet => {
        // console.log(sortedPlanet)
        Planet.renderPlanets(sortedPlanet)
    });
}

//wipes out accordian li's to re-render sorted out planets
const wipeAccordian = () => {
    const wiper = document.querySelectorAll('li')
    wiper.forEach(planet => {
        planet.remove()
    })
}

//changes buttons text to set up for conditional for resorting to the original order
const toggleButtonText = () => {
    const sortButtonElement = document.getElementById('sort-planets');
    if(sortButtonElement.innerText === "Sort Planets") {
        sortButtonElement.innerText = "Re-Sort Planets"
    } else {
        sortButtonElement.innerText = "Sort Planets"
        wipeAccordian();
        // reWriteSort();
        renderOriginalOrder();
    }
}

//sorts array back to original order by the id
const reWriteSort = () => {
    return sortArray.sort((a, b) => (a.id > b.id) ? 1 : -1 )
}

//renders original order of planets astronomically
const renderOriginalOrder = () => {
    const oldOrder = reWriteSort()
    oldOrder.forEach(planet => {

        Planet.renderPlanets(planet);
    })
}