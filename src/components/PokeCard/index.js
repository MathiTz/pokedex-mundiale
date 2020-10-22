import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../hooks";
import api from "../../services/api";

import "./style.css";

const PokeCard = (props) => {
  const { handleFavorite, checkIfItsFavorite } = useAppContext();
  const history = useHistory();
  const { data, pokemonId } = props;
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    if (data) {
      api
        .get(data.url)
        .then((res) => setPokemon(res.data))
        .catch((e) => console.log(e));
    } else {
      api
        .get(`/${pokemonId}`)
        .then((res) => setPokemon(res.data))
        .catch((e) => console.log(e));
    }
  }, []);

  const navigateToDetails = (id) => {
    history.push(`/details/${id}`);
  };

  return (
    <>
      {pokemon && (
        <section className="poke-card">
          <FaStar
            color={checkIfItsFavorite(pokemon.id) ? "#ffff00" : "#fff"}
            onClick={() => handleFavorite(pokemon.id)}
          />
          <h4 className="poke-card-info">Height: {pokemon.height}</h4>
          <h4 className="poke-card-info">Weight: {pokemon.weight}</h4>

          <div className="poke-imgs">
            <img
              className="poke-card-img"
              src={pokemon.sprites["front_default"]}
            />
            <img
              className="poke-card-img"
              src={pokemon.sprites["back_default"]}
            />
          </div>
          <button
            onClick={() => navigateToDetails(pokemon.id)}
            className="poke-card-details"
          >
            Details
          </button>
        </section>
      )}
    </>
  );
};

export default PokeCard;
