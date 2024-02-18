import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const MyForm = () => {
  const [formDataArray, setFormDataArray] = useState([{ fieldName: '', fieldValue: '' }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newArray = [...formDataArray];
    newArray[index] = { ...newArray[index], [name]: value };
    setFormDataArray(newArray);
  };

  const handleAddField = () => {
    setFormDataArray([...formDataArray, { fieldName: '', fieldValue: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send each set of form data to the server
      for (const formData of formDataArray) {
        const response = await axios.post('/api/formData', formData);
        console.log(response.data);
      }
      // Clear form fields after successful submission
      setFormDataArray([{ fieldName: '', fieldValue: '' }]);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {formDataArray.map((formData, index) => (
        <div key={index}>
          <Form.Group controlId={`fieldName-${index}`}>
            <Form.Label>Field Name</Form.Label>
            <Form.Control
              type="text"
              name="fieldName"
              value={formData.fieldName}
              onChange={(e) => handleChange(index, e)}
            />
          </Form.Group>
          <Form.Group controlId={`fieldValue-${index}`}>
            <Form.Label>Field Value</Form.Label>
            <Form.Control
              type="text"
              name="fieldValue"
              value={formData.fieldValue}
              onChange={(e) => handleChange(index, e)}
            />
          </Form.Group>
        </div>
      ))}
      <Button variant="primary" type="button" onClick={handleAddField}>
        Add Field
      </Button>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MyForm;