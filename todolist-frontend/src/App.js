import React, { useState, useEffect } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0a;
    min-height: 100vh;
    font-family: 'Rajdhani', sans-serif;
  }

  :root {
    --red: #eb0a1e;
    --red-dark: #b00818;
    --red-glow: rgba(235, 10, 30, 0.25);
    --silver: #c8cdd4;
    --silver-light: #e8edf2;
    --dark: #0a0a0a;
    --dark2: #111317;
    --dark3: #181c22;
    --dark4: #1f242c;
    --border: rgba(200, 205, 212, 0.12);
    --border-bright: rgba(200, 205, 212, 0.25);
  }

  .autotodo-root {
    max-width: 760px;
    margin: 0 auto;
    padding: 30px 20px 60px;
    min-height: 100vh;
    position: relative;
  }

  /* ---- HEADER ---- */
  .header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
    padding-bottom: 24px;
  }
  .header::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: var(--red);
    box-shadow: 0 0 18px var(--red-glow);
  }
  .toyota-badge {
    display: inline-block;
    margin-bottom: 10px;
  }
  .toyota-badge svg {
    width: 54px;
    height: 36px;
    filter: drop-shadow(0 0 8px var(--red-glow));
  }
  .header-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 2.6rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    color: var(--silver-light);
    text-transform: uppercase;
    line-height: 1;
  }
  .header-title span {
    color: var(--red);
    text-shadow: 0 0 20px var(--red-glow);
  }
  .header-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.3em;
    color: rgba(200,205,212,0.45);
    text-transform: uppercase;
    margin-top: 6px;
  }

  /* ---- PANELS ---- */
  .panel {
    background: var(--dark3);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 28px 30px;
    margin-bottom: 18px;
    position: relative;
    overflow: hidden;
  }
  .panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: var(--red);
  }
  .panel-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.25em;
    color: var(--red);
    text-transform: uppercase;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .panel-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ---- INPUTS ---- */
  .field {
    margin-bottom: 12px;
  }
  .field label {
    display: block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    color: rgba(200,205,212,0.5);
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .field input {
    width: 100%;
    background: var(--dark2);
    border: 1px solid var(--border-bright);
    border-radius: 3px;
    padding: 10px 14px;
    color: var(--silver-light);
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .field input:focus {
    border-color: var(--red);
    box-shadow: 0 0 0 2px var(--red-glow);
  }
  .field input::placeholder { color: rgba(200,205,212,0.25); }

  /* ---- BUTTONS ---- */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.18s;
    padding: 9px 18px;
  }
  .btn-primary {
    background: var(--red);
    color: #fff;
    width: 100%;
    justify-content: center;
    margin-top: 6px;
    box-shadow: 0 2px 16px var(--red-glow);
  }
  .btn-primary:hover { background: #ff1a2e; box-shadow: 0 4px 24px var(--red-glow); }
  .btn-sm {
    padding: 5px 11px;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
  }
  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border-bright);
    color: var(--silver);
  }
  .btn-ghost:hover { border-color: var(--silver); color: var(--silver-light); }
  .btn-danger { background: rgba(235,10,30,0.12); border: 1px solid rgba(235,10,30,0.3); color: var(--red); }
  .btn-danger:hover { background: var(--red); color: #fff; }
  .btn-success { background: rgba(0,185,100,0.12); border: 1px solid rgba(0,185,100,0.3); color: #00b964; }
  .btn-success:hover { background: #00b964; color: #fff; }
  .btn-edit { background: rgba(52,152,219,0.12); border: 1px solid rgba(52,152,219,0.3); color: #3498db; }
  .btn-edit:hover { background: #3498db; color: #fff; }

  /* ---- MESSAGE ---- */
  .msg {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    margin-top: 10px;
    padding: 7px 12px;
    border-radius: 3px;
    border-left: 2px solid var(--red);
    background: rgba(235,10,30,0.07);
    color: var(--silver);
    min-height: 14px;
  }
  .msg.success { border-color: #00b964; background: rgba(0,185,100,0.07); color: #00b964; }

  /* ---- WELCOME BAR ---- */
  .welcome-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--dark4);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 12px 18px;
    margin-bottom: 22px;
  }
  .welcome-user {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: var(--silver-light);
    text-transform: uppercase;
  }
  .welcome-user span { color: var(--red); }
  .status-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #00b964;
    box-shadow: 0 0 8px #00b96480;
    display: inline-block;
    margin-right: 8px;
  }

  /* ---- TASK COUNT ---- */
  .task-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  .task-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    color: rgba(200,205,212,0.5);
    text-transform: uppercase;
  }
  .task-count {
    background: var(--red);
    color: #fff;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.72rem;
    padding: 3px 10px;
    border-radius: 2px;
    letter-spacing: 0.1em;
    box-shadow: 0 0 10px var(--red-glow);
  }

  /* ---- TODO ITEM ---- */
  .todo-list { display: flex; flex-direction: column; gap: 8px; }
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--dark2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 13px 16px;
    transition: border-color 0.2s, background 0.2s;
    gap: 12px;
  }
  .todo-item:hover { border-color: var(--border-bright); background: var(--dark3); }
  .todo-item.done { opacity: 0.55; }
  .todo-icon { font-size: 1.2rem; flex-shrink: 0; }
  .todo-title {
    flex: 1;
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--silver-light);
    letter-spacing: 0.03em;
  }
  .todo-item.done .todo-title {
    text-decoration: line-through;
    color: rgba(200,205,212,0.4);
  }
  .todo-actions { display: flex; gap: 6px; flex-shrink: 0; }

  /* ---- EMPTY STATE ---- */
  .empty {
    text-align: center;
    padding: 50px 20px;
    border: 1px dashed var(--border-bright);
    border-radius: 4px;
  }
  .empty-icon { font-size: 3.5rem; margin-bottom: 10px; opacity: 0.6; }
  .empty-text {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    color: rgba(200,205,212,0.35);
    text-transform: uppercase;
  }

  /* ---- ADD TASK INLINE ---- */
  .add-row {
    display: flex;
    gap: 10px;
    margin-bottom: 18px;
  }
  .add-row input {
    flex: 1;
    background: var(--dark2);
    border: 1px solid var(--border-bright);
    border-radius: 3px;
    padding: 10px 14px;
    color: var(--silver-light);
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .add-row input:focus {
    border-color: var(--red);
    box-shadow: 0 0 0 2px var(--red-glow);
  }
  .add-row input::placeholder { color: rgba(200,205,212,0.25); }
  .add-row .btn { min-width: 110px; justify-content: center; margin-top: 0; }

  /* ---- MODAL ---- */
  .modal-overlay {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(3px);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  }
  .modal {
    background: var(--dark3);
    border: 1px solid var(--border-bright);
    border-radius: 6px;
    padding: 30px;
    width: 360px;
    max-width: 90vw;
    position: relative;
  }
  .modal::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 3px;
    background: linear-gradient(90deg, var(--red), transparent);
    border-radius: 6px 6px 0 0;
  }
  .modal-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: var(--silver-light);
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .modal-actions { display: flex; gap: 10px; margin-top: 16px; }
  .modal-actions .btn { flex: 1; justify-content: center; }

  /* ---- DIVIDER ---- */
  .auth-divider {
    display: flex; align-items: center; gap: 14px;
    margin: 20px 0;
    color: rgba(200,205,212,0.25);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem; letter-spacing: 0.2em;
  }
  .auth-divider::before, .auth-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }
