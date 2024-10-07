// Funktion zum Rendern eines Pokémon-Carts (mit Attackenbeschreibung)
function getPokeCart(pokemonDetails, effectDescription) {
    const backgroundColor = checkColor(pokemonDetails);
    const background = checkBackground(pokemonDetails);
    const checkType = checkTypeIcon(pokemonDetails);

    return /*html*/`
    <div class="cart" id="pokemon-${pokemonDetails.id}" onclick="toggleOverlay(${pokemonDetails.id})" style="background-color: ${backgroundColor}">
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

const getPokeInfos = (pokemon, pokeName) => {
    const background = checkBackground(pokemon);
    const color = checkColor(pokemon);
    const typeIcons = checkTypeIcons(pokemon);
    const typeIconsHtml = typeIcons.map(icon => `<img src="${icon}" alt="type icon" style="width: 32px; height: 32px;">`).join(' ');
    const heldItems = pokemon.held_items.length > 0 ? pokemon.held_items.map(item => item.item.name).join(', ') : 'None';
    const moves = pokemon.moves.slice(0, 5).map(move => move.move.name).join(', ');
    const eggGroups = pokemon.species.egg_groups ? pokemon.species.egg_groups.map(group => group.name).join(', ') : 'Unknown';

    return /*html*/`
    <div class="row" style="background-color: ${color}">
        <div class="pokemonHeader" style="background-image: url(${background})">
            <div class="nameTag" style="color: ${color}">#${pokemon.id} ${pokeName.charAt(0).toUpperCase() + pokeName.slice(1)}</div>
            <div class="pokemonPhoto"><img src="${pokemon.sprites.other.home.front_default}" alt=""></div>
        </div>

        <div class="pokemonInfoExtendet">
            <div class="exit_div"><img src="./assets/icon/exit.png" onclick="toggleOverlay(pokemon)" alt="exitBtn"></div>
            <div class="pokeInfo">
                <div class="arrowDiv">
                    <img onclick="nextOrPokemons(${pokemon.id}, 'left')" class="arrow" id="leftArrow" src="./assets/icon/back.png" alt="left">
                    <img onclick="nextOrPokemons(${pokemon.id}, 'right')" class="arrow reverse" id="rightArrow" src="./assets/icon/back.png" alt="right">
                </div>
                <table class="tablePokeInfo">
                    <tr>
                        <td>Weight:</td>
                        <td>${pokemon.weight} hg</td>
                    </tr>
                    <tr>
                        <td>Height:</td>
                        <td>${pokemon.height} dm</td>
                    </tr>
                    <tr>
                        <td>Types:</td>
                        <td>${typeIconsHtml}</td>
                    </tr>
                    <tr>
                        <td>Base Experience:</td>
                        <td>${pokemon.base_experience}</td>
                    </tr>
                    <tr>
                        <td>Abilities:</td>
                        <td>${pokemon.abilities.map(a => a.ability.name).join(', ')}</td>
                    </tr>
                    <tr>
                        <td>Held Items:</td>
                        <td>${heldItems}</td>
                    </tr>
                    <tr>
                        <td>Moves (First 5):</td>
                        <td>${moves}</td>
                    </tr>
                    <tr>
                        <td>Egg Groups:</td>
                        <td>${eggGroups}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    `;
};