import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import PokeDetail from "../../components/PokeDetail";
import { useAppContext } from "../../hooks";
import api from "../../services/api";

import "./style.css";

import { FaChevronLeft } from "react-icons/fa";

const Details = () => {
  const history = useHistory();
  const { enableLoading, disableLoading } = useAppContext();
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    enableLoading();
    api.get(`/${id}`).then((res) => {
      setData(res.data);
      disableLoading();
    });
  }, []);

  const navegateToHome = () => {
    history.push("/");
  };

  return (
    <section className="details-page">
      <FaChevronLeft className="navigate-icon" onClick={navegateToHome} />
      <section className="header-details">
        {data && <PokeDetail pokemon={data} />}
      </section>
    </section>
  );
};

export default Details;
