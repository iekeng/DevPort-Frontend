import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import MultiFields from '../components/MultiFields';
import InputField from '../components/InputField';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';

const ExperiencePage = () => {
    const userId = localStorage.getItem('userId');
    const [isHidden, setIsHidden] = useState(true);
    const [formDataArray, setFormDataArray] = useState([{
        organisation: '',
        position: '',
        startDate: '',
        endDate: '',
        achievements: [], // Store achievements as an array
        responsibilities: [],
        user: userId,
    }]);
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    const toggleDetails = () => {
        setIsHidden(!isHidden);
    };

    const handleNext = () => {
      navigate('/EducationPage');
    }

    const saveWorkDetails = async (data) => {
    //     // Ensure that data.achievements is an array
    //     const splitAchievements = Array.isArray(data.achievements)
    //         ? data.achievements
    //         : data.achievements.split('\n').map(item => item.trim());
    
    //     try {
    //         const postData = {
    //             ...data,
    //             achievements: splitAchievements, // Update the achievements field
    //             user: userId,
    //         };

    //         data.userId = userId;
    //         const response = await axios.post(`http://localhost:4000/experience/${userId}`, data, {});
            
    //         if (response.status === 200) {
    //             console.log('Work details saved successfully');
    //         }
    //         onSave('Projects');
    //     } catch (error) {
    //         console.error('Error saving work details', error);
    //     }
    };

    const handleSaveWorkDetails = async (event) => {
        // event.preventDefault();
        // saveWorkDetails(formData);
        // setIsHidden(true);
        // setIsAdding(false);
    };

    const handleInputChange = (index, e) => {
        const {name, value} = e.target
        let newFormDataArray = [...formDataArray];
        newFormDataArray[index] = {
          ...newFormDataArray[index],
          [name]: value,
        };
        setFormDataArray(newFormDataArray);
      };

    const addAnotherForm = () => {
        setIsAdding(true);
    };

    const cancelAddForm = () => {
        setIsAdding(false);
    };

    const handleSubmit = async () => {
        //get all user experience by id
        // const experiences = await api.get(`/experience/${userId}`)
        // if (!experiences || experiences.length === 0){
        //     //make post
        //     api.post(`/experience/${userId}`, data)
        // } else {
        //     //make put
        //     api.put(`/experience/${userId}`, data)
        // }

    }

    const handleAdd = () => {
        let formData = {
            organisation: '',
            position: '',
            startDate: '',
            endDate: '',
            achievements: [], 
            responsibilities: [],
            user: userId,
        }
        setFormDataArray([...formDataArray, formData])
        console.log(formDataArray.length)
    }

    return (
        <>
        <div className='mb-5 bottom-border'>
        <h5>Work Experience:</h5>
        {formDataArray.map((formData, index) => (
            <div key={index}>
                <Form className="border border-gray-600 p-3 mb-3">
                        <Row>
                            <Col>
                                <InputField name={`organisation-${index}`} label="Organisation" placeholder="Organisation" onChange={e => handleInputChange(index, e)}/>
                            </Col>
                            <Col>
                                <InputField name={`position-${index}`} label="Position" placeholder="Position" onChange={e => handleInputChange(index, e)}/>
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                            <InputField name={`startDate-${index}`} type="date" label="Start Date" placeholder="Start Date" onChange={e => handleInputChange(index, e)}/>
                        </Col>
                        <Col>
                            <InputField name={`endDate-${index}`} type="date" label="End Date" placeholder="End Date" onChange={e => handleInputChange(index, e)}/>
                        </Col>
                        </Row>
                        
                        <p className='mb-0 mt-2'>Achievements:</p>
                        <MultiFields name="achievements" />
                        <p className='mb-0 mt-2'>Responsibilities:</p>
                        <MultiFields name="responsibility"/>
                </Form>
            </div>
        ))
        }
          <Button className="mb-4 mt-4 me-4" variant="primary" onClick={handleAdd}>
            + Add Section
          </Button>
        
        <div className='d-flex mt-5 justify-content-around'>
        <Button   className="mb-4 mt-4 me-4 mb-5" variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button   className="mb-4 mt-4 me-4 mb-5" variant="primary" onClick={handleNext}>
          Next
      </Button>
      </div>
      </div>
        </>
            );
        };
export default ExperiencePage;
 