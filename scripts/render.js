// Funktion, um Pokémon zu laden
async function loadPokemon(selectedType = 'alle') {  // Default-Wert hinzufügen
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
    await loadAndRenderPokemon(selectedType); // Übergabe des selectedType

    // Erhöhe den Offset für das nächste Laden
    offset += 20;
    isLoading = false;
}

//TODO
// Funktion, um Pokémon zu rendern
async function loadAndRenderPokemon(selectedType) {
    let container = document.getElementById('main_container');

    // Berechne die nächsten Pokémon, die gerendert werden sollen
    let nextPokemons = pokemon.slice(offset, offset + 20); // Nur die nächsten 20 Pokémon

    // Überprüfe, ob nextPokemons leer ist
    if (nextPokemons.length === 0) {
        console.log(`No more Pokémon to render.`);
        return;
    }

    // Map für bereits geladene Pokémon
    const loadedIds = new Set();

    if (selectedType === 'alle') {
        // Rendern aller Pokémon
        for (const element of nextPokemons) {
            let pokemonDetails = await fetch(element.url);
            let pokemonDetailsAsJson = await pokemonDetails.json();

            if (!loadedIds.has(pokemonDetailsAsJson.id)) {
                // Lade Details der ersten Attacke
                let firstMove = pokemonDetailsAsJson.moves[0].move;
                let moveDetailsResponse = await fetch(firstMove.url);
                let moveDetailsAsJson = await moveDetailsResponse.json();

                // Füge die Beschreibung der Attacke hinzu
                const effectDescription = moveDetailsAsJson.effect_entries.find(entry => entry.language.name === 'en').effect;

                // Verwende die Attackenbeschreibung beim Rendering des Pokémon
                container.innerHTML += getPokeCart(pokemonDetailsAsJson, effectDescription);
                loadedIds.add(pokemonDetailsAsJson.id);
            }
        }
    } else {
        // Filtere Pokémon nach Typ
        const filteredPokemons = filterArray(pokemon, selectedType);
        let nextFilteredPokemons = filteredPokemons.slice(offset, offset + 20);

        if (nextFilteredPokemons.length === 0) {
            console.log(`No more Pokémon of type ${selectedType} to render.`);
            return;
        }

        for (const element of nextFilteredPokemons) {
            if (!loadedIds.has(element.id)) {
                let pokemonDetails = await fetch(element.url);
                let pokemonDetailsAsJson = await pokemonDetails.json();

                let firstMove = pokemonDetailsAsJson.moves[0].move;
                let moveDetailsResponse = await fetch(firstMove.url);
                let moveDetailsAsJson = await moveDetailsResponse.json();

                const effectDescription = moveDetailsAsJson.effect_entries.find(entry => entry.language.name === 'en').effect;

                container.innerHTML += getPokeCart(pokemonDetailsAsJson, effectDescription);
                loadedIds.add(pokemonDetailsAsJson.id);
            }
        }
    }
}

let filterArray = (pokemon, selectedType) => {
    return pokemon.filter(p => 
        Array.isArray(p.types) && // Überprüfe, ob `types` ein Array ist
        p.types.some(type => type.type.name === selectedType)
    );
};
//TODO