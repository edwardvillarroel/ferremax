
import {Button, Container, Form} from 'react-bootstrap';
import './InicioPage.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const InicioPage = () => {
    
    const [showPassword, setPasword] = useState(false);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();

    const paswordShow = () => setPasword(!showPassword);
    ;

    const handleglogin=(e)=>{
      e.preventDefault();

      const userSaved = JSON.parse(localStorage.getItem('usuario'));

      if(!userSaved){
        Swal.fire({
        icon: 'error',
        title: 'Usuario no encontrado',
      });
      return;
      }

      if(!userSaved.email === email && userSaved.password === password){
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem('token', token);

        const esAdmin = email === 'admin@admin.com';
        localStorage.setItem('rol', esAdmin ? 'admin' : 'cliente');

        Swal.fire({
        icon: 'success',
        title: `¡Bienvenido ${esAdmin ? 'administrador' : userSaved.nombre}!`,
      }).then(() => {
        navigate(esAdmin ? '/admin' : '/');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Credenciales incorrectas',
        text: 'Correo o contraseña inválidos',
      });
     }
    }

    return(
    <Container className="div-contenedor">
        <div className="formulario-custom">
          <Form onSubmit={handleglogin}>
            <Form.Group className="mb-3" controlId="formEmail">
            <h3>¿Ya tienes una cuenta con nosotros?</h3>
            <p>Si ya tienes una cuenta, inicia sesión con tu correo electrónico y contraseña.</p>
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control 
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e)=> setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCheckbox">
            <Form.Check 
            type="checkbox" 
            label="Mostrar contraseña"
            onChange={paswordShow} />
            </Form.Group>
            <Button className='buttonInicio' type="submit">Iniciar Sesión</Button>
          </Form>
        </div>
    
        <div className="formulario-custom2">
          <Form>
            <Form.Group className="mb-3" controlId="">
            <h4>Clientes Nuevos</h4>
            <p>Si ya tienes una cuenta, inicia sesión con tu correo electrónico y contraseña.</p>
            </Form.Group>
            <Button className='buttonLog' variant="primary" type="submit" as={Link} to="/registro">
            Crear una Cuenta
            </Button>
          </Form>
        </div>
    </Container>
    );
}

export default InicioPage;