import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useApi } from '../contexts/DevPortApiProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function EducationPage() {
    const api = useApi();
    const apiURL = process.env.REACT_APP_API_URL;
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const [formDataArray, setFormDataArray] = useState([{
        institution: '',
        course: '',
        startDate: '',
        endDate: '',
        location: '',
    }]);

    useEffect(() => {
        const setup = async () => {
          const response = await api.get(`/education/${userId}`);
          const data = response.data.education;
        if (response.statusText === 'OK' && data.length > 0){
          setFormDataArray(response.data.education)
        }
        }
  
        setup();
      }, [])

    const handleInputChange = (i, e) => {
        const { name, value } = e.target;
        let newFormData = {
            ...formDataArray[i],
            [name]: value,
        };
        formDataArray[i] = newFormData;
        setFormDataArray([...formDataArray]);
    };

    const handleSubmit = async() => {
        try{
            if (userId){
                const response = await api.get(`/education/${userId}`);
                if (response.data) {
                    for (const formData of formDataArray) {
                        console.log(formData)
                        if (formData._id){
                            await api.put(`/education/${userId}/${formData._id}`, formData)
                        }
                        await api.post(`/education/${userId}`, formData)
                    }
                }   
            }
        } catch(error) {
            console.log('Error submiting experiences.');
            console.log('Error: ', error);
        }
    }

    const handleAdd = () => {
        let newFormDataArray = [...formDataArray, {
            institution: '',
            course: '',
            startDate: '',
            endDate: '',
            location: '',
        }];

        setFormDataArray(newFormDataArray);
    }

    const handleRemove = async (i) => {
        try {
            const response = await api.get(`/education/${userId}`);
            const result = response.data.education;
            const id = result[i]._id;
            // await axios.delete(`http://localhost:4000/education/${id}`)
            await axios.delete(`${process.env.REACT_APP_API_URL}/education/${id}`)
        } catch (error) {
            console.log('Error: ', error)
        }
        const newFormDataArray = [...formDataArray];
        newFormDataArray.splice(i, 1);
        setFormDataArray(newFormDataArray);
      };
      
    const handleNext = async () => {
        //todo
        navigate('/CVPreviewPage')
    }

    return (
        <>
        <div className='mb-5'>
            <div className='fs2 pt-2'>
                <h5>Education </h5>
            </div>
            {formDataArray.map((formData, index)=>(
            <div key={index}>
            <Form className="border border-gray-600 p-3 mb-3">
                <InputField name="institution" label="Institution" placeholder="Institution" value={formData.institution} onChange={e => handleInputChange(index, e)}/>
                
                <InputField name="location" label="City" placeholder="City" value={formData.location} onChange={e => handleInputChange(index, e)}/>
                <Row>
                  <Col>
                    <InputField name="course" label="Course" placeholder="Course" value={formData.course} onChange={e => handleInputChange(index, e)}/>
                  </Col>
                  <Col>
                    <InputField name="degree" label="Degree" placeholder="Degree" value={formData.degree}  onChange={e => handleInputChange(index, e)}/>
                  </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField name="startDate" label="Start Date" placeholder="Start Date" type="date" value={formData.startDate} onChange={e => handleInputChange(index, e)}/>
                    </Col>
                    <Col>
                        <InputField name="endDate" label="End Date" placeholder="End Date" type="date" value={formData.endDate} onChange={e => handleInputChange(index, e)}/>
                    </Col>
                </Row>
                <Button className="mb-4 mt-4 me-4" variant="primary" onClick={() => handleRemove(index)} disabled={formDataArray.length === 1}>
                    - Remove Section
                </Button>
            </Form>
            </div>))}
            <Button className="mb-4 mt-4 me-4" variant="primary" onClick={handleAdd}>
            + Add Section
            </Button>
            
            <div className='d-flex mt-5 justify-content-around'>
                <Button   className="mt-2 me-4 mb-5" variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button   className="mt-2 me-4 mb-5" variant="primary" onClick={handleNext}>
                    Next
                </Button>
            </div>
            </div>
        </>
    );
};
