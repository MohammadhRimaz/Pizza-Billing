import React, { useState, useEffect } from "react";
import axios from "../services/api";

function ItemManagement() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: "", type: "", price: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching Items: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/items", formData);
      setFormData({ name: "", type: "", price: "" });
      fetchItems();
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item: ", error);
    }
  };

  return (
    <div>
      <h2>Item Management</h2>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select
            type="type"
            className="form-control"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="pizza">Pizza</option>
            <option value="topping">Topping</option>
            <option value="bevarages">Bevarages</option>
          </select>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Item
        </button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.price}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemManagement;
