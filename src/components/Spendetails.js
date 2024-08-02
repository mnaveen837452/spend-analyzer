import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './Spendetails.css';

const Spendetails = () => {
  const [spendetails, setSpendetails] = useState([]);
  const [spendetail, setSpendetail] = useState({
    id: '',
    date: '',
    name: '',
    amount: '',
    category: { id: '', name: '', description: '' },
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchSpendetails();
    fetchCategories();
  }, []);

  const fetchSpendetails = async () => {
    try {
      const response = await axios.get('http://localhost:8082/spendanalyzer/thrivarna/api/v1/spendanalyzer');
      setSpendetails(response.data);
    } catch (error) {
      console.error('Error fetching spendetails:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8082/spendanalyzer/thrivarna/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpendetail(prevSpendetail => ({
      ...prevSpendetail,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setSpendetail(prevSpendetail => ({
      ...prevSpendetail,
      category: { ...prevSpendetail.category, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateSpendetail();
    } else {
      await addSpendetail();
    }
    fetchSpendetails();
    setShowForm(false);
  };

  const addSpendetail = async () => {
    try {
      await axios.post('http://localhost:8082/spendanalyzer/thrivarna/api/v1/spendanalyzer', spendetail);
      setMessage('Spendetail added successfully!');
      setSpendetail({
        id: '',
        date: '',
        name: '',
        amount: '',
        category: { id: '', name: '', description: '' },
        description: ''
      });
    } catch (error) {
      setMessage('Failed to add spendetail.');
      console.error('Error adding spendetail:', error);
    }
  };

  const updateSpendetail = async () => {
    try {
      await axios.put(`http://localhost:8082/spendanalyzer/thrivarna/api/v1/spendanalyzer/${spendetail.id}`, spendetail);
      setMessage('Spendetail updated successfully!');
      setSpendetail({
        id: '',
        date: '',
        name: '',
        amount: '',
        category: { id: '', name: '', description: '' },
        description: ''
      });
      setIsEditing(false);
    } catch (error) {
      setMessage('Failed to update spendetail.');
      console.error('Error updating spendetail:', error);
    }
  };

  const editSpendetail = (spendetail) => {
    setSpendetail(spendetail);
    setIsEditing(true);
    setShowForm(true);
  };

  const deleteSpendetail = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/spendanalyzer/thrivarna/api/v1/spendanalyzer/${id}`);
      setMessage('Spendetail deleted successfully!');
      fetchSpendetails();
    } catch (error) {
      setMessage('Failed to delete spendetail.');
      console.error('Error deleting spendetail:', error);
    }
  };

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Date', selector: row => row.date },
    { name: 'Name', selector: row => row.name },
    { name: 'Amount', selector: row => row.amount },
    { name: 'Category', selector: row => row.category.name },
    { name: 'Description', selector: row => row.description },
    {
      name: 'Actions',
      cell: row => (
        <>
          <button onClick={() => editSpendetail(row)}>Edit</button>
          <button onClick={() => deleteSpendetail(row.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div className="spendetails-container">
      <h2>{showForm ? (isEditing ? 'Edit Spendetail' : 'Add Spendetail') : 'Spendetails'}</h2>
      <button className="table-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Back to List' : 'Add Spendetail'}
      </button>
      {showForm ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={spendetail.id}
                onChange={handleChange}
                disabled={isEditing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={spendetail.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={spendetail.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={spendetail.amount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category-id">Category ID:</label>
              <select
                id="category-id"
                name="id"
                value={spendetail.category.id}
                onChange={handleCategoryChange}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={spendetail.description}
                onChange={handleChange}
              />
            </div>
            <button type="submit">{isEditing ? 'Update' : 'Add'} Spendetail</button>
          </form>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      ) : (
        <DataTable
          title="Spendetails"
          columns={columns}
          data={spendetails}
          pagination
        />
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Spendetails;
