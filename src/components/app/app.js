import React, { Component } from "react";

import "../../index.css";
import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";
import "./app.css";

export default class App extends Component {
  maxId = 10;
  state = {
    todoData: [this.createTodoItem("xxxxxxxxxxx")],
    filter: "all",
  };

  createTodoItem(label) {
    return {
      label,
      time: new Date(),
      completed: false,
      editing: false,
      id: this.maxId++,
    };
  }

  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el, i) => {
        if (el.id === id) {
          el.label = text;
        }
        return el;
      });
      return {
        todoData: newArr,
      };
    });
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

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "completed"),
      };
    });
  };

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "editing"),
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.completed);
      case "completed":
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  onClearCompleted = () => {
    this.state.todoData.forEach((item) => {
      if (item.completed) {
        this.deleteItem(item.id);
      }
    });
  };

  render() {
    const countCompleted = this.state.todoData.filter(
      (item) => !item.completed
    ).length;
    const { todoData, filter } = this.state;
    const visibleItems = this.filter(todoData, filter);
    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onEdited={this.editItem}
            onDeleted={this.deleteItem}
            onToggleEditing={this.onToggleEditing}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
            countCompleted={countCompleted}
          />
        </section>
      </section>
    );
  }
}
