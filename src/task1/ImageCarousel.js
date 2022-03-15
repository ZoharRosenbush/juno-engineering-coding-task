import React, { useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import Spinner200 from "../svgs/Spinner200.svg"

const ImageCarousel = ({ imgs }) => {
    const [currImgIdx, setImg] = useState(0)
    const imgsLength = imgs?.length

    const nextImg = () => {
        const nextImg = currImgIdx === imgsLength - 1 ? 0 : currImgIdx + 1
        setImg(nextImg)
    }

    const prevImg = () => {
        const prevImg = currImgIdx === 0 ? imgsLength - 1 : currImgIdx - 1
        setImg(prevImg)
    }



    return <section className="img-carousel">
        <BsFillArrowLeftCircleFill className="left-arrow" onClick={prevImg} />
        <BsFillArrowRightCircleFill className="rigth-arrow" onClick={nextImg} />
        <div className="img-container">
            {!imgsLength && <img src={Spinner200} alt='Loading...' />}
            {imgsLength && <img src={imgs[currImgIdx]} alt="loading img" />}
        </div>
    </section>
};
export default ImageCarousel;
