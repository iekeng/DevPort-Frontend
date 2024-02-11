import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { FaGhost } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Header({loggedIn}) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      //fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const response = await axios.get('https://api.github.com/user', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log(response.data)
                const { login, avatar_url, name } = response.data;
                setUserProfile({ avatar_url });
            }
        }

        setLoading(false);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
    }
  };
    return (
        <Navbar bg="light" expand="lg" className='mb-1'>
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