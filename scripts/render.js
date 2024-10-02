// Funktion, um Pokémon zu laden
async function loadPokemon(selectedType) {  
    if (isLoading) return;
    isLoading = true;

    selectedType = selectedType || "alle";

    const localStoragePokemon = localStorage.getItem('pokemon');
    if (localStoragePokemon) {
        pokemon = JSON.parse(localStoragePokemon);
        console.log(`Loaded ${pokemon.length} Pokémon from local storage.`);
    }

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    let responseAsJson = await response.json();

    for (const newPokemon of responseAsJson.results) {
        if (!pokemon.some(p => p.name === newPokemon.name)) {
            pokemon.push(newPokemon);
        }
    }

    localStorage.setItem('pokemon', JSON.stringify(pokemon));
    console.log(`Stored ${pokemon.length} Pokémon in local storage.`);

    await loadAndRenderPokemon(selectedType);
    offset += 20;
    isLoading = false;
}

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

            nextPokemons.sort((a, b) => a.name.localeCompare(b.name));

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
        container.innerHTML = "";

        for (const element of pokemon) {
            if (!loadedIds.has(element.id)) {
                let pokemonDetails = await fetch(element.url);
                let pokemonDetailsAsJson = await pokemonDetails.json();

                let firstMove = filterPokemon(pokemonDetailsAsJson, selectedType) ? pokemonDetailsAsJson.moves[0].move : null;

                if (firstMove != null) {
                    let moveDetailsResponse = await fetch(firstMove.url);
                    let moveDetailsAsJson = await moveDetailsResponse.json();

                    const effectDescription = moveDetailsAsJson.effect_entries.find(entry => entry.language.name === 'en').effect;

                    container.innerHTML += getPokeCart(pokemonDetailsAsJson, effectDescription);
                    loadedIds.add(pokemonDetailsAsJson.id);
                }
            }
        }
    }
}
 // TODO render pokemon function ist nicht fertig für das overlay wichtig!!
async function renderPokemonInfos(pokemonId) {
    const container = document.getElementById('overlay');
    let pokemon = pokemon.find(p => p.id === pokemonId)
    let pokemonDetails = await fetch(pokemon.url);
    let pokemonDetailsAsJson = await pokemonDetails.json();
    container.innerHTML = getPokeInfos(pokemonDetailsAsJson)
}

let filterPokemon = (pokemon, selectedType) => {
    if (pokemon.types[0].type.name == selectedType) {
        return true
    } else {
        return false
    }
}