import React from 'react'
import moment from "moment";
import { Link } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs'

//Importamos la hoja de diseño css
import "./listing.scss"

//Importamos los componentes requeridos.
import Images from "./Images.jsx"

//Importamos los iconos.
import ShowerIcon from '@mui/icons-material/Shower';
import BedIcon from '@mui/icons-material/Bed';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';

const Listing = ({ property }) => {

    const imgArray = property.propertyImages.imageUrl;
    return (
        <div className='property'>
            <div className="up">
                {
                    <Images imgArray={imgArray} />
                }
            </div>
            <div className="down">
                <div className="price">
                    <h3>${property.price}</h3>
                </div>
                <div className="mainInfo">
                    <ShowerIcon /> <span>{property.buildDetails.bathrooms} |</span >
                    <BedIcon /> <span>{property.buildDetails.bedrooms} | </span>
                    <DirectionsCarIcon /><span>{property.buildDetails.parking} | </span>
                    <StraightenOutlinedIcon /><span>{property.propertyLand?.landSize} m²</span>
                </div>
                <div className="otherInfo">
                    <span> Published: {moment(property.createdAt).fromNow()} </span>
                    <button>
                        <Link to={`/property/details/${property.id}`}>
                            <h6> <BsEyeFill /> Ver</h6>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Listing