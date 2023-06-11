import React, { useState, useRef, useEffect } from 'react';
import { Task } from 'Src/models/task';
import { classnames } from 'Src/helpers/classnames';
import { EnterIcon } from 'Src/components/SvgIcons/EnterIcon';
import './TasksListItem.scss';

interface Props {
  task: Task;
  isLastTask: boolean;
  onChange: (id: string, text: string) => void;
  onComplete: (task: Task) => void;
  onRemove: (task: Task) => void;
}

export const TasksListItem = (props: Props) => {
  const { task, isLastTask, onComplete, onRemove, onChange } = props;
  const { text, isCompleted, id } = task;

  const changeTaskRef = useRef<HTMLInputElement>();

  const [newTaskText, setNewTaskText] = useState(text);
  const [isEditMode, setIsEditMode] = useState(false);

  const isTaskTextExist = newTaskText !== '';
  const isTaskTextChanged = text !== newTaskText;

  const classes = classnames({
    'tasks-list-item': true,
    'tasks-list-item--editing': isEditMode,
    'tasks-list-item--last': isLastTask,
    'tasks-list-item--completed': isCompleted && !isEditMode
  });

  useEffect(() => {
    if (isEditMode && typeof changeTaskRef.current !== 'undefined') {
      changeTaskRef.current.focus();
    }
  }, [isEditMode]);

  const onChangeTaskText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;

    setNewTaskText(value);
  };

  const onSubmitChangedTask = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (isTaskTextExist && isTaskTextChanged) {
      onChange(id, newTaskText);
      setIsEditMode(false);
    }
  };

  const onBlur = (event: any): void => {
    console.log(event.target);

    setNewTaskText(text);
    setIsEditMode(false);
  };

  return (
    <li className={classes} onDoubleClick={() => setIsEditMode(true)}>
      <div className="tasks-list-item__text">
        <input
          type="checkbox"
          id={`toggle-task-${id}`}
          className="toggle-task"
          checked={isCompleted}
          onChange={() => onComplete(task)}
        />
        <label htmlFor={`toggle-task-${id}`} onDoubleClick={(event) => event.stopPropagation()} />

        <span>{text}</span>

        <button className="tasks-list-item__remove" onClick={() => onRemove(task)}>
          ×
        </button>
      </div>

      <form className="tasks-list-item__edit" onSubmit={onSubmitChangedTask}>
        <input type="text" ref={changeTaskRef} value={newTaskText} onBlur={onBlur} onChange={onChangeTaskText} />

        <button className="tasks-list-item__edit-enter" onMouseDown={onSubmitChangedTask}>
          <EnterIcon />
        </button>
      </form>
    </li>
  );
};
