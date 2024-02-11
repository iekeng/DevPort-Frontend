import React from 'react';
import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = ({ fixed }) => {
  const footerClass = fixed ? 'fixed-bottom' : 'mt-auto';

  return (
    <footer className={`bg-body-tertiary text-center ${footerClass}`}>
      <div className="container p-2">
        <div className="text-center p-2">
          <Link className="text-body" to="/">DevPort</Link> © 2020 Copyright
          <FaGithub className='ms-2' />
          <FaLinkedin className='ms-2' />
          <FaGoogle className='ms-2'/>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
