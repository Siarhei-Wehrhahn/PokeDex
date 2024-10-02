// Funktion zum Rendern eines Pokémon-Carts (mit Attackenbeschreibung)
function getPokeCart(pokemonDetails, effectDescription) {
    const backgroundColor = checkColor(pokemonDetails);
    const background = checkBackground(pokemonDetails);
    const checkType = checkTypeIcon(pokemonDetails);
    
    return /*html*/`
    <div class="cart" id="pokemon-${pokemonDetails.id}" onclick="toggleOverlay(${pokemonDetails.id}, ${pokemonDetails.name})" style="background-color: ${backgroundColor}">
        <div class="cartHeader">
            <h2>#${pokemonDetails.id} ${pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</h2>
            <div class="kp">
                <p>KP ${pokemonDetails.stats[0].base_stat}</p>
                <img src="${checkType}" alt="logo">
            </div>
        </div>
        <div class="pokemon" style="background-image: url(${background})">
            <img src="${pokemonDetails.sprites.other.home.front_default}" alt="${pokemonDetails.name}">
        </div>
        <div class="spezialAtack">
            <div class="attackHeader">
            <img src="${pokemonDetails.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="fähigkeitsLogo">
                <p>${pokemonDetails.moves[0].move.name}</p>
            </div>
            <div class="attackDescription">
                <p>${effectDescription}</p>
            </div>
        </div>
    </div>
    `;
}

const getPokeInfos = (pokemon) => {
    const background = checkBackground(pokemon);
    return /*html*/`
        <div class="pokemonHeader">
            <div class="nameTag">${pokeDetails.id} ${pokemon.name}</div>
            <div class="pokemonPhoto" style="background-image: url(${background})"></div>
        </div>

        <div class="pokemonInfoExtendet">
            <div class="exit_div"><p class="exit" onclick="">X</p></div>
        </div>
    `
}