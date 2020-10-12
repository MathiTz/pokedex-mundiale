import React from "react";
import { useAppContext } from "../../hooks";

import "./style.css";

const Overlay = () => {
  const { loading } = useAppContext();

  return (
    <>
      {loading && (
        <div className="overlay-blur">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

export default Overlay;
