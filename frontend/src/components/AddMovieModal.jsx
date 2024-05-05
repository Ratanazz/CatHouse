import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Cats_API_URL } from '../apiUrl';
function AddMovieModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    rating: '',
    poster: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch CSRF token from the meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      
      // Include CSRF token in the request headers
      const headers = {
        'X-CSRF-TOKEN': csrfToken
      };

      // Send form data to your Laravel backend
      const response = await axios.post(Cats_API_URL, formData, { headers });
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGenre">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formRating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPoster">
            <Form.Label>Poster</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Poster Url"
              name="poster"
              value={formData.poster}
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

export default AddMovieModal;
