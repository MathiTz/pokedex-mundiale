import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import PokeCard from "../../components/PokeCard";
import { useAppContext } from "../../hooks";

import "./style.css";

const Favorites = () => {
  const history = useHistory();
  const { favorites } = useAppContext();

  const navegateHome = () => {
    history.push("/");
  };

  return (
    <section className="header-favorites">
      <FaChevronLeft className="navigate-home" onClick={navegateHome} />
      <h1 className="title">Favorites</h1>
      <main className="poke-cards">
        {favorites.length ? (
          favorites.map((favorite) => <PokeCard pokemonId={favorite} />)
        ) : (
          <p className="text-alert">Você não possui nenhum favorito</p>
        )}
      </main>
    </section>
  );
};

export default Favorites;
