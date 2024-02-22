import React, { useState, useEffect, useRef } from 'react';
import InputField from '../components/InputField';
import MultiFields from '../components/MultiFields';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';

import { FaTwitter, FaLinkedin,  } from "react-icons/fa";
import { useApi } from '../contexts/DevPortApiProvider';
import { useGithubApi } from '../contexts/GithubApiProvider';

const PersonalDetailsPage = () => {
  const api = useApi();
  const githubApi = useGithubApi();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const twitterRef = useRef();
  const linkedInRef = useRef();
  const summRef = useRef();

const [formData, setFormData] = useState({});
const [isLoading, setIsLoading] = useState(true);

// const [isEditing, setIsEditing] = useState(false);

useEffect(() => {
  let response;
  const fetchPersonalDetailsFromGitHub = async() => {
    setIsLoading(true);
    if (githubApi.isAuthenticated) {
      try {
        response = await githubApi.get('/user');
        let data = response.data;
        let temp = {
          name: data.name,
          email: data.email,
          summary: data.bio || '',
          socials: {
            twitter: data.twitter_username || '',
            linkedIn: data.blog || '',
            github: data.html_url,
          },
          phone: data.phone || '',
          avatar_url: data.avatar_url || '',
          location: data.location || '',
        }
        setFormData(temp);
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
        if (formData){
          console.log(formData)
        }
      }
    }
   }


  // const save =  async() => {
  //   userData = await fetchPersonalDetailsFromGitHub();
  //   console.log(JSON.stringify(userData))
  //   // const response = await api.post('/users', userData)    
  //   // const userId = response.data._id.toString();
  //   // localStorage.setItem('userId', userId);
  // }

  // const fetch = async () => {
  //   const userId = localStorage.getItem('userId')
  //   const response = api.get(`/users/${userId}`)
  //   setFormData(response.data)
  // }
  // save();
  // // fetch();
  fetchPersonalDetailsFromGitHub();
 }, [githubApi]);



// const handleSavePersonalDetails = async (data) => {
//   let response;

//   try{
//     response = await api.post('/users', data);
//     console.log(response)
   
//     // setIsEditing(false);
   
//   } catch(error){
//     console.error('Error updating personal details', error);
//   }
// };

// const handleEditClick = () => {
//     // setIsEditing(true);
// };

// const handleSaveClick = () => {
//     handleSavePersonalDetails();
// };

  return (
    <>
      //Force email to lower case in the form
      <h5>Details</h5>
      <Form className="border border-gray-600 p-4 mb-3">
        <InputField name="name" label="Full Name" placeholder="Last Name, First Name" value={formData.name}/>
        <InputField  name="summary" as="textarea" label="Summary" placeholder="Personal Summary" rows={3} value={formData.summary}/>
        <Row>
          <Col>
            <InputField name="email" label="Email" type="email" placeholder="Email Address" value={formData.email}/>
          </Col>
          <Col>
            <InputField name="phone" label="Phone" type="text" placeholder="Phone Number" value={formData.phone}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputField name="twitter" label={<FaTwitter size={20}/>} placeholder={"X handle"} />
          </Col>
          <Col>
            <InputField name="linkedin" label={<FaLinkedin size={20}/>} placeholder="LinkedIn URL" />
          </Col>
        </Row>
      </Form>
      <h5>Soft Skills</h5>
      <MultiFields name="soft" />
      <h5>Technical Skills</h5>
      <MultiFields name="technical" />
      <Button className="mb-4 mt-4 me-4" variant="primary">
        Next
      </Button>
    </> 
    );
};

export default PersonalDetailsPage;
