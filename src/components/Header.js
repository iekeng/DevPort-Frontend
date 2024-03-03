import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { FaGhost } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';

export default function Header({loggedIn}) {
  const [userProfile, setUserProfile] = useState(null);

    return (
        <Navbar bg="light" expand="lg" className='mb-4'>
        <Container>
          <Navbar.Brand href="/">
            <h1>DevPort</h1>
          </Navbar.Brand>
          <Nav>
            { loggedIn ? 
            <Image src={userProfile} roundedCircle /> :
            <Nav.Link as={NavLink} to="/SignUp"><FaGhost size={25}/></Nav.Link>    
            }
          </Nav>
        </Container>
      </Navbar>
    )
}