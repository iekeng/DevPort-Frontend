import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'


const LandingPage = () => {
  
  return (
    <>
      <Container className='mb-5'>
      <div className='fs2 pt-2'>
            <h1>Elevate Your Profile</h1>
      </div>
      <p className='border p-4'>DevPort streamlines the creation of a professional online portfolio for developers. With seamless GitHub integration, effortless profile setup, stunning design, and security at its core, DevPort empowers you to stand out in the tech world. Join DevPort and unlock your full potential in just a few clicks.</p>
      <div className='pt-4'>
        <h1>How it Works</h1>
      </div>
      <p className='border p-4'>Click the Get Started button, you'll be redirected to authenticate with your GitHub account.
       On successful authentication, you're redirected to the portfolio page where you fill in your details, when you're done,
       click Generate CV on the navigation bar and you'll be presented with a button to download a PDF copy of your newly created portfolio.
       </p>
      <Link to="/SignUp" ><Button variant="dark" className="mb-5 w-100">Get Started</Button></Link>
      </Container>
    </>
  )
}

export default LandingPage;