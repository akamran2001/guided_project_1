let planetName;
let planetPopulation;
let planetClimate;
let planetTerrain;
let filmsList;
let charactersList;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
  planetName = document.querySelector('h1#name');
  planetPopulation = document.querySelector('span#population');
  planetClimate = document.querySelector('span#climate');
  planetTerrain = document.querySelector('span#terrain');

  charactersList = document.querySelector('#characters>ul');
  filmsList = document.querySelector('#films>ul');

  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');
  getPlanet(id);
});

async function getPlanet(id) {
  try {
    let planet = await fetchPlanet(id);
    planet.characters = await fetchCharacters(planet);
    planet.films = await fetchFilms(planet);
    renderPlanet(planet);
  }
  catch (err) {
    console.error(`Error getting planet ${id} data.`, err.message);
  }
};

async function fetchPlanet(id) {
  let url = `${baseUrl}/planets/${id}`;
  const planet = await fetch(url)
  .then(res => res.json())
  return planet;
};

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
};

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
};

const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;
  planetName.textContent = planet?.name;
  planetPopulation.textContent = planet?.population;
  planetClimate.textContent = planet?.climate;
  planetTerrain.textContent = planet?.terrain;

  const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`);
  charactersList.innerHTML = charactersLis.join("");

  const filmsLis = planet?.films?.map(film => `<li><a href="/films.html?id=${film.id}">${film.title}</li>`);
  filmsList.innerHTML = filmsLis.join("");
};
