import React, { useState } from 'react';

import '../../index.css';
import { TaskList } from '../task-list';
import { NewTaskForm } from '../new-task-form';
import { Footer } from '../footer';
import './app.css';

let id = 1;

export const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState('all');

  const onCreateItem = (title, minutes = 0, seconds = 0) => {
    return {
      title,
      date: new Date(),
      completed: false,
      editing: false,
      timer: false,
      time: (Number(minutes) * 60 + Number(seconds)).toString(),
      id: id++,
    };
  };

  const onAddItem = (text, minutes, seconds) => {
    setTodoData([...todoData, onCreateItem(text, minutes, seconds)]);
  };

  const onEditItem = (e, id, text) => {
    e.preventDefault();
    const newArr = todoData.slice();
    const idx = newArr.findIndex((item) => item.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, title: text, editing: false };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const onDeleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    setTodoData([...todoData.slice(0, idx), ...todoData.slice(idx + 1)]);
  };

  const toggleProperty = (id, propName) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };
    return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodoData(toggleProperty(id, 'completed'));
  };

  const onToggleEditing = (id) => {
    setTodoData(toggleProperty(id, 'editing'));
  };

  const onToggleTimer = (e, id) => {
    if (e.nativeEvent.pointerId == 1) {
      setTodoData(toggleProperty(id, 'timer'));
    }
  };

  const onClearCompleted = () => {
    setTodoData(todoData.filter(({ completed }) => !completed));
  };

  const onTickTimerItem = (id) => {
    const newArr = todoData.slice();
    newArr.forEach((item) => {
      if (item.id === id && item.timer) {
        item.time -= 1;
      }
    });
    setTodoData(newArr);
  };

  const filterNames = (items, filter) => {
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
  };

  const onChangeFilter = (e) => {
    setFilter(e.target.dataset.name);
  };

  const countCompleted = todoData.filter((item) => !item.completed).length;
  const visibleItems = filterNames(todoData, filter);

  return (
    <section className="todoapp">
      <NewTaskForm onAddItem={onAddItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          onEditItem={onEditItem}
          onDeleteItem={onDeleteItem}
          onToggleEditing={onToggleEditing}
          onToggleDone={onToggleDone}
          onToggleTimer={onToggleTimer}
          onTickTimerItem={onTickTimerItem}
        />
        <Footer
          filter={filter}
          onChangeFilter={onChangeFilter}
          onClearCompleted={onClearCompleted}
          countCompleted={countCompleted}
        />
      </section>
    </section>
  );
};