`;

// Toyota SVG Logo
const ToyotaLogo = () => (
  <svg viewBox="0 0 100 65" xmlns="http://www.w3.org/2000/svg" fill="none">
    <ellipse cx="50" cy="32" rx="48" ry="30" stroke="#eb0a1e" strokeWidth="5"/>
    <ellipse cx="50" cy="32" rx="20" ry="27" stroke="#eb0a1e" strokeWidth="5"/>
    <ellipse cx="50" cy="13" rx="30" ry="11" stroke="#eb0a1e" strokeWidth="5"/>
  </svg>
);

// Register component
function Register({ onRegistered }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! You can now log in.');
        setIsSuccess(true);
        setUsername('');
        setPassword('');
        if (onRegistered) onRegistered();
      } else {
        setMessage(data.error || 'Registration failed');
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage('Network error');
      setIsSuccess(false);
    }
  };

  return (
    <div className="panel">
      <div className="panel-title">New Driver Registration</div>
      <div className="field">
        <label>Username</label>
        <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="field">
        <label>Password</label>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary" onClick={handleRegister}>Create Account</button>
      {message && <div className={`msg${isSuccess ? ' success' : ''}`}>{message}</div>}
    </div>
  );
}

// Login component
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Welcome, ${data.username}!`);
        setUsername('');
        setPassword('');
        if (onLogin) onLogin(data.username);
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
    <div className="panel">
      <div className="panel-title">Driver Login</div>
      <div className="field">
        <label>Username</label>
        <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="field">
        <label>Password</label>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Start Engine</button>
      {message && <div className="msg">{message}</div>}
    </div>
  );
}

