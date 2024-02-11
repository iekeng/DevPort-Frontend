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

const PortfolioPage = () => {
  const [sectionNum, setSectionNum] = useState(1);
  const [experienceSectionNum, setExperienceSectionNum] = useState(1);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const now = (step / 4) * 100;

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
    const requestToken = async (code, state) => {
      let response
      try {
        response = await axios.get(`http://localhost:4000/oauth/callback?code=${code}&state=${state}`);
      } catch (error) {
        console.error(error);
      }
      return response;
    }

    const handleGithubCallback = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code')
      const state = urlParams.get('state')
      
      const response = await requestToken(code, state);
      localStorage.setItem('accessToken', response.data.token)
    };

    handleGithubCallback();
  }, []);

  const handleAddSection = () => {
    setSectionNum(sectionNum + 1);
  };

  return (
    <>
      <Header loggedIn/>
      { localStorage.getItem('accessToken') ?
      <>
      <Container>
          <ProgressBar className="mb-2" now={now} label={`${Math.trunc(now)}%`}/>
          {step === 1 && [...Array(sectionNum).keys()].map((_, index) => (
            <PersonalDetails key={index} />
          ))}
          { step === 2  && [...Array(sectionNum).keys()].map((_, index) => (
            <Education key={index} />
          ))}
           {step === 3 && [...Array(experienceSectionNum).keys()].map((_, index) => (
             <Experience key={index} />
          ))}
          {!(step % 2) ? 
          <Button className="ms-2 mb-2" onClick={handleAddSection}>
            <Plus size={20} />
          </Button> : <></> }
          { step > 2 ?
          <Button className="ms-2 mb-2" onClick={() => setExperienceSectionNum(experienceSectionNum + 1)}>
            <Plus size={20} />
          </Button> : <></>}
          <div className="d-flex justify-content-between">
          {step > 1 && (
            <Button className="mb-4"  variant="secondary" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button className="mb-4" variant="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button className="mb-4" variant="primary" type="submit">
              Submit
            </Button>
          )}
        </div>
      </Container> 
      <Footer />
      </>:
      <>
      <div>
        <Spinner />
        <Footer fixed />
      </div>
      </>
      }
      
    </>
  );
};

export default PortfolioPage;
