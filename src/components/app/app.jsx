import React, { Component } from 'react';

import '../../index.css';
import { TaskList } from '../task-list';
import { NewTaskForm } from '../new-task-form';
import { Footer } from '../footer';
import './app.css';

export class App extends Component {
  maxId = 1;
  state = {
    todoData: [],
    filter: 'all',
  };

  createTodoItem(label, minutes = 0, seconds = 0) {
    return {
      label,
      date: new Date(),
      completed: false,
      editing: false,
      timer: false,
      time: (Number(minutes) * 60 + Number(seconds)).toString(),
      id: this.maxId++,
    };
  }

  editItem = (id, text) => {
    console.log(id, text);
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el) => {
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

  addItem = (text, minutes, seconds) => {
    const newItem = this.createTodoItem(text, minutes, seconds);
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
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  };

  onToggleEditing = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      };
    });
  };

  onToggleTimer = (id, e) => {
    console.log(e.target);
    if (e.nativeEvent.pointerId == 1) {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'timer'),
        };
      });
    }
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
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
    const countCompleted = this.state.todoData.filter((item) => !item.completed).length;
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
            onToggleTimer={this.onToggleTimer}
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
