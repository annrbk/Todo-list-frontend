import "./styles/style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/tasks");
        setList(response.data);
      } catch (error) {
        console.error("Error when loading tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:3001/api/tasks", {
        text: task,
        completed: false,
      });
      setList([...list, response.data]);
      setInput("");
    } catch (error) {
      console.error("Error when adding a task:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      setList(list.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error when deleting tasks:", error);
    }
  };

  const toggleTaskDone = async (id) => {
    const task = list.find((task) => task._id === id);
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/tasks/${id}`,
        {
          completed: !task.completed,
        }
      );
      setList(list.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Error when updating tasks:", error);
    }
  };

  const checkEmptyList = () => {
    return list.length === 0;
  };

  return (
    <div className="container">
      <div className="top">
        <h1 className="top__title">To Do List</h1>
        <p className="top__subtitle">Today</p>
        <form className="top__form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            className="top__input"
            placeholder="New task"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="top__button" type="submit">
            Add task
          </button>
        </form>
      </div>
      <div className="bottom">
        <ul className="bottom__list">
          {checkEmptyList() && (
            <li className="bottom__item-empty">
              <p className="bottom__item-title">List is empty</p>
            </li>
          )}
          {list.map((task) => (
            <li key={task._id} id={task._id} className="bottom__item">
              <p
                className={
                  task.completed
                    ? "bottom__item-title item-done"
                    : "bottom__item-title"
                }
              >
                {task.text}
              </p>
              <div className="bottom__buttons">
                <button
                  type="button"
                  data-action="done"
                  className="bottom__btn-done btn-action"
                  onClick={() => toggleTaskDone(task._id)}
                >
                  <img
                    src="./image/done.svg"
                    alt="done"
                    width="25px"
                    height="25px"
                  />
                </button>
                <button
                  type="button"
                  data-action="delete"
                  className="bottom__btn-delete btn-action"
                  onClick={() => deleteTask(task._id)}
                >
                  <img
                    src="image/delete.svg"
                    alt="delete"
                    width="25px"
                    height="25px"
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
