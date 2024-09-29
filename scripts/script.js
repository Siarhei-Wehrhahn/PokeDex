// Funktion zum Scroll-Handling
function handleScroll() {
    // Lade neue Pokémon, wenn das Ende der Seite erreicht ist
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        loadPokemon();
    }
}

// TODO: 
document.getElementById('searchBar').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase(); // Den eingegebenen Suchwert abrufen
    const selectedType = selector.value; // Aktuellen Typ abrufen

    // Füge hier eine neue Filterfunktion hinzu, um Pokémon nach Namen zu filtern
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
    container.innerHTML = ''; // Vorherigen Inhalt löschen

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
// TODO

// Scroll-Event-Listener
window.addEventListener('scroll', handleScroll);

// Funktion zum Laden der nächsten Pokémon auf Button-Klick
// Nur vorhanden weil es Pflicht ist!
document.getElementById('loadBtn').addEventListener('click', () => {
    loadPokemon();
});

let checkColor = (pokemon) => {
    const primaryType = pokemon.types[0].type.name;
    return typeColors[primaryType] 
}

let checkBackground = (pokemon) => {
    const primaryType = pokemon.types[0].type.name
    return typePhoto[primaryType]
}

const selector = document.getElementById('pokemonSelector');
selector.addEventListener('change', function() {
    const selectedType = selector.value;
    offset = 0;
    loadPokemon(selectedType); // Neues Laden basierend auf dem ausgewählten Typ
});