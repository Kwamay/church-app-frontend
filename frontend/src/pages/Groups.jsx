import React, {useState, useEffect} from 'react';
import '../css/group.css'

const books = [
    {
      author: "Mel Robbins",
      title: "The Let Them Theory",
      img: "../images/book-1.jpg",
      id: 1,
    },
    {
      author: "Jim Murphy",
      title: "Inner Excellence",
      img: "../images/book-2.jpg",
      id: 2,
    },
    {
      author: "James Clear",
      title: "Atomic Habits",
      img: "../images/book-3.jpg",
      id: 3,
    },
  ];

  const Groups = () => {
    return (
        <div>
            <h1>Group page</h1>
            {books.map((book) => (
                <Book key={book.id} {...book} />
            ))}
            <TodoList/>
            <State/>
            <Ken/>
        </div>
    );
};

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setNewTask(""); // Clear input
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-section">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function State() {
  const [count, setCount] = useState(4);

  function decrementCount() {
    setCount(prevCount => prevCount - 1)
  }
  
  function incrementCount() {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <React.Fragment>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>
    </React.Fragment>
  );
};

const Book = ({author, title, img}) => {
return (
    <div className='book'>
        <img src={img} alt={title}/>
        <h3>{author}</h3>
        <p>{title}</p>
    </div>
);
};

function Ken() {
  const [showText, setShowText] = useState(true);

  return (
    <React.Profiler>
      <button>Show/Hide</button>
      {showText === true && true && <h1>HI MY NAME IS KENNETH</h1>}
    </React.Profiler>
  )
}

export default Groups;