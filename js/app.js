document.addEventListener('DOMContentLoaded', () => {
  const numPok = getRandomInt(1, 151);  
  fetchData(numPok);
});

const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
    showCard(pokemon)
  } catch (error) {
    console.error(error);
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const showCard = (pokemon) => {
  const flex = document.querySelector('.flex')
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