// AddTodo
function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/todos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false }),
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
    <div className="add-row">
      <input
        type="text"
        placeholder="e.g. Oil change, Tire rotation, Brake inspection…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>+ Add Task</button>
    </div>
  );
}

// Main App
function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/todos/');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos', err);
    }
  };

  const toggleTodo = async (todo) => {
    await fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
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
      body: JSON.stringify({ title: editTitle }),
    });
    setEditId(null);
    setEditTitle('');
    fetchTodos();
  };

  const closeModal = () => {
    setEditId(null);
    setEditTitle('');
  };

  const handleAddTodo = (newTodo) => setTodos((prev) => [...prev, newTodo]);

  useEffect(() => {
    if (user) fetchTodos();
  }, [user]);

  return (
    <>
      <style>{styles}</style>
      <div className="autotodo-root">
        {/* Header */}
        <header className="header">
          <div className="toyota-badge"><ToyotaLogo /></div>
          <div className="header-title">AUTO<span>TODO</span></div>
          <div className="header-sub">Vehicle Maintenance Management System</div>
        </header>

        {!user ? (
          <>
            <Register />
            <div className="auth-divider">Already have an account?</div>
            <Login onLogin={(username) => setUser(username)} />
          </>
        ) : (
          <>
            {/* Welcome bar */}
            <div className="welcome-bar">
              <div className="welcome-user">
                <span className="status-dot" />
                Driver: <span>{user}</span>
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: 'rgba(200,205,212,0.35)', letterSpacing: '0.15em' }}>
                SYSTEM ONLINE
              </div>
            </div>

            {/* Add task */}
            <AddTodo onAdd={handleAddTodo} />

            {/* Task list */}
            <div className="task-header">
              <div className="task-label">Maintenance Schedule</div>
              <div className="task-count">{todos.length} TASK{todos.length !== 1 ? 'S' : ''}</div>
            </div>

            {todos.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">🚗</div>
                <div className="empty-text">No maintenance tasks scheduled</div>
              </div>
            ) : (
              <div className="todo-list">
                {todos.map((todo) => (
                  <div key={todo.id} className={`todo-item${todo.completed ? ' done' : ''}`}>
                    <div className="todo-icon">{todo.completed ? '✅' : '🔧'}</div>
                    <div className="todo-title">{todo.title}</div>
                    <div className="todo-actions">
                      <button className={`btn btn-sm ${todo.completed ? 'btn-ghost' : 'btn-success'}`} onClick={() => toggleTodo(todo)}>
                        {todo.completed ? 'Undo' : 'Done'}
                      </button>
                      <button className="btn btn-sm btn-edit" onClick={() => openEdit(todo)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>Del</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Edit Modal */}
            {editId && (
              <div className="modal-overlay" onClick={closeModal}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-title">⚙ Edit Service Task</div>
                  <div className="field">
                    <label>Task Description</label>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                      autoFocus
                    />
                  </div>
                  <div className="modal-actions">
                    <button className="btn btn-success" onClick={saveEdit}>Save</button>
                    <button className="btn btn-danger" onClick={closeModal}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;