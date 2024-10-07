let offset = 0;
let isLoading = false;
let pokeJson ;
let pokemon = [];

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};
const typePhoto = {
    normal: "./assets/img/normal.jpeg",
    fire: "./assets/img/fire.jpeg",
    water: "./assets/img/water.jpeg",
    electric: "./assets/img/electric.jpeg",
    grass: "./assets/img/plant.jpeg",
    ice: "./assets/img/ice.jpeg",
    fighting: "./assets/img/fighting.jpeg",
    poison: "./assets/img/poison.jpeg",
    ground: "./assets/img/ground.jpeg",
    flying: "./assets/img/flying.jpeg",
    psychic: "./assets/img/psychic.jpeg",
    bug: "./assets/img/bug.jpeg",
    rock: "./assets/img/rock.jpeg",
    ghost: "./assets/img/ghost.jpeg",
    dragon: "./assets/img/dragon.jpeg",
    dark: "./assets/img/dark.jpeg",
    steel: "./assets/img/steel.jpeg",
    fairy: "./assets/img/fairy.jpeg"
}

const typeicon = {
    normal: "./assets/icon/normal.png",
    fire: "./assets/icon/fire.png",
    water: "./assets/icon/water.png",
    electric: "./assets/icon/electric.png",
    grass: "./assets/icon/grass.png",
    ice: "./assets/icon/ice.png",
    fighting: "./assets/icon/fighting.png",
    poison: "./assets/icon/poison.png",
    ground: "./assets/icon/ground.png",
    flying: "./assets/icon/flying.png",
    psychic: "./assets/icon/psychic.png",
    bug: "./assets/icon/bug.png",
    rock: "./assets/icon/rock.png",
    ghost: "./assets/icon/ghost.png",
    dragon: "./assets/icon/dragon.png",
    dark: "./assets/icon/dark.png",
    steel: "./assets/icon/steel.png",
    fairy: "./assets/icon/fairy.png"
}