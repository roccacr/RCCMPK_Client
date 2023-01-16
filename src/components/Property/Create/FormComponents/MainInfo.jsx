import React, { useState } from 'react'

import "./mainInfo.scss"

import { FaBed, FaShower, FaParking } from "react-icons/fa"

function MainInfo() {


    const [propType, setPropType] = useState("housing");

    const handlePropType = (e) => {
        setPropType(e.target.value)
    }


    return (
        <div className='container-mainInfo'>
            <div className="mainInfo-radio">
                <h6>Tipo de Propiedad</h6>
                {/* Habitacional */}
                <label htmlFor="housing">
                    <input className='radio-input'
                        type="radio" name="propType" value="housing" id='housing'
                        checked={propType === "housing"}
                        onChange={handlePropType}
                    />
                    Habitacional
                </label>
                {/* Oficinas */}
                <label htmlFor="office">
                    <input className='radio-input'
                        type="radio" name="propType" value="office" id='office'
                        checked={propType === "office"}
                        onChange={handlePropType}
                    />
                    Oficinas
                </label>
                {/* Industrial */}
                <label htmlFor="industrial">
                    <input className='radio-input'
                        type="radio" name="propType" value="industrial" id='industrial'
                        checked={propType === "industrial"}
                        onChange={handlePropType}
                    />
                    Industrial
                </label>
                {/* Comercial */}
                <label htmlFor="commercial">
                    <input className='radio-input'
                        type="radio" name="propType" value="commercial" id='commercial'
                        checked={propType === "commercial"}
                        onChange={handlePropType}
                    />
                    Comercial
                </label>
                {/* Terreno */}
                <label htmlFor="land">
                    <input className='radio-input'
                        type="radio" name="propType" value="land" id='land'
                        checked={propType === "land"}
                        onChange={handlePropType}
                    />
                    Terreno
                </label>
            </div>
            <hr />
            <div className="mainInfo-category">
                <h6>Categoría</h6>
                <select>
                    <option value="Cat1">Categoría 1</option>
                    <option value="Cat2">Categoría 2</option>
                    <option value="Cat3">Categoría 3</option>
                    <option value="Cat4">Categoría 4</option>
                </select>
                <h6>Uso del Inmueble</h6>
                <select>
                    <option value="Cat1">Alquiler</option>
                    <option value="Cat2">Venta</option>
                    <option value="Cat3">Eventos</option>
                </select>
            </div>
            <hr />
            <div className="mainInfo-info">
                <div className="info-general">
                    <label htmlFor="title">Titulo</label>
                    <input type="int" placeholder='Titulo' name='title' />
                    <label htmlFor="price">Precio</label>
                    <input type="int" placeholder='Precio' name='price' />
                </div>
                <div className="info-textArea">
                    <label htmlFor="desc">Descripción</label>
                    <textarea placeholder='Descripción' name='desc'>
                    </textarea>
                </div>
                <div className="info-interior-spaces">
                    <label htmlFor="bedrooms"> # Cuartos <FaBed /></label>
                    <input type="int" placeholder='Cuartos' name='bedrooms' />
                    <label htmlFor="bedrooms"> # Baños <FaShower /></label>
                    <input type="int" placeholder='Baños' name='bathrooms' />
                    <label htmlFor="bedrooms"> # Parqueo <FaParking /></label>
                    <input type="int" placeholder='Parqueos' name='parking' />
                </div>
            </div>
        </div>
    )
}

export default MainInfo