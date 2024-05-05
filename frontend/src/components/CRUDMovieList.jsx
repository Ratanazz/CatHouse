import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cats_API_URL } from '../apiUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddMovieModal from './AddCatModal';
function CRUDMovieList() {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(Cats_API_URL);
        setCats(response.data);
      } catch (error) {
        console.error('Error fetching cats:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = cats.filter((cats) =>
    cats.cat_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    // Fetch CSRF token from Laravel backend
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/sanctum/csrf-cookie');
        // Extract CSRF token from response headers
        const token = response.headers['x-csrf-token'];
        setCsrfToken(token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  return (
    <section className="pb-5 header text-center">
      <div className="container py-1 text-white">
        <header className="py-2">
          <h1 className="display-5" style={{color:'black'}}>Cats List</h1>
        </header>

        <div className="top" style={{ display: 'flex', justifyContent:'space-evenly'}}>
            <div className="row mb-2">
              <div className="col-lg-12 mx-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search cats..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="addnew">
            <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={handleOpenModal}>
                                 Add Cat <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <AddMovieModal show={showModal} handleClose={handleCloseModal} csrfToken={csrfToken} />
            </div>
        </div>

        <div className="row">
          <div className="col-lg-12 mx-auto">
            <div className="card border-1 shadow">
              <div className="card-body p-4">

                {/* Responsive table */}
                <div className="table-responsive">
                  <table className="table m-0">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Breed</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMovies.map((cats, index) => (
                        <tr key={cats.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{cats.cat_name}</td>
                          <td>{cats.cat_age_type}</td>
                          <td>{cats.cat_breed}</td>
                          <td>
                            <ul className="list-inline m-0">
                              <li className="list-inline-item">
                                <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </li>
                              <li className="list-inline-item">
                                <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete">
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CRUDMovieList;
