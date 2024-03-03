import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import { useApi } from '../contexts/DevPortApiProvider';
import { useGithubApi } from '../contexts/GithubApiProvider';

const PortfolioPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApi();
  const githubApi = useGithubApi();
  const navigate = useNavigate();
  
  const handleClick = () => {
    return navigate('/PersonalDetailsPage')
  }

  useEffect(() => {
    const handleGithubCallback = (async () => {
      const queryString = window.location.search;
      const response = await api.get('/oauth/callback', queryString);
      console.log(response)
      if(response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        setIsAuthorized(true);
        githubApi.isAuthenticated ? console.log(localStorage.getItem('accessToken')) : console.log('nay');
      } else {
        return navigate('/SignUp')
      }
    })();

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 4800);

    return () => clearTimeout(timeout);

  }, [api, githubApi, navigate]);


  return (
    <>
    <Container>
    {(githubApi.isAuthenticated && isAuthorized) ?
      <div className='mt-5 flex-grow'>
        <Button variant="dark" className='w-100 mt-5' onClick={handleClick} disabled={isLoading}>
          Proceed 
        </Button>
      </div>:
      <div className='text-center mt-5'>
         <Spinner />
      </div>
    }
    </Container>
  </>
  );
};

export default PortfolioPage;
