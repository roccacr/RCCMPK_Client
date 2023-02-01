import React from 'react'
import { Link } from 'react-router-dom'

const Location = () => {
    return (
        <div className="location">
            <h3> Ubicación </h3>
            <div className="country">
                <Link to={"/admin/location/country"}>Paises</Link>
            </div>
            <div className="estate">
                <Link to={"/admin/location/estate"}>Estados</Link>
            </div>
            <div className="city">
                <Link to={"/admin/location/city"}>Ciudades</Link>
            </div>
            <div className="district">
                <Link to={"/admin/location/district"}>Distritos</Link>
            </div>
        </div>
    )
}

export default Location