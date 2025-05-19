
import React from "react";
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


function AdminPAge(){
    const navigate = useNavigate();

    const cerrarSesion = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        navigate('/Home');
    }

    return(
    <Container>
      <h1>Panel de Administración</h1>
      <p>Bienvenido, administrador.</p>
      <Button variant="danger" onClick={cerrarSesion}>
        Cerrar sesión
      </Button>
    </Container>
    );
}

export default AdminPAge;