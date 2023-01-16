import React, { useState } from 'react'

import "./propertyInfo.scss"

const PropertyInfo = () => {

    const [propType, setPropType] = useState("new");

    const handlePropType = (e) => {
        setPropType(e.target.value)
    }

    return (
        <div className='container-mainInfo'>
            <div className="mainInfo-radio">
                <h6>Condición de la Propiedad</h6>
                {/* Nueva */}
                <label htmlFor="new">
                    <input className='radio-input'
                        type="radio" name="propType" value="new" id='new'
                        checked={propType === "new"}
                        onChange={handlePropType}
                    />
                    Nueva
                </label>
                {/* Remodelada */}
                <label htmlFor="remodeled">
                    <input className='radio-input'
                        type="radio" name="propType" value="remodeled" id='remodeled'
                        checked={propType === "remodeled"}
                        onChange={handlePropType}
                    />
                    Remodelada
                </label>
                {/* Para Remodelar */}
                <label htmlFor="toRemodel">
                    <input className='radio-input'
                        type="radio" name="propType" value="toRemodel" id='toRemodel'
                        checked={propType === "toRemodel"}
                        onChange={handlePropType}
                    />
                    Para Remodelar
                </label>
                {/* Para Desarrollar */}
                <label htmlFor="toDevelop">
                    <input className='radio-input'
                        type="radio" name="propType" value="toDevelop" id='toDevelop'
                        checked={propType === "toDevelop"}
                        onChange={handlePropType}
                    />
                    Para Desarrollar
                </label>
            </div>
            <hr />
            <div className="mainInfo-build-properties">
                <label htmlFor="year">Año de Construcción</label>
                <input type="int" placeholder='2023' name="year" />
                <label htmlFor="size">Tamaño M²</label>
                <input type="int" placeholder='150' name="size" />
                <label htmlFor="width">Ancho</label>
                <input type="int" placeholder='15' name="width" />
                <label htmlFor="length">Largo</label>
                <input type="int" placeholder='10' name="length" />
            </div>
            <hr />
            <div className="mainInfo-build-details">
                <div className="develop-details">
                    <label htmlFor="constructorCompany">Constructora</label>
                    <input type="int" placeholder='Desarrolladora ABC' name='constructorCompany' />
                    <label htmlFor="engineer">Ingeniero</label>
                    <input type="int" placeholder='Ing Ejemplo # 1' name='engineer' />
                    <label htmlFor="architect">Arquitecto</label>
                    <input type="int" placeholder='Arch Ejemplo # 1' name='architect' />
                </div>
                <hr />
                <div className="info-location">
                    <div className="info-location-details">
                        <label htmlFor="country"> País </label>
                        <input type="text" placeholder='Costa Rica' name='country' />
                        <label htmlFor="estate"> Provincia </label>
                        <input type="text" placeholder='San José' name='estate' />
                        <label htmlFor="city"> Cantón </label>
                        <input type="text" placeholder='Santa Ana' name='city' />
                        <label htmlFor="district"> Distrito </label>
                        <input type="text" placeholder='Santa Ana' name='district' />
                        <label htmlFor="details"> Detalle </label>
                        <input type="text" placeholder='Santa Ana' name='details' />
                    </div>
                    <div className="info-map-location">
                        <label htmlFor="map-location"> Ubicación Geográfica.</label>
                        <textarea name="map-location" id="" rows="10">
                            Aquí íría el componente de mapa.
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyInfo