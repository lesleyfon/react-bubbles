import React, { useState, useEffect } from "react";
import api from './../utils/api'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(()=>{
    fetchColorData()
  },
  [])
  function fetchColorData(){
    api().get('/api/colors')
      .then(res => {
        setColorList(res.data)
      })
      .catch(err=>{
        throw new Error(err.response)
      })
  }
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
