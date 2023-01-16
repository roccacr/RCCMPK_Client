import React from 'react'
import { Link } from 'react-router-dom'

const Location = () => {
    return (
        <div>
            <div className="location">
                <h3> Ubicación </h3>
                <Link to={"/location/country"}>Paises</Link>
                <Link to={"/location/estate"}>Estados</Link>
                <Link to={"/location/city"}>Ciudades</Link>
                <Link to={"/location/district"}>Distritos</Link>
            </div>
        </div>
    )
}

export default Location