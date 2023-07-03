import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import TaskList from "./components/task-list/task-list";
import NewTaskForm from "./components/new-task-form/new-task-form";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
