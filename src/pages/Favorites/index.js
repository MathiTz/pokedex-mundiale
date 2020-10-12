import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import PokeCard from "../../components/PokeCard";
import { useAppContext } from "../../hooks";
import api from "../../services/api";

import "./style.css";

const Favorites = () => {
  const history = useHistory();
  const { favorites } = useAppContext();
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    favorites.map((favorite) => {
      api.get(`/${favorite}`).then((res) => {
        console.log(res.data);
      });
    });
  }, []);

  console.log(favorites);

  const navegateHome = () => {
    history.push("/");
  };

  return (
    <>
      {pokemons.length ? (
        pokemons.map((pokemon) => (
          <section className="header-favorites">
            <FaChevronLeft onClick={navegateHome} />
            <PokeCard data={pokemon} />
          </section>
        ))
      ) : (
        <section className="header-favorites">
          <FaChevronLeft onClick={navegateHome} />
          <p className="text-alert">Você não possui nenhum favorito</p>
        </section>
      )}
    </>
  );
};

export default Favorites;
