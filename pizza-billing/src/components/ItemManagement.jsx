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

    // Ensure the price is a number (parse it)
    const newItem = {
      ...formData,
      price: parseFloat(formData.price), // Convert price to number
    };

    try {
      await axios.post("/items", newItem);
      setFormData({ name: "", type: "", price: "" });
      fetchItems();
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want delete this item?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`/items/${id}`);
      if (response.status === 200) {
        alert(response.data.message || "Item deleted successfully!");
        fetchItems(); // Refresh the items list
      } else {
        alert("Failed to delete the item!");
      }
    } catch (error) {
      console.error("Error deleting item: ", error);
      alert("An error occurred while trying to delete the item.");
    }
  };

  return (
    <div className="p-5">
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
            name="type"
            className="form-control"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Pizza">Pizza</option>
            <option value="Topping">Topping</option>
            <option value="beverages">Bevarages</option>
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
