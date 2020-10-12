import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../hooks";
import api from "../../services/api";

const Details = () => {
  const { enableLoading, disableLoading } = useAppContext();
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    enableLoading();
    api.get(`/${id}`).then((res) => {
      setData(res.data);
      // console.log(res.data);
      disableLoading();
    });
  }, []);

  return (
    <section className="header-details">
      {/* {data && (
        <>
          <p>{data.name}</p>
          <div className="poke-imgs">
            <img
              className="poke-card-img"
              src={data.sprites["front_default"]}
            />
            <img className="poke-card-img" src={data.sprites["back_default"]} />
          </div>
          {data.types.map((type) => (
            <p>{type.type}</p>
          ))}
        </>
      )} */}
    </section>
  );
};

export default Details;
