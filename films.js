const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get("id");

function renderList(renderList, listName) {
  const root = document.getElementById("root");
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

fetch(`https://swapi2.azurewebsites.net/api/films/${filmId}`)
  .then((response) => response.json())
  .then((response) => {
    const film = response;
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
