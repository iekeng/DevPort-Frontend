import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Education from '../components/Education';
import { FaPlusSquare as Plus }  from "react-icons/fa";
import Footer from '../components/Footer';
import PersonalDetails from '../components/PersonalDetails';
import Experience from '../components/Experience';
import Spinner from 'react-bootstrap/Spinner'
import { useApi } from '../contexts/DevPortApiProvider';

const PortfolioPage = () => {
  const [sectionNum, setSectionNum] = useState(1);
  const [experienceSectionNum, setExperienceSectionNum] = useState(1);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const now = (step / 4) * 100;
  const api = useApi()

  const handleNext = () => {
    setStep(step + 1);
  };
 
  const handlePrevious = () => {
    setStep(step - 1);
  };

  // const handleSectionChange = (nextSection) => {
  //   // Logic for handling section change
  // };

  useEffect(() => {
    // const requestToken = async (url) => {
    //   let response
    //   try {
    //     response = await axios.get(url);
    //     console.log(response)
    //   } catch (error) {
    //     console.error(error);
    //   }
    //   return response;
    // }

    const handleGithubCallback = async () => {
      // const queryString = window.location.search;
      const response = await api.get('/users/65ca89143ca77c1b21c8cab0')
      // console.log('querystring: ', queryString)
      // const base_url = 'http://localhost:4000/oauth/callback';
      // console.log('URl: ', base_url + queryString)
      // const urlParams = new URLSearchParams(queryString);
      // const code = urlParams.get('code')
      // const state = urlParams.get('state')
      // let url = base_url + queryString
      console.log(response.data)
      // const response = await requestToken(url);
      // localStorage.setItem('accessToken', response.data.token);      
    };

    handleGithubCallback();
  }, [api]);

  const handleAddSection = () => {
    setSectionNum(sectionNum + 1);
  };

  return (
    <>
      { localStorage.getItem('accessToken') ?
      <>
        <Container>
          <ProgressBar className="mb-2" now={now} label={`${Math.trunc(now)}%`}/>
          {step === 1 && [...Array(sectionNum).keys()].map((_, index) => (
            <PersonalDetails key={index} step={step}/>
          ))}
          { step === 2  && [...Array(sectionNum).keys()].map((_, index) => (
            <Education key={index} step={step}/>
          ))}
           {step === 3 && [...Array(experienceSectionNum).keys()].map((_, index) => (
             <Experience key={index} step={step}/>
          ))}
          {!(step % 2) ? 
          <Button className="ms-2 mb-2" onClick={handleAddSection}>
            + Add Section
          </Button> : <></> }
          { step > 2 ?
          <Button className="ms-auto p-2" onClick={() => setExperienceSectionNum(experienceSectionNum + 1)} style={{background: 'none', border: 'none', color: 'black'}}>
            + Add Section
          </Button> : <></>}
          <div className="d-flex justify-content-around">
          {step > 1 && (
            <Button className="mb-4" style={{background: 'none', border: 'none', color: 'black'}} onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button className="mb-4 mt-4" variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button className="mb-4 mt-4" variant="primary" type="submit">
              Submit
            </Button>
          )}
        </div>
        </Container> 
      </>:
      <>
        <div className="text-center">
          <Spinner />
        </div>
      </>
      }
      
    </>
  );
};

export default PortfolioPage;
