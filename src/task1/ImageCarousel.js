import React, { useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import Spinner200 from "../svgs/Spinner200.svg"

const ImageCarousel = ({ imgs }) => {
    const [currImgIdx, setImg] = useState(0)

    const nextImg = () => {
        const nextImg = currImgIdx === imgs?.length - 1 ? 0 : currImgIdx + 1
        setImg(nextImg)
    }

    const prevImg = () => {
        const prevImg = currImgIdx === 0 ? imgs?.length - 1 : currImgIdx - 1
        setImg(prevImg)
    }



    return <section className="img-carousel">
        <BsFillArrowLeftCircleFill className="left-arrow" onClick={prevImg} />
        <BsFillArrowRightCircleFill className="rigth-arrow" onClick={nextImg} />
        <div className="img-container">
            {!imgs?.length && <img src={Spinner200} alt='Loading...' />}
            {imgs?.length && <img src={imgs[currImgIdx]} alt="loading img" />}
        </div>
    </section>
};
export default ImageCarousel;
