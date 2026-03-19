// src/components/AddTodo.js
import React, { useState } from 'react';

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/todos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (res.ok) {
        onAdd(data);
        setTitle('');
      }
    } catch (err) {
      console.error('Failed to add todo', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodo;