
import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="todo-app">
      <h1>React Todo App</h1>
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            {editId === todo.id ? (
              <form onSubmit={handleEditSubmit} className="edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span
                  onClick={() => handleToggle(todo.id)}
                  style={{ cursor: 'pointer', textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                  {todo.text}
                </span>
                <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
