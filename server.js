const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_COUNT = 151; // Gen 1

// Helper function to fetch data (using native fetch if Node >= 18, otherwise need node-fetch)
// Assuming Node >= 18 for simplicity here.
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return null; // Return null on error
    }
}

// API endpoint to get all Pokemon data
app.get('/api/pokemon', async (req, res) => {
    console.log('API: Received request for Pokemon data');
    try {
        // 1. Fetch the list of Pokemon URLs
        const listData = await fetchData(`${POKE_API_URL}?limit=${POKEMON_COUNT}`);
        if (!listData || !listData.results) {
            return res.status(500).json({ error: 'Failed to fetch Pokemon list from PokeAPI' });
        }

        // 2. Fetch details for each Pokemon concurrently
        console.log('API: Fetching details for each Pokemon...');
        const pokemonDetailsPromises = listData.results.map(pokemon => fetchData(pokemon.url));
        const pokemonDetailsArray = await Promise.all(pokemonDetailsPromises);

        // 3. Filter out any null results from failed fetches
        const validPokemonData = pokemonDetailsArray.filter(data => data !== null);

        console.log(`API: Successfully fetched data for ${validPokemonData.length} Pokemon.`);
        res.json(validPokemonData);

    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error while fetching Pokemon data' });
    }
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '.'))); // Serve files from the root directory

// Fallback for SPA (optional, but good practice if you add routing later)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
