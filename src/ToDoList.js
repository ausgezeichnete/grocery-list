import React, { useState } from "react";

function ToDoList() {
  const [Tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [submitText, setSubmitText] = useState("Add");
  const [editId, setEditId] = useState(null);

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }

    if (submitText === "Edit" && editId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editId ? { ...task, value: newTask } : task
        )
      );
      setSubmitText("Add");
      setEditId(null);
    } else {
      const newId = Tasks.length > 0 ? Tasks[Tasks.length - 1].id + 1 : 1;
      setTasks((prevTasks) => [...prevTasks, { id: newId, value: newTask }]);
    }

    setNewTask("");
  }

  function editTask(id) {
    const taskToEdit = Tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit.value);
      setSubmitText("Edit");
      setEditId(id);
    }
  }

  function deleteTask(id) {
    const updateTasks = Tasks.filter((task) => task.id !== id);
    setTasks(updateTasks);
  }

  function deleteAll() {
    setTasks([]);
  }

  return (
    <div>
      <div className="section-center">
        <h3>To Do List</h3>
        <div className="grocery-form">
          <form className="form-control" onSubmit={handleSubmit}>
            <input
              id="grocery"
              name="task"
              type="text"
              placeholder="Enter a Task"
              value={newTask}
              onChange={handleInputChange}
            />
            <button className="add-btn submit-btn">{submitText}</button>
          </form>
          <div className="grocery-container show-container">
            <ul className="grocery-list">
              {Tasks.map((task) => (
                <li className="grocery-item" key={task.id}>
                  {task.value}
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editTask(task.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button type="button" className="clear-btn" onClick={deleteAll}>
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
