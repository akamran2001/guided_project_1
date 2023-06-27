const root = document.getElementById("root");
const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get("id");

function renderList(renderList, listName) {
  root.innerHTML += `<h1>${listName.toUpperCase()}</h1>`;
  let ul = document.createElement("ul");
  renderList.forEach((element) => {
    let li = document.createElement("li");
    let details = `/${
      listName == "characters" ? "character" : "planets"
    }.html?id=${element.id}`;
    li.innerHTML = `<a href="${details}">${element.name}</a>`;
    ul.appendChild(li);
  });
  root.appendChild(ul);
}

if (filmId) {
  fetch(`https://swapi2.azurewebsites.net/api/films/${filmId}`)
    .then((response) => response.json())
    .then((response) => {
      const film = response;

      document.getElementById(
        "root"
      ).innerHTML += `<h1> Episode ${film.episode_id} - ${film.title} </h1>`;

      fetch(`https://swapi2.azurewebsites.net/api/films/${filmId}/characters`)
        .then((response) => response.json())
        .then((response) => {
          const characters = response;
          fetch(`https://swapi2.azurewebsites.net/api/films/${filmId}/planets`)
            .then((response) => response.json())
            .then((response) => {
              const planets = response;
              console.log(film);
              console.log(characters);
              console.log(planets);

              renderList(characters, "characters");
              renderList(planets, "planets");
            });
        });
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
} else {
  fetch(`https://swapi2.azurewebsites.net/api/films`)
    .then((response) => response.json())
    .then((response) => {
      const films = response;
      console.log(films);

      let ul = document.createElement("ul");
      films.forEach((element) => {
        let li = document.createElement("li");

        li.innerHTML = `<a href="?id=${element.id}">${element.title}</a>`;

        ul.appendChild(li);
      });
      root.appendChild(ul);
    });
}
