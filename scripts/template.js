// Funktion zum Rendern eines Pokémon-Carts
function getPokeCart(pokemonDetails) {
    return /*html*/`
    <div class="cart" id="pokemon-${pokemonDetails.id}">
        <div class="cartHeader">
            <h2>${pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</h2>
            <div class="kp">
                <p>KP ${pokemonDetails.stats[0].base_stat}</p>
                <img src="${pokemonDetails.sprites.front_default}" alt="Typ Logo">
            </div>
        </div>
        <div class="pokemon">
            <img src="${pokemonDetails.sprites.other.home.front_default}" alt="${pokemonDetails.name}">
        </div>
        <div class="spezialAtack">
            <div class="attackHeader">
            <img src="${pokemonDetails.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="fähigkeitsLogo">
                <p>${pokemonDetails.moves[0].move.name}</p>
            </div>
            <div class="attackDescription">
                <p>Eine von ${pokemonDetails.moves.length} möglichen Attacken.</p> 
            </div>
        </div>
        <div class="attack">
            <div>
                <img src="" alt="fähigkeitsLogos">
                <img src="" alt="fähigkeitsLogos">
                <img src="" alt="fähigkeitsLogos">
            </div>
            <p class="attackName">${pokemonDetails.moves[1]?.move.name || 'Unbekannt'}</p>
            <p class="attackPoints">30</p>
        </div>
    </div>
    `;
}