import React from 'react'
import { Link } from 'react-router-dom'

const Config = () => {
    return (
        <div className="location">
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
                <Link to={"/admin/property/amenity"}>Amenidades (En desarrollo)</Link>
            </div>
            <div className="condition">
                <Link to={"/admin/property/attribute"}>Características (En desarrollo)</Link>
            </div>
        </div>
    )
}

export default Config