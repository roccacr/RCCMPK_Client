import React, { useState } from 'react'

//Importamos los componentes del formulario.
import MainInfo from './FormComponents/MainInfo';
import PropertyInfo from './FormComponents/PropertyInfo'
import LandInfo from './FormComponents/LandInfo';
import OtherInfo from './FormComponents/OtherInfo';

const Form = () => {
    /**
     * Definimos el useState que estará relacionado con la gestión del contenido a mostrar.
     */
    const [page, setPage] = useState(0);

    const FormTitles = ["Información Principal", "Información de la propiedad", "Información del Terreno", "Otra Información"];

    /**
     * Métodos para avanzar y volver en las páginas.
     */

    const forward = (e) => {
        setPage((currentPage) => currentPage + 1);
    };

    const back = (e) => {
        setPage((currentPage) => currentPage - 1);
    };

    /**
     * Creación la función que se encargará de retornar el contido HTML correspondiente.
     */

    const DisplayFormElement = () => {
        if (page === 0) {
            return <MainInfo />
        }
        else if (page === 1) {
            return <PropertyInfo />
        }
        else if (page === 2) {
            return <LandInfo />
        }
        else {
            return <OtherInfo />
        }
    };

    return (
        <div className="container">

            <div className='form'>
                <div className='form-progressBar'>

                </div>
                <div className='form-container'>
                    <div className="container-up">
                        <h1>{FormTitles[page]}</h1>
                    </div>
                    <div className="container-middle">
                        {DisplayFormElement()}
                    </div>
                    <div className="container-down">
                        <button
                            disabled={page === 0}
                            onClick={back}>
                            Anterior</button>
                        <button
                            disabled={page === FormTitles.length - 1}
                            onClick={forward}>
                            Siguiente
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Form