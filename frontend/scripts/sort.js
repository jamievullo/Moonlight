const createSortArray = () => {

    return sortArray.sort((a, b) => (a.name > b.name) ? 1 : -1 )
    
    // renderPlanets(planet)
}

const sortButtonListener = () => {
    const sortButtonElement = document.getElementById('sort-planets')
    sortButtonElement.addEventListener('click', e => {
        // console.log(e)
        wipeAccordian();
        sortOutTheSortedArray();
    })
}

const sortOutTheSortedArray = () => {
    
    createSortArray().forEach(sortedPlanet => {

        // console.log(sortedPlanet)
        Planet.renderPlanets(sortedPlanet)
    });
}

const wipeAccordian = () => {
    const wiper = document.querySelectorAll('li')
    wiper.forEach(planet => {
        planet.remove()
    })
}