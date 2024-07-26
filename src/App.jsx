import React, { useContext, useState } from 'react';
import { DataContext } from './conteks/useConteksData';

const App = () => {
  const { data, loading, error } = useContext(DataContext);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  if (loading) return <p className="text-center mt-4 text-lg text-white">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-lg text-red-500">Error: {error.message}</p>;

  const handleSelect = async (event) => {
    const pokemonUrl = event.target.value;
    setSelectedPokemonUrl(pokemonUrl);

    if (pokemonUrl) {
      try {
        const response = await fetch(pokemonUrl);
        const pokemonData = await response.json();
        setSelectedPokemon(pokemonData);
      } catch (err) {
        console.error('Error fetching Pokémon details:', err);
      }
    } else {
      setSelectedPokemon(null);
    }
  };

  // Sort data alphabetically
  const sortedData = data && data.results.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex gbr text-black justify-center items-center w-full h-screen bg-gray-100 background-image fixed">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg opacity-90">
        <p className='text-2.5xl font-bold mb-5 text-center'>Welcome Pokémon</p>
        <p className='text-center mb-4'>Silakan pilih untuk mendapatkan detailnya</p>
        <select 
          onChange={handleSelect} 
          value={selectedPokemonUrl || ''} 
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="">Select a Pokémon</option>
          {sortedData && sortedData.map(pokemon => (
            <option key={pokemon.name} value={pokemon.url}>
              {pokemon.name}
            </option>
          ))}
        </select>

        {selectedPokemon && (
          <div className="fade-in slide-up">
            <div className='flex flex-col text-start items-start'>
              <h2 className="text-2xl font-bold mb-2">{selectedPokemon.name}</h2>
              <p className="text-lg">Height: {selectedPokemon.height}</p>
              <p className="text-lg">Weight: {selectedPokemon.weight}</p>
              <h3 className="text-xl font-semibold mt-4">Abilities:</h3>
              <ul className="list-disc ml-5 mt-2">
                {selectedPokemon.abilities.map(ability => (
                  <li key={ability.ability.name} className="text-lg decoration-none">{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
