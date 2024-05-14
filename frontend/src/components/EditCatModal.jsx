import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Cats_API_URL } from '../apiUrl';

const EditCatModal = ({ show, handleClose, catId, refreshCats, csrfToken }) => {
  const [cat, setCat] = useState({
    cat_name: '',
    cat_age_type: '',
    cat_breed: '',
    cat_description: '',
    cat_image: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (catId) {
      // Fetch cat data to populate the form
      const fetchCat = async () => {
        try {
          const response = await axios.get(`${Cats_API_URL}/${catId}`);
          setCat(response.data);
        } catch (error) {
          console.error('Error fetching cat:', error);
        }
      };

      fetchCat();
    }
  }, [catId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCat((prevCat) => ({
      ...prevCat,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting cat data:', cat);

    try {
      await axios.put(`${Cats_API_URL}/${catId}`, cat, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
      });
      refreshCats();
      handleClose();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);  // Capture validation errors
      } else {
        console.error('Error updating cat:', error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Cat</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="cat_name"
              value={cat.cat_name}
              onChange={handleChange}
              isInvalid={!!errors.cat_name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.cat_name && errors.cat_name[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Age Type</Form.Label>
            <Form.Control
              type="text"
              name="cat_age_type"
              value={cat.cat_age_type}
              onChange={handleChange}
              isInvalid={!!errors.cat_age_type}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.cat_age_type && errors.cat_age_type[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Breed</Form.Label>
            <Form.Control
              type="text"
              name="cat_breed"
              value={cat.cat_breed}
              onChange={handleChange}
              isInvalid={!!errors.cat_breed}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.cat_breed && errors.cat_breed[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="cat_description"
              value={cat.cat_description}
              onChange={handleChange}
              isInvalid={!!errors.cat_description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cat_description && errors.cat_description[0]}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="cat_image"
              value={cat.cat_image}
              onChange={handleChange}
              isInvalid={!!errors.cat_image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cat_image && errors.cat_image[0]}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditCatModal;
