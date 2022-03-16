import React, { useState, useRef, useEffect } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs"
import Spinner200 from "../svgs/Spinner200.svg"

const ImageCarousel = ({ imgs, isLoading }) => {
    const [currImgIdx, setImg] = useState(0)
    const scrollContainer = useRef()

    useEffect(() => {
        handleScroll()
    }, [currImgIdx])

    const nextImg = () => {
        const nextImg = currImgIdx === imgs?.length - 1 ? 0 : currImgIdx + 1
        setImg(nextImg)
    }

    const prevImg = () => {
        const prevImg = currImgIdx === 0 ? imgs?.length - 1 : currImgIdx - 1
        setImg(prevImg)
    }

    const handleScroll = () => {
        //55px is the size of the picture + the gap 
        const imgSize = 55
        const destination = imgSize * currImgIdx
        scrollContainer.current.scrollTo({ left: destination, behavior: 'smooth' })
    }

    const getNeighborImgs = () => {
        if (!imgs) return <></>

        return imgs.map((img, idx) => {
            return <div className="img-preview" key={idx}>
                <img src={img} alt="Loading img" onClick={() => { setImg(idx) }} />
            </div>
        })
    }

    return <section className="img-carousel flex column">
        <BsFillArrowLeftCircleFill className="left-arrow" onClick={prevImg} />
        <BsFillArrowRightCircleFill className="rigth-arrow" onClick={nextImg} />
        <div className="img-container">
            {isLoading && <img src={Spinner200} alt='Loading...' />}
            {imgs?.length && <img src={imgs[currImgIdx]} alt="Loading img" />}
        </div>
        <section className="neighbor-imgs flex" ref={scrollContainer}>
            {getNeighborImgs()}
        </section>
    </section>
};
export default ImageCarousel;
