// import functions

// grab DOM elements
const template = document.querySelector('#template');
const apiSelector = document.querySelector('select');
const list = document.querySelector('#list');

// set event listeners 
apiSelector.addEventListener('change', async(event) => {
    const selected = event.target.value;
    list.classList.remove('starwars', 'pokemon');
    if (selected === 'pokemon') {
        list.innerHTML = '';
        await loadPokedex();
    } else if (selected === 'star-wars') {
        list.innerHTML = '';
        await loadStarWars();
    }
});

export async function getPokedex() {
    let url = 'https://pokedex-alchemy.herokuapp.com/api/pokedex';
    const resp = await fetch(url);
    const json = await resp.json();
    return json.results;
}

export async function getStarWars() {
    let url = 'https://swapi.dev/api/starships';
    const resp = await fetch(url);
    const json = await resp.json();
    return json.results;
}

async function loadStarWars() {
    const starships = await getStarWars();
    list.classList.add('starwars');
    
    for (let ship of starships) {
        const clone = template.content.cloneNode(true);  
        const name = clone.querySelector('h1');
        const type = clone.querySelector('h6');
        const films = clone.querySelector('h4');
        let url = ship.films[0];
        const resp = await fetch(url);
        const json = await resp.json();
        name.textContent = 'Name: ' + ship.name;    
        type.textContent = 'Manufacturer: ' + ship.manufacturer;
        films.textContent = 'First film appeared in: ' + json.title;
    
        list.appendChild(clone);
    }
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