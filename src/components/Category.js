import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: '', name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'form'

  const serverPathURL = "http://localhost:8082/spendanalyzer/thrivarna/api/v1/categories";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(serverPathURL);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateCategory();
    } else {
      await addCategory();
    }
    fetchCategories();
    setView('list'); // Switch back to list view after submission
  };

  const addCategory = async () => {
    try {
      await axios.post(serverPathURL, category);
      setMessage('Category added successfully!');
      setCategory({ id: '', name: '', description: '' });
    } catch (error) {
      setMessage('Failed to add category.');
      console.error('Error adding category:', error);
    }
  };

  const updateCategory = async () => {
    try {
      await axios.put(`http://localhost:8082/spendanalyzer/thrivarna/api/v1/categories/${category.id}`, category);
      setMessage('Category updated successfully!');
      setCategory({ id: '', name: '', description: '' });
      setIsEditing(false);
    } catch (error) {
      setMessage('Failed to update category.');
      console.error('Error updating category:', error);
    }
  };

  const editCategory = (category) => {
    setCategory(category);
    setIsEditing(true);
    setView('form'); // Switch to form view for editing
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/spendanalyzer/thrivarna/api/v1/categories/${id}`);
      setMessage('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      setMessage('Failed to delete category.');
      console.error('Error deleting category:', error);
    }
  };

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Description', selector: row => row.description },
    {
      name: 'Actions',
      cell: row => (
        <>
          <button onClick={() => editCategory(row)}>Edit</button>
          <button onClick={() => deleteCategory(row.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div className="category-container">
      <h2>{view === 'list' ? 'Categories' : isEditing ? 'Edit Category' : 'Create Category'}</h2>
      <button onClick={() => setView(view === 'list' ? 'form' : 'list')}>
        {view === 'list' ? 'Add Category' : 'Back to List'}
      </button>
      {view === 'list' ? (
        <>
          <DataTable
            title="Categories"
            columns={columns}
            data={categories}
            pagination
          />
        </>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={category.id}
                onChange={handleChange}
                disabled={isEditing}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={category.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={category.description}
                onChange={handleChange}
              />
            </div>
            <button type="submit">{isEditing ? 'Update' : 'Add'} Category</button>
          </form>
          <button onClick={() => setView('list')}>Cancel</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Category;
