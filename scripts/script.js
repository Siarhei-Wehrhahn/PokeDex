// Funktion zum Scroll-Handling
function handleScroll() {
    // Lade neue Pokémon, wenn das Ende der Seite erreicht ist
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        loadPokemon();
    }
}

// Event-Listener für die Suche
document.getElementById('searchBar').addEventListener('input', loadAndRenderPokemon);

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
    offset = 0; // Offset zurücksetzen, wenn der Typ gewechselt wird
    loadPokemon(selectedType); // Neues Laden basierend auf dem ausgewählten Typ
});