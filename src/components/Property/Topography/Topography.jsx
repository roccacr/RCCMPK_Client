/**
 * Componente para crear tabla con lista de ciudades.
 */

//Importamos las bibliotecas necesarias.
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';

//Importamos los archivos necesarios.
import { makeRequest } from '../../../config/axios'
import { serverRoutes } from '../../../config/config'

const Topography = ({ topography }) => {

    const handleDelete = async (id) => {
        try {
            const topography = await makeRequest.delete(`${serverRoutes.deleteLandTopography}/${id}`);
            if (topography.data === 1) {
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
                <td> {topography.id}</td>
                <td> {topography.name}</td>
                <td> {topography.code}</td>
                <td> {topography.description}</td>
                <td>
                    <Button variant="primary" >
                        <Link to={`/admin/property/topography/update/${topography.id}`} style={{ textDecoration: "none", color: "white" }}>Editar</Link>
                    </Button>
                    {' '}
                    <Button variant="danger" onClick={() => handleDelete(topography.id)}>Borrar</Button>
                </td>
            </tr>
        </tbody>
    )
}

export default Topography