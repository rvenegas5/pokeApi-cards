document.addEventListener('DOMContentLoaded', () => {
  const btnSearch = document.querySelector('.nav-grid-form-btn');
  const form = document.getElementById('form');
  const fetchData = async (namePoke) => {
    try {
        const resPokemons = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200');
        const dataPokemons = await resPokemons.json();
        const pokemons= dataPokemons.results.map(element => element.name);
        const id = pokemons.findIndex((element) => element === namePoke);
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`);
          const data = await res.json();
          const pokemon = {
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          img: data.sprites.other.dream_world.front_default,
          hp: data.stats[0].base_stat,
          exp: data.base_experience,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          special: data.stats[3].base_stat,
          }
          showCard(pokemon);
        } catch (error) {
          console.error(error);
        }
    } catch (error) {
      console.error(error); 
    }
    
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const showCard = (pokemon) => {
    const flex = document.querySelector('.flex')
    flex.innerHTML = '';
    const template = document.getElementById('template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name}<span>${pokemon.hp} HP</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.exp + ' Exp';
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack + 'K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.defense + 'K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.special + 'K';

    fragment.appendChild(clone);
    flex.appendChild(fragment);
  };

  //const numPok = getRandomInt(1, 151);  

  const fetchForm = () => {
    const formData = new FormData(form);
    const entries = formData.entries();
    const data = Object.fromEntries(entries);
    return data.name? data.name: null;
  }
  
  btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
    if(!fetchForm()) {
      console.log('fail');
    }
    console.log(fetchForm());
    fetchData(fetchForm());
  });
  
  fetchData('pikachu');
});