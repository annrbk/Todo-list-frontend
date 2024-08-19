import "./styles/style.css";
import React, { useState } from "react";

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const addTask = (task) => {
    const newTask = {
      id: Math.random(),
      task: task,
    };
    setList([...list, newTask]);

    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
    }
  };

  const deleteTask = (id) => {
    setList(list.filter((task) => task.id !== id));
  };

  const toggleTaskDone = (id) => {
    setList(
      list.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
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
          <button
            onClick={() => addTask(input)}
            className="top__button"
            type="submit"
          >
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
            <li key={task.id} id={task.id} className="bottom__item">
              <p
                className={
                  task.done
                    ? "bottom__item-title item-done"
                    : "bottom__item-title"
                }
              >
                {task.task}
              </p>
              <div className="bottom__buttons">
                <button
                  type="button"
                  data-action="done"
                  className="bottom__btn-done btn-action"
                  onClick={() => toggleTaskDone(task.id)}
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
                  onClick={() => deleteTask(task.id)}
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
