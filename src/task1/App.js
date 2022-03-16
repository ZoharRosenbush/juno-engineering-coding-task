import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import ImgsNotFound from "../svgs/ImgsNotFound.svg"
import ImageCarousel from "./ImageCarousel";
import { fetchImages } from "../api"

function App() {

  const [imgs, setImgs] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const isFirstRender = useRef(true)

  useEffect(() => {
    getImgs()
  }, [])

  useEffect(() => {
    if (isFirstRender.current){
      isFirstRender.current = false
      return
    } 
    setLoading(false)
  }, [imgs])

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
      < ImageCarousel imgs={imgs} isLoading={isLoading} />
    </div>
  );
}

export default App;
