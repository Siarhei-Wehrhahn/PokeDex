const loadFromLocalStorage = () => {
    const localStoragePokemon = localStorage.getItem('pokemon');
    if (localStoragePokemon) {
        pokemon = JSON.parse(localStoragePokemon);
    }
}

const fetchPokemon = async (limit) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    let responseAsJson = await response.json();

    for (const newPokemon of responseAsJson.results) {
        if (!pokemon.some(p => p.name === newPokemon.name)) {
            pokemon.push(newPokemon);
        }
    }

    localStorage.setItem('pokemon', JSON.stringify(pokemon));
}

const stopLoadingAnimation = (dotsInterval) => {
    const loadingDots = document.querySelector('.loading-dots');
    document.querySelector('.pokeball').classList.remove('spin');
    loadingDots.classList.remove('active');
    clearInterval(dotsInterval);
    loadingDots.innerHTML = '';
}

async function loadPokemon(selectedType) {
    if (isLoading) return;
    isLoading = true;
    const loadingDots = document.querySelector('.loading-dots');
    document.querySelector('.pokeball').classList.toggle('spin');
    loadingDots.classList.toggle('active');
    let dotsInterval = setInterval(() => {
        if (loadingDots.innerHTML.length < 4) {
            loadingDots.innerHTML += '.';
        } else {
            loadingDots.innerHTML = '';
        }
    }, 350);
    selectedType = selectedType || "alle";
    loadFromLocalStorage();
    let limit = (selectedType === 'alle') ? 20 : 50;
    fetchPokemon(limit)
    await loadAndRenderPokemon(selectedType, limit);
    offset += limit;
    stopLoadingAnimation(dotsInterval);
    isLoading = false;
}

async function loadAndRenderPokemon(selectedType, limit) {
    let nextPokemons = pokemon.slice(offset, offset + limit);
    if (nextPokemons.length === 0) return;
    if (selectedType === 'alle') {
        await loadAllPokemons(nextPokemons);
    } else {
        await loadSelectedPokemons(nextPokemons, selectedType);
    }
}

const loadAllPokemons = async (nextPokemons) => {
    let container = document.getElementById('mainContainer');
    for (const element of nextPokemons) {
        let pokemonDetails = await fetch(element.url);
        let pokemonDetailsAsJson = await pokemonDetails.json();
        if (!loadedIds.has(pokemonDetailsAsJson.id)) {
            let firstMove = pokemonDetailsAsJson.moves[0].move;
            let moveDetailsResponse = await fetch(firstMove.url);
            let moveDetailsAsJson = await moveDetailsResponse.json();

            const effectDescription = moveDetailsAsJson.effect_entries.find(entry => entry.language.name === 'en').effect;

            container.innerHTML += getPokeCart(pokemonDetailsAsJson, effectDescription);
            loadedIds.add(pokemonDetailsAsJson.id);
        }
    }
}

const loadSelectedPokemons = async (nextPokemons, selectedType) => {
    let container = document.getElementById('mainContainer');
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