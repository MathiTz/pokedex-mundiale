import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokeCard from "../../components/PokeCard";
import { useAppContext } from "../../hooks";
import api from "../../services/api";

import pokedexBackground from "../../assets/pokedex.png";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "./style.css";
import filterList from "../../utils/filter";

const Home = () => {
  const { enableLoading, disableLoading } = useAppContext();
  const [pokemonsFilter, setPokemonsFilter] = useState([]);
  const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    async function getPokemonUrl() {
      enableLoading();
      try {
        const response = await api.get(`?limit=24&offset=${offset}`);

        const { data } = response;

        const { results } = data;

        setPokemonsData(results);
        disableLoading();
      } catch (error) {
        console.log(error);
      }
    }

    getPokemonUrl();
  }, [offset]);

  useEffect(() => {
    api.get("?limit=1050").then((res) => setPokemonsFilter(res.data.results));
  }, []);

  const nextPage = useCallback(() => {
    enableLoading();

    const next = page + 1;
    const newOffset = offset + 24;

    setPage(next);
    setOffset(newOffset);

    disableLoading();
  }, [page, offset, enableLoading, disableLoading]);

  const previousPage = useCallback(() => {
    enableLoading();

    const previous = page - 1;
    const newOffset = offset - 24;

    setPage(previous);
    setOffset(newOffset);

    disableLoading();
  }, [page, offset, enableLoading, disableLoading]);

  const handleFilterPokemons = (e) => {
    const { value } = e.target;

    if (value === "") {
      setPokemonsFiltered([]);

      return;
    }

    const filteredPokemonData = filterList(pokemonsFilter, value);

    const newPokemonData = filteredPokemonData
      .filter((value) => value !== undefined)
      .slice(0, 23);

    setPokemonsFiltered(newPokemonData);
  };

  return (
    <>
      <header>
        <img
          className="logoPokedex"
          src={pokedexBackground}
          alt="Imagem relativa ao pokedex"
        />
        <ul>
          <li>
            <label htmlFor="filter">Filter</label>
            <input type="text" name="filter" onChange={handleFilterPokemons} />
          </li>
          <li>
            <Link className="favorites-link" to="/favorites">
              Favorites
            </Link>
          </li>
        </ul>
      </header>
      <section className="poke-cards">
        {pokemonsData && !pokemonsFiltered.length
          ? pokemonsData.map((pokemonData) => (
              <PokeCard key={pokemonData.name} data={pokemonData} />
            ))
          : pokemonsFiltered.map((pokemonData) => (
              <PokeCard key={pokemonData.name} data={pokemonData} />
            ))}
      </section>
      {!pokemonsFiltered.length && (
        <footer>
          {page !== 1 ? (
            <button onClick={previousPage} className="previous">
              <FaChevronLeft />
            </button>
          ) : null}
          <span>{page}</span>
          <button onClick={nextPage} className="next">
            <FaChevronRight />
          </button>
        </footer>
      )}
    </>
  );
};

export default Home;
