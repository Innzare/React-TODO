import React from 'react';
import { Task } from 'Src/models/task';
import { FILTER_BY } from 'Src/consts/filter';
import { TasksListItem } from './TasksListItem';
import './TasksList.scss';

interface Props {
  tasks: Task[];
  filterBy: string;
  onChangeTaskText: (id: string, text: string) => void;
  onCompleteTaskClick: (task: Task) => void;
  onRemoveTaskClick: (task: Task) => void;
}

export const TasksList = (props: Props): JSX.Element => {
  const { tasks, filterBy, onChangeTaskText, onCompleteTaskClick, onRemoveTaskClick } = props;
  const isTasksExist: boolean = tasks.length > 0;

  let emptyTasksText: string = '';

  switch (true) {
    case !isTasksExist && filterBy === FILTER_BY.ACTIVE:
      emptyTasksText = "You don't have active tasks";
      break;

    case !isTasksExist && filterBy === FILTER_BY.COMPLETED:
      emptyTasksText = "You don't have completed tasks";
      break;
  }

  const renderTasks = (): JSX.Element[] => {
    return tasks.map((item: Task, index: number, array: Task[]) => {
      const { id } = item;
      const isLastTask = index + 1 === array.length;

      return (
        <TasksListItem
          key={id}
          task={item}
          isLastTask={isLastTask}
          onChange={onChangeTaskText}
          onComplete={onCompleteTaskClick}
          onRemove={onRemoveTaskClick}
        />
      );
    });
  };

  return (
    <section className="tasks-list-wrapper">
      {!isTasksExist && <div className="tasks-list-empty">{emptyTasksText}</div>}

      <ul>{renderTasks()}</ul>
    </section>
  );
};
