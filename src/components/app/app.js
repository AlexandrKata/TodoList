import React, { Component } from "react";

import "../../index.css";
import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";
import { id } from "date-fns/locale";

export default class App extends Component {
  state = {
    todoData: [
      { label: "Web Learning", completed: false, id: 1 },
      { label: "JS Learning", completed: false, id: 2 },
      { label: "React Learning", completed: false, id: 3 },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList todos={this.state.todoData} onDeleted={this.deleteItem} />
          <Footer />
        </section>
      </section>
    );
  }
}
