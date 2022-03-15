import React, { useState, useEffect } from "react";
import ImgsNotFound from "../svgs/ImgsNotFound.svg"
import './App.css';
import ImageCarousel from "./ImageCarousel";
import { fetchImages } from "../api"

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
      {imgs?.length === 0 && <div className="no-results">
        <h1> Sorry, There are no Images to show at this time...</h1>
        <div className="img-container">
          <img src={ImgsNotFound} alt="Your browser does not support SVG" />
        </div>
      </div>}
      < ImageCarousel imgs={imgs} />
    </div>
  );
}

export default App;
