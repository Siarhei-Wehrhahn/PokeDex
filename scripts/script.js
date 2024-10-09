let type

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        loadPokemon(type);
    }
}

window.addEventListener('scroll', handleScroll);

document.getElementById('searchBar').addEventListener('input', (input) => {
    const searchValue = input.target.value.toLowerCase();
    if (searchValue === '') {
        offset = 0;
        const selectedType = selector.value;
        const limitedPokemons = pokemon.slice(0, 20);
        let filteredPokemons = selectedType === 'alle' ? limitedPokemons : filterArray(limitedPokemons, selectedType);
        renderFilteredPokemons(filteredPokemons);
        return;
    }
    if (searchValue.length >= 3) {
        const selectedType = selector.value;
        const filteredPokemons = filterPokemonByName(pokemon, searchValue, selectedType);
        renderFilteredPokemons(filteredPokemons);
    }
});

function filterPokemonByName(pokemonList, searchValue, selectedType) {
    let filteredByType = selectedType === 'alle' ? pokemonList : filterArray(pokemonList, selectedType);

    return filteredByType.filter(p => p.name.toLowerCase().includes(searchValue));
}


// Funktion zum Rendern der gefilterten Pokémon
function renderFilteredPokemons(filteredPokemons) {
    let container = document.getElementById('mainContainer');
    container.innerHTML = '';

    filteredPokemons.forEach(async element => {
        let pokemonDetails = await fetch(element.url);
        let pokemonDetailsAsJson = await pokemonDetails.json();
        const firstMove = pokemonDetailsAsJson.moves[0].move;
        const moveDetailsResponse = await fetch(firstMove.url);
        const moveDetailsAsJson = await moveDetailsResponse.json();
        const effectDescription = moveDetailsAsJson.effect_entries.find(entry => entry.language.name === 'en').effect;

        container.innerHTML += getPokeCart(pokemonDetailsAsJson, effectDescription);
    });
}

// Funktion zum Laden der nächsten Pokémon auf Button-Klick
document.getElementById('loadBtn').addEventListener('click', () => {
    loadPokemon(type);
});

const checkColor = (pokemon) => {
    const primaryType = pokemon.types[0].type.name;
    return typeColors[primaryType]
}

const checkBackground = (pokemon) => {
    const primaryType = pokemon.types[0].type.name
    return typePhoto[primaryType]
}

const checkTypeIcon = (pokemon) => {
    const primaryType = pokemon.types[0].type.name
    return typeicon[primaryType]
}

const checkTypeIcons = (pokemon) => {
    return pokemon.types.map(type => typeicon[type.type.name]);
}

const selector = document.getElementById('pokemonSelector');
selector.addEventListener('change', () => {
    const mainContainer = document.getElementById('mainContainer')
    const selectedType = selector.value;
    offset = 0;
    mainContainer.innerHTML = ""
    loadPokemon(selectedType);
    type = selectedType
});

function toggleOverlay(pokemonId) {
    let overlay = document.getElementById('overlay');
    let header = document.getElementById('header');
    let main = document.getElementById('mainContainer');
    let footer = document.getElementById('footer');
    renderPokemonInfos(pokemonId);
    overlay.classList.toggle('d_none');
    header.classList.toggle('blur');
    main.classList.toggle('blur');
    footer.classList.toggle('blur')

    checkOverlayVisibility();
}

function checkOverlayVisibility() {
    const overlay = document.getElementById('overlay');
    const body = document.body;

    if (!overlay.classList.contains('d_none')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}
