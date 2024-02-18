import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header'
import Container from 'react-bootstrap/Container';
import { FaGithub } from "react-icons/fa";
import { Button } from 'react-bootstrap';

const SignUp = () => {

return (
  <>
  <Container>
    <div className='mt-5 flex-grow'>
      <a href="http://localhost:4000/oauth" className="mt-5" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button variant="dark" className='w-100 mt-5'>
          <FaGithub size={25} /> 
        </Button>
      </a>
    </div> 
    <div className='text-center fs-6'>Authorize Github</div>
  </Container>
  </>
);
};

export default SignUp;