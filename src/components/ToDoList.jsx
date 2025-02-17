import React, { useEffect, useState } from 'react';
import './TodoList.css'; // Import the CSS file

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <div className="todo-container">Loading...</div>;
  }

  if (error) {
    return <div className="todo-container">Error: {error.message}</div>;
  }

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <ul>
        {todos.slice(0, 10).map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>
            <span className={todo.completed ? 'completed' : 'not-completed'}>
              {todo.completed ? '✔ Completed' : '❌ Not completed'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
