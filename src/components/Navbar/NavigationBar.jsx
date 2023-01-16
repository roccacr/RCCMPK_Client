import React, { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AuthContext } from '../../context/authContext';


import "./navigationBar.scss";
import { BsFillHouseFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';




const NavigationBar = () => {
    const { currentUser, logout } = useContext(AuthContext);

    const handleLogout = async (e) => {
        e.preventDefault();
        try{
            const res = await logout();
            console.log(res);
            //navigate("/")
        }catch (err){
            console.log(err);
        }
    }

    return (
        <Navbar bg="light" expand="lg" className='navigationBar'>
            <Container className='navigationBar-Container'>
                <Navbar.Brand href="/" className='navigationBar-logo'>RCCMKP <BsFillHouseFill /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto navigationBar-items">
                        {/* Gestión Propiedades */}
                        <NavDropdown title="Propiedad" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/1.1">Venta</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.2">Compra</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.3">Alquiler</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/property/create">Publicar</NavDropdown.Item>
                        </NavDropdown>
                        {/* Gestión Proyectos */}
                        <NavDropdown title="Proyectos" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/2.1">Residencial</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.1">Oficentro</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.1">Industrial</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.1">Zona Franca</NavDropdown.Item>
                        </NavDropdown>
                        {/* Gestión Acabados */}
                        <NavDropdown title="Acabados" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        {/* Gestión Servicios */}
                        <NavDropdown title="Servicios" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        {/* Gestión Empleos */}
                        <NavDropdown title="Empleos" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        {/* Gestión Mobiliario */}
                        <NavDropdown title="Mobiliario" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        {/* Gestión Inversionistas */}
                        <NavDropdown title="Inversionistas" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        {/* Gestión Insights */}
                        <NavDropdown title="Insights" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        {/* Gestión Galeria */}
                        <NavDropdown title="Galeria" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        {/* Gestión Financiamiento */}
                        <NavDropdown title="Financiamiento" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <div className="navigationBar-loginInfo">
                            {currentUser //Validamos si el usuario está activo.
                                //Si está activo.
                                ? <NavDropdown title={<FaUser />} id="">
                                    <NavDropdown.Item href="/administration/">Administración</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Salir
                                    </NavDropdown.Item>
                                </NavDropdown>
                                //No está activo
                                : <button className='loginInfo-butoon'>
                                    <Link to="/login"> Iniciar </Link>
                                </button>
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar