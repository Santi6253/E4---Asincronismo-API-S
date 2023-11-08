const urlBase = "https://pokeapi.co/api/v2/pokemon";
const form = document.getElementById("form");
const idInput = document.getElementById("input");
const cardContainer = document.querySelector(".card-container");

const getPokemon = async (id) => {
  const response = await fetch(`${urlBase}/${id}`);
  const data = await response.json();
  console.log("data ==> ", data);
  return data;
};

const isEmptyInput = () => {
  return idInput.value.trim() === "";
};

const renderPokemonCard = (pokemon) => {
  cardContainer.innerHTML = createPokemonTemplate(pokemon);
};

const createPokemonTemplate = (pokemon) => {
  const { name, sprites, types, height, weight } = pokemon;

  return `
    <div class="pokemon-card animate">
    <div class="pokemon-img-container">
      <img src="${
        sprites.other.home.front_default
      }" alt="pokemon image" width="200px"/>
    </div>
      <div class="pokemon-info-container">
        <h2 class="pokemon-title"> ${name} </h2>
        <p class="pokemon-tipo"> ${types[0].type.name} </p>
            <div class="pokemon-datos">
                <p class="pokemon-altura"> Altura: ${height / 10} m</p>
                <p class="pokemon-peso"> Peso: ${weight / 10} Kg</p>
            </div>
      </div>
    </div>
  `;
};

const buscarID = async (e) => {
  e.preventDefault();
  if (isEmptyInput()) {
    alert("ingresá una iD");
    return;
  }
  const ID = await getPokemon(idInput.value);

  renderPokemonCard(ID);
  form.reset();
};

const init = () => {
  form.addEventListener("submit", buscarID);
};

init();
