import React, { useState, useEffect } from 'react';
import { Task } from 'Src/models/task';
import { FILTER_BY } from './consts/filter';
import { Header } from 'Src/components/Header';
import { Footer } from 'Src/components/Footer';
import { TasksList } from 'Src/components/TasksList';
import './App.scss';

export const App = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksFiltered, setTasksFiltered] = useState<Task[]>([]);
  const [filterBy, setFilterBy] = useState<string>(FILTER_BY.ALL);

  const isTasksExist = tasks.length > 0;
  const isEveryTaskCompleted = isTasksExist && tasks.every((task) => task.isCompleted);

  useEffect(() => {
    if (filterBy !== FILTER_BY.ALL) {
      onChangeFilter(filterBy);
    } else {
      setTasksFiltered(tasks);
    }
  }, [tasks]);

  const onChangeFilter = (newFilter: string) => {
    setFilterBy(newFilter);

    setTasksFiltered(() => {
      switch (true) {
        case newFilter === FILTER_BY.ALL:
          return tasks;

        case newFilter === FILTER_BY.ACTIVE:
          return tasks.filter((item) => !item.isCompleted);

        case newFilter === FILTER_BY.COMPLETED:
          return tasks.filter((item) => item.isCompleted);
      }
    });
  };

  const onClearCompletedClick = (): void => {
    setTasks((prevTasks: Task[]) => {
      return prevTasks.filter((item: Task) => !item.isCompleted);
    });
  };

  const onAddTask = (newTask: Task): void => {
    setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
  };

  const onChangeTaskText = (id: string, taskText: string): void => {
    setTasks((prevTasks: Task[]) => {
      return prevTasks.map((prevTask: Task) => {
        if (prevTask.id === id) {
          return {
            ...prevTask,
            text: taskText
          };
        }

        return prevTask;
      });
    });
  };

  const onCompleteTaskClick = (updatedTask: Task): void => {
    setTasks((prevTasks: Task[]) => {
      return prevTasks.map((prevTask: Task) => {
        if (prevTask.id === updatedTask.id) {
          return {
            ...prevTask,
            isCompleted: !prevTask.isCompleted
          };
        }

        return prevTask;
      });
    });
    onChangeFilter(filterBy);
  };

  const onRemoveTaskClick = (task: Task): void => {
    setTasks((prevTasks: Task[]) => {
      return prevTasks.filter((item: Task) => {
        return item.id !== task.id;
      });
    });
  };

  const onToggleEveryTaskClick = (): void => {
    setTasks((prevTasks: Task[]) => {
      return prevTasks.map((prevTask: Task) => ({
        ...prevTask,
        isCompleted: !isEveryTaskCompleted
      }));
    });
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <h1 className="title">todos</h1>

        <div className="app">
          <Header
            isEveryTaskCompleted={isEveryTaskCompleted}
            onAddTask={onAddTask}
            onToggleEveryTaskClick={onToggleEveryTaskClick}
          />

          {isTasksExist && (
            <>
              <TasksList
                tasks={tasksFiltered}
                filterBy={filterBy}
                onChangeTaskText={onChangeTaskText}
                onCompleteTaskClick={onCompleteTaskClick}
                onRemoveTaskClick={onRemoveTaskClick}
              />
              <Footer
                tasks={tasks}
                filterBy={filterBy}
                onClearCompletedClick={onClearCompletedClick}
                onChangeFilter={onChangeFilter}
              />
            </>
          )}
        </div>

        <div className="info">
          <p>Double-click to edit a todo</p>
          <p>Press enter to save the changes and blur to cancel</p>
        </div>
      </div>
    </div>
  );
};
