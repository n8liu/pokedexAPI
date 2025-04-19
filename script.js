document.addEventListener('DOMContentLoaded', () => {
    const pokedexContainer = document.getElementById('pokedex-container');
    const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon'; 
    const POKEMON_COUNT = 1025; 

    // --- Function to fetch data for a single Pokemon ---
    async function fetchPokemonData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
            return null; 
        }
    }

    // --- Function to fetch all Pokemon details from PokeAPI ---
    async function fetchAllPokemonDetails() {
        console.log('Fetching Pokemon list from PokeAPI...');
        try {
            const listResponse = await fetch(`${POKE_API_URL}?limit=${POKEMON_COUNT}`);
            if (!listResponse.ok) {
                throw new Error(`HTTP error! status: ${listResponse.status}`);
            }
            const listData = await listResponse.json();

            console.log('Fetching details for each Pokemon...');
            const pokemonDetailsPromises = listData.results.map(pokemon => fetchPokemonData(pokemon.url));
            const pokemonDetailsArray = await Promise.all(pokemonDetailsPromises);

            const validPokemonData = pokemonDetailsArray.filter(data => data !== null);

            return validPokemonData;

        } catch (error) {
            console.error("Error fetching Pokemon list from PokeAPI:", error);
            pokedexContainer.innerHTML = '<p>Error loading Pokémon data. Please try refreshing.</p>';
            return []; 
        }
    }

    // --- Function to display Pokemon data (no changes needed here) ---
    function displayPokemon(pokemonData) {
        pokedexContainer.innerHTML = ''; 
        pokemonData.sort((a, b) => a.id - b.id); 

        pokemonData.forEach(pokemon => {
            const card = document.createElement('div');
            card.classList.add('pokemon-card');

            const name = pokemon.name;
            const id = pokemon.id.toString().padStart(3, '0');
            const imageUrl = pokemon.sprites?.front_default || 'placeholder.png'; 
            const types = pokemon.types.map(typeInfo => typeInfo.type.name);
            const stats = pokemon.stats.map(statInfo => ({
                name: statInfo.stat.name,
                value: statInfo.base_stat
            }));

            card.innerHTML = `
                <img src="${imageUrl}" alt="${name}">
                <h2>#${id} ${name}</h2>
                <div class="pokemon-types">
                    ${types.map(type => `<span class="type-${type}">${type}</span>`).join('')}
                </div>
                <div class="pokemon-stats">
                    <h4>Base Stats:</h4>
                    <ul>
                        ${stats.map(stat => `<li>${stat.name.replace('-', ' ')}: ${stat.value}</li>`).join('')}
                    </ul>
                </div>
            `;
            pokedexContainer.appendChild(card);
        });
        console.log('Pokemon displayed.');
    }

    // --- Main logic --- 
    async function initPokedex() {
        console.log('Initializing Pokedex - fetching data from PokeAPI...');
        const pokemonData = await fetchAllPokemonDetails(); 
        if (pokemonData.length > 0) {
            displayPokemon(pokemonData);
        }
    }

    initPokedex();
});
