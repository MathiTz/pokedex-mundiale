import React, { createContext, useState } from "react";
import { useContext } from "react";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const favorites = localStorage.getItem("@PokeApi:favorite");

    if (favorites) {
      return JSON.parse(favorites);
    }

    return [];
  });

  async function addFavorite(id) {
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);

    localStorage.setItem("@PokeApi:favorite", JSON.stringify(newFavorites));
  }

  async function removeFavorite(id) {
    const favoritesFiltered = favorites.filter((favorite) => favorite !== id);

    setFavorites(favoritesFiltered);
    localStorage.setItem(
      "@PokeApi:favorite",
      JSON.stringify(favoritesFiltered)
    );
  }

  const checkIfItsFavorite = (id) => {
    const findId = favorites.find((favorite) => favorite === id);

    if (findId) return true;

    return false;
  };

  const handleFavorite = (id) => {
    const check = checkIfItsFavorite(id);

    if (check) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        checkIfItsFavorite,
        handleFavorite,
        favorites,
        loading,
        enableLoading,
        disableLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useAppContext() {
  const context = useContext(AppContext);

  return context;
}

export { AppProvider, useAppContext };
