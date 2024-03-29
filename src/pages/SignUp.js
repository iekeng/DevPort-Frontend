import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { FaGithub } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { useApi } from '../contexts/DevPortApiProvider'
import { useGithubApi } from '../contexts/GithubApiProvider';


const SignUp = () => {
  const githubApi = useGithubApi();
  const api = useApi();

  useEffect(() => {
    githubApi.logout();
  })

  const handleClick = async() => {
    await api.get()
  }

return (
  <>
  <Container>
    <div className='mt-5 flex-grow'>
      <a href={`${process.env.REACT_APP_API_URL}/oauth`} className="mt-5" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Button onClick={handleClick} variant="dark" className='w-100 mt-5'>
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