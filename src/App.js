import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import "./App.css";


const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const results = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokeData = await axios.get(pokemon.url);
            return { name: pokemon.name, image: pokeData.data.sprites.front_default };
          })
        );
        setPokemonList(results);
        setFilteredPokemon(results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonList]);

  return (
    <div className="App">
      <h1 className="heading">Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} image={pokemon.image} />
        ))}
      </div>
    </div>
  );
};

export default App;
