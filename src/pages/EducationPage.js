import React, { useState, useRef } from 'react';
import InputField from '../components/InputField';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function EducationPage() {
    let [formDataArray, setFormDataArray] = useState([{
        institution: '',
        course: '',
        startDate: '',
        endDate: '',
        location: '',
    }]);

    const handleInputChange = (i, e) => {
        const { name, value } = e.target;
        let newFormData = {
            ...formDataArray[i],
            [name]: value,
        };
        formDataArray[i] = newFormData;
        setFormDataArray([...formDataArray]);
    };

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

    return (
        <>
        <div className='mb-5'>
            <div className='fs2 pt-2'>
                <h5>Education</h5>
            </div>
            {formDataArray.map((formData, index)=>(
            <div key={index}>
            <Form className="border border-gray-600 p-3 mb-3">
                <InputField name="institution" label="Institution" placeholder="Institution" onChange={e => handleInputChange(index, e)}/>
                
                <InputField name="location" label="City" placeholder="City" onChange={e => handleInputChange(index, e)}/>
                <Row>
                  <Col>
                    <InputField name="course" label="Course" placeholder="Course" onChange={e => handleInputChange(index, e)}/>
                  </Col>
                  <Col>
                    <InputField name="degree" label="Degree" placeholder="Degree" onChange={e => handleInputChange(index, e)}/>
                  </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField name="startDate" label="Start Date" placeholder="Start Date" type="date" onChange={e => handleInputChange(index, e)}/>
                    </Col>
                    <Col>
                        <InputField name="endDate" label="End Date" placeholder="End Date" type="date" onChange={e => handleInputChange(index, e)}/>
                    </Col>
                </Row>
            </Form>
            </div>))}
            <Button className="mb-4 mt-4 me-4" variant="primary" onClick={handleAdd}>
            + Add Section
            </Button>
            </div>
        </>
    );
};
