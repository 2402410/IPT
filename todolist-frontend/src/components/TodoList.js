// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/todos/');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/todos/${id}/`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete todo', err);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <AddTodo onAdd={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{' '}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;