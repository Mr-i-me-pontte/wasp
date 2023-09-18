import React from "react";
import './styles.scss'
const Iframe = ({url}) => {
  return (
      <iframe src={url} frameBorder="0" className="Iframe"/>
  );
};

export default Iframe;