import React, { useState } from 'react'
import { Carousel, Col } from 'react-bootstrap';

//Importamos los iconos.
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CarouselComponent = (imgArray) => {

    const imageArray = imgArray.imgArray
    //const [currentImage, setCurrentImage] = useState(0);

    return (
        <Col sm={12}>
            <Carousel style={{ height: "700px", }} >
                {imageArray.map((image, index) => {
                    return (
                        <Carousel.Item key={index} interval={1000}>
                            <img src={image}
                                className="d-block w-100"
                                style={{
                                    height: "700px",
                                    objectFit: "cover",
                                }} />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </Col >
        /*
        <div className="carousel">
            <div className="carouselInner"
                style={{backgroundImage: `url(${imageArray[currentImage]})`}} >
                    {console.log(imageArray[currentImage])}
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
        </div>*/

    )
}

export default CarouselComponent