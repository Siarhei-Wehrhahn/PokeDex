let type 

// Funktion zum Scroll-Handling
/*function handleScroll() {
    // Lade neue Pokémon, wenn das Ende der Seite erreicht ist
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        loadPokemon(type);
    }
}
    
// Scroll-Event-Listener
window.addEventListener('scroll', handleScroll);
*/

document.getElementById('searchBar').addEventListener('input', (input) => {
    const searchValue = input.target.value.toLowerCase();
    const selectedType = selector.value;

    const filteredPokemons = filterPokemonByName(pokemon, searchValue, selectedType);
    
    // Render die gefilterten Pokémon
    renderFilteredPokemons(filteredPokemons);
});

function filterPokemonByName(pokemonList, searchValue, selectedType) {
    let filteredByType = selectedType === 'alle' ? pokemonList : filterArray(pokemonList, selectedType);

    return filteredByType.filter(p => p.name.toLowerCase().includes(searchValue));
}

// Funktion zum Rendern der gefilterten Pokémon
function renderFilteredPokemons(filteredPokemons) {
    let container = document.getElementById('main_container');
    container.innerHTML = '';

    filteredPokemons.forEach(async element => {
        let pokemonDetails = await fetch(element.url);
        let pokemonDetailsAsJson = await pokemonDetails.json();
        const firstMove = pokemonDetailsAsJson.moves[0].move;

        // Füge hier den Move-Detail-Abruf und das Rendering hinzu
        const moveDetailsResponse = await fetch(firstMove.url);
        const moveDetailsAsJson = await moveDetailsResponse.json();
        const effectDescription = moveDetailsAsJson.effect_entries.find(entry => entry.language.name === 'en').effect;

        container.innerHTML += getPokeCart(pokemonDetailsAsJson, effectDescription);
    });
}

// Funktion zum Laden der nächsten Pokémon auf Button-Klick
document.getElementById('loadBtn').addEventListener('click', () => {
    loadPokemon(selectedType);
});

let checkColor = (pokemon) => {
    const primaryType = pokemon.types[0].type.name;
    return typeColors[primaryType] 
}

let checkBackground = (pokemon) => {
    const primaryType = pokemon.types[0].type.name
    return typePhoto[primaryType]
}

let checkTypeIcon = (pokemon) => {
    const primaryType = pokemon.types[0].type.name
    return typeicon[primaryType]
}

const selector = document.getElementById('pokemonSelector');
selector.addEventListener('change', () => {
    const selectedType = selector.value;
    offset = 0;
    loadPokemon(selectedType);
    type = selectedType
});

function toggleOverlay(pokemonId, pokemonName) {
    let overlay = document.getElementById('overlay');
    let header = document.getElementById('header');
    let main = document.getElementById('main_container');
    let footer = document.getElementById('footer');
    if (overlay.classList.contains('d_none')) {
        renderPokemonInfos(pokemonId, pokemonName);
        overlay.classList.remove('d_none');
        header.classList.toggle('blur');
        main.classList.toggle('blur');
        footer.classList.toggle('blur')
    } else {
        overlay.classList.add('d_none');
        header.classList.remove('blur');
        main.classList.remove('blur');
        footer.classList.remove('blur');
    }
}
