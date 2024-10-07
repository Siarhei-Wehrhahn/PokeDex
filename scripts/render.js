async function loadPokemon(selectedType) {
    if (isLoading) return;
    isLoading = true;

    document.querySelector('.pokeball').classList.add('spin');
    const loadingDots = document.querySelector('.loading-dots');
    loadingDots.classList.add('active');
    
    let dotsInterval = setInterval(() => {
        if (loadingDots.innerHTML.length < 4) {
            loadingDots.innerHTML += '.';
        } else {
            loadingDots.innerHTML = '';
        }
    }, 350);

    selectedType = selectedType || "alle";

    const localStoragePokemon = localStorage.getItem('pokemon');
    if (localStoragePokemon) {
        pokemon = JSON.parse(localStoragePokemon);
    }

    let limit = (selectedType === 'alle') ? 20 : 500;

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    let responseAsJson = await response.json();

    for (const newPokemon of responseAsJson.results) {
        if (!pokemon.some(p => p.name === newPokemon.name)) {
            pokemon.push(newPokemon);
        }
    }

    localStorage.setItem('pokemon', JSON.stringify(pokemon));

    await loadAndRenderPokemon(selectedType);
    offset += limit;

    document.querySelector('.pokeball').classList.remove('spin');
    loadingDots.classList.remove('active');
    clearInterval(dotsInterval);
    loadingDots.innerHTML = '';

    isLoading = false;
}

async function loadAndRenderPokemon(selectedType) {
    let container = document.getElementById('mainContainer');
    let nextPokemons = pokemon.slice(offset, offset + 20);

    if (nextPokemons.length === 0) return;

    const loadedIds = new Set();

    if (selectedType === 'alle') {
        for (const element of nextPokemons) {
            let pokemonDetails = await fetch(element.url);
            let pokemonDetailsAsJson = await pokemonDetails.json();

            nextPokemons.sort((a, b) => a.name.localeCompare(b.name));

            if (!loadedIds.has(pokemonDetailsAsJson.id)) {
                let firstMove = pokemonDetailsAsJson.moves[0].move;
                let moveDetailsResponse = await fetch(firstMove.url);
                let moveDetailsAsJson = await moveDetailsResponse.json();

                const effectDescription = moveDetailsAsJson.effect_entries.find(entry => entry.language.name === 'en').effect;

                container.innerHTML += getPokeCart(pokemonDetailsAsJson, effectDescription);
                loadedIds.add(pokemonDetailsAsJson.id);
            }
        }
    } else {
        for (const element of nextPokemons) {
            if (!loadedIds.has(element.id)) {
                let pokemonDetails = await fetch(element.url);
                let pokemonDetailsAsJson = await pokemonDetails.json();
                let firstMove = pokemonDetailsAsJson.moves[0].move;

                if (filterPokemon(pokemonDetailsAsJson, selectedType) && firstMove) {
                    let moveDetailsResponse = await fetch(firstMove.url);
                    let moveDetailsAsJson = await moveDetailsResponse.json();
                    const effectDescription = moveDetailsAsJson.effect_entries.find(entry => entry.language.name === 'en').effect;

                    container.innerHTML += getPokeCart(pokemonDetailsAsJson, effectDescription);
                    loadedIds.add(pokemonDetailsAsJson.id);
                }
            }
        }
    }
    offset += 20;
}

function nextOrPokemons(pokemonId, side) {
    const maxPokeId = 1025;
    let newPokeId;

    if (side === "right") {
        newPokeId = pokemonId + 1;
        if (newPokeId > maxPokeId) {
            newPokeId = 1;
        }
    } else {
        newPokeId = pokemonId - 1;
        if (newPokeId < 1) {
            newPokeId = maxPokeId;
        }
    }

    renderPokemonInfos(newPokeId);
}


async function renderPokemonInfos(pokemonId) {
    const container = document.getElementById('overlay');
    const localStoragePokemon = localStorage.getItem('pokemon');
    if (localStoragePokemon) {
        pokemon = JSON.parse(localStoragePokemon);
    }

    let pokemonJson = pokemon[pokemonId - 1];

    let pokemonDetails = await fetch(pokemonJson.url);
    let pokemonDetailsAsJson = await pokemonDetails.json();

    container.innerHTML = getPokeInfos(pokemonDetailsAsJson, pokemonJson.name);
}

let filterPokemon = (pokemon, selectedType) => {
    if (pokemon.types[0].type.name == selectedType) {
        return true;
    } else {
        return false;
    }
}