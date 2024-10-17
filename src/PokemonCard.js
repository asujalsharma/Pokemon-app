import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ name, image }) => {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} className="pokemon-image" />
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
    </div>
  );
};

export default PokemonCard;
