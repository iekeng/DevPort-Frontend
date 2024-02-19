import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Footer from './Footer';
import InputField from './InputField';
import Header from './Header';
import MultiFields from './MultiFields';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaTwitter, FaLinkedin,  } from "react-icons/fa";
import { useApi } from '../contexts/DevPortApiProvider';

const PersonalDetails = ({ onSubmit }) => {

  const nameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const twitterRef = useRef()
  const linkedInRef = useRef()
  const api = useApi

  

// const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     socials: {
//         twitter: '',
//         linkedIn: '',
//     },
// });

// const [isEditing, setIsEditing] = useState(false);

// useEffect(() => {
//     fetchPersonalDetailsFromGitHub();
// }, []);

// const fetchPersonalDetailsFromGitHub = async () => {
//     // Get access token from localStorage
//     const accessToken = localStorage.getItem('accessToken');

//     if (accessToken !== null) {
//     // Use the access_token here
//     console.log('Access token:', accessToken);
//     } else {
//     console.log('Access token not found in localStorage.');
//     }

//     try {
//         // Fetch personal details from GitHub API
//         const userUrl = 'https://api.github.com/user';

//         const response = await axios.get(userUrl, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         if (response.status === 200) {
//             const userData = response.data;
            
//             setFormData({
//                 name: userData.name,
//                 email: userData.email,
//                 phone: userData.phone,
//                 socials: {
//                     twitter: userData.twitter_username,
//                     linkedIn: userData.blog,
//                 },
//             });
//         }
//     } catch (error) {
//         console.error('Error fetching personal details from GitHub', error);
//     }
// };

// const handleSavePersonalDetails = () => {
//     const updatePersonalDetailsApiUrl = 'http://localhost:4000/users';

//     // Prepare the data to send to the API
//     const updatedDetails = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         socials: {
//             ...formData.socials,  // Preserve the existing socials using the spread operator
//             linkedIn: formData.socials.linkedIn,
//         },
//     };

//     // POST personal details to DB
//     axios
//         .post(updatePersonalDetailsApiUrl, updatedDetails)
//         .then((response) => {
//             console.log(response);
//             if (response.status === 201) {
//                 console.log('Personal details updated successfully');
//                 // Get userId from userData
//                 const userId = response.data._id.toString();
//                 // Save userId to localStorage
//                 localStorage.setItem('userId', userId);
//                 console.log('userId:', userId);
//                 setIsEditing(false); // Turn off editing mode
//             } else {
//                 console.error('Failed to update personal details');
//             } onSave('Education');
//         })
//         .catch((error) =>{
//             console.error('Error updating personal details', error);
//         });
// };

// const handleEditClick = () => {
//     setIsEditing(true);
// };

// const handleSaveClick = () => {
//     handleSavePersonalDetails();
// };

  return (
    <>
      //Force email to lower case in the form
      <h5>Details</h5>
      <Form className="border border-gray-600 p-4 mb-3">
        <InputField name="name" label="Full Name" placeholder="Last Name, First Name" fieldRef={nameRef} />
        <InputField name="email" label="Email" type="email" placeholder="Email Address" fieldRef={emailRef} />
        <InputField name="phone" label="Phone" type="text" placeholder="Phone Number" fieldRef={phoneRef} />
        <Row>
          <Col>
            <InputField name="twitter" label={<FaTwitter size={20}/>} placeholder={"X handle"} fieldRef={twitterRef} />
          </Col>
          <Col>
            <InputField name="linkedin" label={<FaLinkedin size={20}/>} placeholder="LinkedIn URL" fieldRef={linkedInRef} />
          </Col>
        </Row>
      </Form>
      <h5>Soft Skills</h5>
      <MultiFields name="soft" />
      <h5>Technical Skills</h5>
      <MultiFields name="technical" />

    </> 
    );
};

export default PersonalDetails;
