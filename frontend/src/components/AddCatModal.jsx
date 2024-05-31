import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Cats_API_URL } from '../apiUrl';

function AddCatModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    cat_name: '',
    cat_breed: '',
    cat_age_type: '',
    cat_image: '',
    cat_image2: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(Cats_API_URL, formData)
      .then((response) => {
        // Handle success, maybe show a success message
        console.log('Cat added successfully:', response.data);
        // Close the modal after successful submission
        handleClose();
      })
      .catch((error) => {
        // Handle error, maybe show an error message
        console.error('Error adding cat:', error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Cat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Cat Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Cat name"
              name="cat_name"
              value={formData.cat_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBreed">
            <Form.Label>Cat Breed</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Cat Breed"
              name="cat_breed"
              value={formData.cat_breed}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAge">
            <Form.Label>Cat Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Cat age"
              name="cat_age_type"
              value={formData.cat_age_type}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Cat Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Cat Image URL"
              name="cat_image"
              value={formData.cat_image}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formImage2">
            <Form.Label>Cat Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Cat Image URL"
              name="cat_image2"
              value={formData.cat_image2}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCatModal;
