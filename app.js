// import functions

// grab DOM elements
const template = document.querySelector('#template');
const apiSelector = document.querySelector('select');
const list = document.querySelector('#list');

// set event listeners 

export async function getPokedex() {
    let url = 'https://pokedex-alchemy.herokuapp.com/api/pokedex';
    const resp = await fetch(url);
    const json = await resp.json();
    return json.results;
}

export async function getStarWars() {
    let url = 'https://swapi.dev/api/starships/2';
    const resp = await fetch(url);
    const json = await resp.json();
    return json.results;
}

async function loadPokedex() {
    const pokedex = await getPokedex();
    list.classList.add('pokemon');
    
    for (let pokemon of pokedex) {
        const clone = template.content.cloneNode(true);  
        const name = clone.querySelector('h1');
        const type = clone.querySelector('h6');
        const image = clone.querySelector('img');    

        name.textContent = 'Name: ' + pokemon.pokemon;    
        type.textContent = 'Egg: ' + pokemon.egg_group_1;
        image.src = pokemon.url_image;
        image.alt = pokemon.pokedex;
    
        list.appendChild(clone);
    }
}

loadPokedex();