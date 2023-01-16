import React, { useState } from 'react'

//Importamos los estilos.
import "./images.scss"

//Importamos los iconos.
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Images = (imgArray) => {

    const imageArray = imgArray.imgArray
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <div className="carousel">
            <div className="carouselInner"
                style={{backgroundImage: `url(${imageArray[currentImage].url})`}} >
                <div className="left"
                    onClick={() => { currentImage > 0 && setCurrentImage(currentImage - 1) }}>
                    {currentImage > 0 ? (<ArrowBackIosIcon style={{ fontSize: 30 }} />) : ("")}
                </div>
                <div className="center">
                </div>
                <div className="right"
                    onClick={() => { currentImage < imageArray.length - 1 && setCurrentImage(currentImage + 1) }}>
                    {currentImage !== imageArray.length - 1 ? (<ArrowForwardIosIcon style={{ fontSize: 30 }} />) : ("")}
                </div>
            </div>
        </div>
    )
}

export default Images