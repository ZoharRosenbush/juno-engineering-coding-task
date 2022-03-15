import React, { useState, useEffect } from "react";
import logo from '../logo.svg';
import './App.css';
import ImageCarousel from "./ImageCarousel";
import { fetchImages } from "../api/index.js"

function App() {

  const [imgs, setImgs] = useState(null)

  useEffect(() => {
    getImgs()
  }, [])

  async function getImgs() {
    const imgs = await fetchImages()
    setImgs(imgs)
  }

  return (
    <div>
      <ImageCarousel imgs={imgs} />
    </div>
  );
}

export default App;
