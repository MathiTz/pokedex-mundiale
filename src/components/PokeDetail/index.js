import React, { useState, useEffect } from "react";

import { FaStar } from "react-icons/fa";
import { useAppContext } from "../../hooks";

import api from "../../services/api";

import "./style.css";

const PokeDetail = (props) => {
  const { handleFavorite, checkIfItsFavorite } = useAppContext();
  const [evolutionChain, setEvolutionChain] = useState();
  const { pokemon } = props;

  useEffect(() => {
    async function getEvolutionChain() {
      let chains = [];

      const response = await api.get(pokemon.species.url);

      const { evolution_chain } = response.data;

      const responseForEvolutionChain = await api.get(evolution_chain.url);

      const { chain } = responseForEvolutionChain.data;

      chains.push(chain.species.name);

      chains.push(chain.evolves_to[0].species.name);

      chains.push(chain.evolves_to[0].evolves_to[0].species.name);

      setEvolutionChain(chains);
    }

    getEvolutionChain();
  }, [pokemon.species.url]);

  return (
    <section className="poke-details">
      <FaStar
        className="poke-details-favorite"
        color={checkIfItsFavorite(pokemon.id) ? "#ffff00" : "#fff"}
        onClick={() => handleFavorite(pokemon.id)}
      />
      <img
        className="poke-card-img"
        src={pokemon.sprites["front_default"]}
        alt="Pokemon Sprites"
      />
      <p>Name: {pokemon.name}</p>

      {pokemon.forms.map((form) => (
        <p key={form.url}> Form: {form.name} </p>
      ))}

      {pokemon.types.map((type) => (
        <p key={type.slot}>Type: {type.type.name}</p>
      ))}

      {pokemon.stats.map((stat) => (
        <p key={stat.stat.url}>
          Base Stat: {stat.base_stat} | {stat.stat.name}
        </p>
      ))}

      <div className="chains-evolution">
        {evolutionChain &&
          evolutionChain.map((chain) => (
            <p
              className={chain === pokemon.name ? "active-name" : ""}
              key={chain}
            >
              {chain}
            </p>
          ))}
      </div>
    </section>
  );
};

export default PokeDetail;
