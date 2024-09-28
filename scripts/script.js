let pokemon = [];
let offset = 0;
let isLoading = false;

// Funktion, um Pokémon zu laden
async function loadPokemon() {
    if (isLoading) return;
    isLoading = true;

    // Zuerst laden wir die Pokémon aus dem Local Storage, wenn vorhanden
    const localStoragePokemon = localStorage.getItem('pokemon');
    if (localStoragePokemon) {
        pokemon = JSON.parse(localStoragePokemon);
        console.log(`Loaded ${pokemon.length} Pokémon from local storage.`);
    }

    // Lade mehr Pokémon von der API, wenn wir den Offset erreichen
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    let responseAsJson = await response.json();

    // Füge die neuen Pokémon hinzu
    for (const newPokemon of responseAsJson.results) {
        if (!pokemon.some(p => p.name === newPokemon.name)) {
            pokemon.push(newPokemon);
        }
    }

    // Speichere alle Pokémon im Local Storage
    localStorage.setItem('pokemon', JSON.stringify(pokemon));
    console.log(`Stored ${pokemon.length} Pokémon in local storage.`);

    // Render die Pokémon (wir zeigen nur die nächsten 20 an)
    await loadAndRenderPokemon();

    // Erhöhe den Offset für das nächste Laden
    offset += 20;
    isLoading = false;
}

// Funktion, um Pokémon zu rendern
async function loadAndRenderPokemon() {
    let container = document.getElementById('main_container');

    // Berechne die nächsten Pokémon, die gerendert werden sollen
    let nextPokemons = pokemon.slice(offset, offset + 20); // Nur die nächsten 20 Pokémon

    // Überprüfe, ob nextPokemons leer ist
    if (nextPokemons.length === 0) {
        console.log(`No more Pokémon to render.`);
        return;
    }

    console.log(`Rendering Pokémon from ${offset} to ${offset + 20}:`, nextPokemons);

    // Map für bereits geladene Pokémon
    const loadedIds = new Set();

    for (const element of nextPokemons) {
        let pokemonDetails = await fetch(element.url);
        let pokemonDetailsAsJson = await pokemonDetails.json();

        // Render nur, wenn das Pokémon noch nicht im DOM existiert
        if (!loadedIds.has(pokemonDetailsAsJson.id)) {
            container.innerHTML += getPokeCart(pokemonDetailsAsJson);
            loadedIds.add(pokemonDetailsAsJson.id);
        }
    }
}

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