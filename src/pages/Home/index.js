import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState();
  const [offset, setOffset] = useState(20);

  const getPokemonData = useCallback(
    async (pokemon) => {
      const { url } = pokemon;

      const response = await api.get(url);

      setPokemons(...pokemons, response.data);
    },
    [pokemons]
  );

  useEffect(() => {
    async function getPokemonUrl() {
      const response = await api.get(`?limit=20&offset=${offset}`);

      const { data } = response;

      data.results.map((result) => getPokemonData(result));
    }

    getPokemonUrl();
  }, [getPokemonData, offset]);

  return <h1>Home</h1>;
};

export default Home;
