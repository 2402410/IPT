import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/todos/');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTitle) return;
    await fetch('http://127.0.0.1:8000/api/todos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, completed: false })
    });
    setNewTitle('');
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/todos/${id}/`, { method: 'DELETE' });
    fetchTodos();
  };

  const openEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const saveEdit = async () => {
    if (!editTitle) return;
    await fetch(`http://127.0.0.1:8000/api/todos/${editId}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle })
    });
    setEditId(null);
    setEditTitle('');
    fetchTodos();
  };

  const closeModal = () => {
    setEditId(null);
    setEditTitle('');
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      {/* Embedded CSS */}
      <style>{`
        body {font-family:'Barlow',sans-serif;background:#f1f1f1;margin:0;padding:0;}
        .wrapper {max-width:700px;margin:20px auto;background:#fff;padding:20px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,.1);}
        header h1 {font-family:'Bebas Neue',sans-serif;font-size:3em;text-align:center;color:#333;}
        header h1 span {color:#e74c3c;}
        .header-line {height:2px;background:#e74c3c;width:50%;margin:5px auto 20px auto;}
        .add-form {display:flex;gap:10px;justify-content:center;margin-bottom:20px;}
        .add-form input {flex:1;padding:10px;font-size:1em;border-radius:5px;border:1px solid #ccc;}
        .add-form button {padding:10px 20px;background:#e74c3c;color:#fff;border:none;border-radius:5px;cursor:pointer;}
        .add-form button:hover {background:#c0392b;}
        .garage-header {display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
        .count-badge {background:#3498db;color:white;padding:5px 10px;border-radius:20px;}
        .todo-item {display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ddd;padding:10px 0;}
        .todo-icon {font-size:1.5em;margin-right:10px;}
        .todo-title {font-weight:bold;}
        .todo-actions button {margin-left:5px;padding:5px 10px;border:none;border-radius:5px;cursor:pointer;}
        .todo-actions button:first-child {background:#2ecc71;color:white;}
        .todo-actions button:first-child:hover {background:#27ae60;}
        .todo-actions button:nth-child(2) {background:#f39c12;color:white;}
        .todo-actions button:nth-child(2):hover {background:#d35400;}
        .todo-actions button:last-child {background:#e74c3c;color:white;}
        .todo-actions button:last-child:hover {background:#c0392b;}
        .empty {text-align:center;color:#777;}
        .empty-icon {font-size:3em;margin-bottom:10px;}
        /* Modal */
        .modal-overlay {position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;z-index:999;}
        .modal {background:#fff;padding:20px;border-radius:10px;width:300px;}
        .modal-title {font-weight:bold;margin-bottom:10px;text-align:center;}
        .modal input {width:100%;padding:8px;margin-bottom:10px;border-radius:5px;border:1px solid #ccc;}
        .modal-actions {display:flex;justify-content:space-between;}
        .btn-save {background:#2ecc71;color:white;border:none;padding:8px 15px;border-radius:5px;cursor:pointer;}
        .btn-save:hover {background:#27ae60;}
        .btn-cancel {background:#e74c3c;color:white;border:none;padding:8px 15px;border-radius:5px;cursor:pointer;}
        .btn-cancel:hover {background:#c0392b;}
      `}</style>

      <div className="wrapper">
        <header>
          <h1>AUTO<span>TODO</span></h1>
          <div className="header-line"></div>
        </header>

        <div className="add-form">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a car task (e.g., Oil change)"
          />
          <button onClick={addTodo}>Add Task</button>
        </div>

        <div className="garage-header">
          <div className="garage-title">CAR MAINTENANCE LIST</div>
          <div className="count-badge">{todos.length} TASK{todos.length !== 1 ? 'S' : ''}</div>
        </div>

        <div id="todo-list">
          {todos.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🚗</div>
              <div className="empty-text">No tasks yet</div>
            </div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className="todo-item">
                <div className="todo-icon">{todo.completed ? '✅' : '🛠️'}</div>
                <div className="todo-info">
                  <div className="todo-title">{todo.title}</div>
                </div>
                <div className="todo-actions">
                  <button onClick={() => toggleTodo(todo)}>{todo.completed ? 'Undo' : 'Done'}</button>
                  <button onClick={() => openEdit(todo)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        {editId && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-title">Edit Task</div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={saveEdit} className="btn-save">Save</button>
                <button onClick={closeModal} className="btn-cancel">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;