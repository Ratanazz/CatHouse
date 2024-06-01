import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Cats_API_URL } from '../apiUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddCatModal from './AddCatModal';
import EditCatModal from './EditCatModal';

function CRUDCatsList() {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCatId, setCurrentCatId] = useState(null);
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate(); // Create a useNavigate hook instance

  const handleClickrequest = () => {
    navigate('/request'); // Navigate to /request route on button click
  };

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleOpenEditModal = (id) => {
    setCurrentCatId(id);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);

  const fetchCats = async () => {
    try {
      const response = await axios.get(Cats_API_URL);
      setCats(response.data);
    } catch (error) {
      console.error('Error fetching cats:', error);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Cats_API_URL}/${id}`, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
      });
      setCats(prevCats => prevCats.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting cat:', error);
    }
  };

  const filteredCats = cats.filter((cat) =>
    cat.cat_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
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
        <div className="addnew">
              <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="requestpage"  onClick={handleClickrequest}>
                Adopt Request <FontAwesomeIcon icon={faEdit} />
              </button>
             
            </div>
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
              <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add" onClick={handleOpenAddModal}>
                Add Cat <FontAwesomeIcon icon={faEdit} />
              </button>
              <AddCatModal show={showAddModal} handleClose={handleCloseAddModal} csrfToken={csrfToken} />
            </div>
            
        </div>

        <div className="row">
          <div className="col-lg-12 mx-auto">
            <div className="card border-1 shadow">
              <div className="card-body p-4">
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
                      {filteredCats.map((cat, index) => (
                        <tr key={cat.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{cat.cat_name}</td>
                          <td>{cat.cat_age_type}</td>
                          <td>{cat.cat_breed}</td>
                          <td>
                            <ul className="list-inline m-0">
                              <li className="list-inline-item">
                                <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => handleOpenEditModal(cat.id)}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </li>
                              <li className="list-inline-item">
                                <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => handleDelete(cat.id)}>
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
      <EditCatModal show={showEditModal} handleClose={handleCloseEditModal} catId={currentCatId} refreshCats={fetchCats} csrfToken={csrfToken} />
    </section>
  );
}

export default CRUDCatsList;
