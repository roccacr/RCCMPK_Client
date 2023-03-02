import React from 'react'
import { Link } from 'react-router-dom'

const Config = () => {
    return (
        <div className="location">
            <h3> General </h3>
            <div className="type">
                <Link to={"/admin/config/currency"}>Moneda</Link>
            </div>
            <h3> General </h3>
            <div className="type">
                <Link to={"/admin/location/country"}>País</Link>
            </div>
            <div className="type">
                <Link to={"/admin/location/estate"}>Estado</Link>
            </div>
            <div className="type">
                <Link to={"/admin/location/city"}>Ciudad</Link>
            </div>
            <div className="type">
                <Link to={"/admin/location/district"}>Distrito</Link>
            </div>
            <h3> Propiedades </h3>
            <div className="type">
                <Link to={"/admin/property/type"}>Tipos</Link>
            </div>
            <div className="subType">
                <Link to={"/admin/property/subType"}>SubTipos</Link>
            </div>
            <div className="use">
                <Link to={"/admin/property/use"}>Usos</Link>
            </div>
            <div className="condition">
                <Link to={"/admin/property/condition"}>Condiciones</Link>
            </div>
            <div className="condition">
                <Link to={"/admin/property/amenity"}>Amenidades</Link>
            </div>
            <div className="condition">
                <Link to={"/admin/property/attribute"}>Características</Link>
            </div>
            <div className="condition">
                <Link to={"/admin/property/topography"}>Topografía de Suelo</Link>
            </div>
        </div>
    )
}

export default Config