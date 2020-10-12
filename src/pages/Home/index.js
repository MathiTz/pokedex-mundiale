import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PokeCard from "../../components/PokeCard";
import { useAppContext } from "../../hooks";
import api from "../../services/api";

import pokedexBackground from "../../assets/pokedex.png";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "./style.css";

const Home = () => {
  const { enableLoading, disableLoading } = useAppContext();
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

  const nextPage = useCallback(() => {
    enableLoading();

    const next = page + 1;
    const newOffset = offset + 24;

    setPage(next);
    setOffset(newOffset);

    disableLoading();
  }, [page, offset]);

  const previousPage = useCallback(() => {
    enableLoading();

    const previous = page - 1;
    const newOffset = offset - 24;

    setPage(previous);
    setOffset(newOffset);

    disableLoading();
  }, [page, offset]);

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
            <input
              type="text"
              name="filter"
              onChange={(e) => console.log(e.target.value)}
            />
          </li>
          <li>
            <Link className="favorites-link" to="/favorites">
              Favorites
            </Link>
          </li>
        </ul>
      </header>
      <section className="poke-cards">
        {pokemonsData &&
          pokemonsData.map((pokemonData) => (
            <PokeCard key={pokemonData.name} data={pokemonData} />
          ))}
      </section>
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
    </>
  );
};

export default Home;
