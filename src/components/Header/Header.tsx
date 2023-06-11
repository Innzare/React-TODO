import React, { useState } from 'react';
import { Task } from 'Src/models/task';
import { generateRandomId } from 'Src/helpers/common';
import { EnterIcon } from 'Src/components/SvgIcons/EnterIcon';
import './Header.scss';

interface Props {
  isEveryTaskCompleted: boolean;
  onAddTask: (task: Task) => void;
  onToggleEveryTaskClick: () => void;
}

export const Header = (props: Props): JSX.Element => {
  const { isEveryTaskCompleted, onAddTask, onToggleEveryTaskClick } = props;

  const [task, setTask] = useState<string>('');

  const isTaskExist: boolean = task.length > 0;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;

    setTask(value);
  };

  const onSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();

    const newTask = {
      id: generateRandomId(),
      text: task,
      isCompleted: false
    };

    if (isTaskExist) {
      onAddTask(newTask);
      setTask('');
    }
  };

  return (
    <header className="header">
      <input
        type="checkbox"
        id="toggle-all-checkbox"
        checked={isEveryTaskCompleted}
        onChange={onToggleEveryTaskClick}
      />
      <label htmlFor="toggle-all-checkbox" className="toggle-all">
        <span>❯</span>
      </label>

      <form className="new-todo-form" onSubmit={onSubmit}>
        <div className="new-todo-wrapper">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="new-todo"
            value={task}
            onChange={onChange}
          />

          {isTaskExist && (
            <button className="add-new-todo">
              <EnterIcon />
            </button>
          )}
        </div>
      </form>
    </header>
  );
};
