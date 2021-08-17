// To create a function that returns a string with cities names, split by comma(‘,’). 
// These cities should be written in the next order: from cities with the smallest population 
// to the biggest. Also, only cities with a population of more than 200000 should be shown
const cities = [
  {
    city: 'New-York',
    population: 1000000,
  },
  {
    city: 'Kyiv',
    population: 230000,
  },
  {
    city: 'Warsaw',
    population: 195000,
  },
  {
    city: 'Paris',
    population: 403434,
  },
  {
    city: 'Budapest',
    population: 326154,
  }
]
  
function getNamesOfCitiesMoreThanTwoHundredTousandPeopleOrderedByPopulationAsc(cities) {
    return cities.filter(city => city.population > 200000)
        .sort((firstComperableCity, secondComperableCity) => 
            firstComperableCity.population - secondComperableCity.population)
        .map(city => city.city)
        .join(', ');
}

console.log(getNamesOfCitiesMoreThanTwoHundredTousandPeopleOrderedByPopulationAsc(cities));
//Expected result: // Kyiv, Budapest, Paris, New-York