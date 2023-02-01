/**
 * Componente para crear tabla con la lista de amenidades.
 */

//Importamos las bibliotecas necesarias.
import React from 'react';
import { Link } from 'react-router-dom';

//Insertamos los archivos necesarios.
import { makeRequest } from '../../../config/axios';
import { serverRoutes } from '../../../config/config';

const Amenity = ({ amenity }) => {
    const handleDelete = async (id) => {
        try {
            const use = await makeRequest.delete(`${serverRoutes.deletePropertyAmenity}/${id}`);
            if (use.data === 1) {
                alert("Registro eliminado correctamente.")
            };
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <tbody>
            <tr>
                <td> {amenity.id}</td>
                <td> {amenity.name}</td>
                <td> {amenity.code}</td>
                <td> {amenity.description}</td>
                <td>
                    <button><Link to={`/admin/property/amenity/update/${amenity.id}`}>Editar</Link></button>
                    <button onClick={() => handleDelete(amenity.id)}>Borrar</button>
                </td>
            </tr>
        </tbody>
    )
}

export default Amenity