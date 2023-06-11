import React from 'react';
import { Task } from 'Src/models/task';
import { Filter } from 'Src/models/filter';
import { FilterType } from 'Src/types/filter';
import { FILTER_BY, FILTER_BY_MAP } from 'Src/consts/filter';
import { classnames } from 'Src/helpers/classnames';
import './Footer.scss';

interface Props {
  tasks: Task[];
  filterBy: string;
  onClearCompletedClick: () => void;
  onChangeFilter: (filter: string) => void;
}

export const Footer = (props: Props): JSX.Element => {
  const { tasks, filterBy, onClearCompletedClick, onChangeFilter } = props;

  const activeTasks = tasks.filter((item) => !item.isCompleted);
  const completedTasks = tasks.filter((item) => item.isCompleted);

  const completedTasksCount = completedTasks.length;
  const isCompletedTasksExist = completedTasksCount > 0;

  const activeTasksCount = activeTasks.length;

  const clearButtonClasses = classnames({
    'footer__clear-completed': true,
    'footer__clear-completed--active': isCompletedTasksExist
  });

  const getFilters = (): Filter[] => {
    return Object.values(FILTER_BY).map((item: FilterType) => {
      return {
        text: FILTER_BY_MAP[item],
        value: item,
        isActive: filterBy === item
      };
    });
  };

  const renderFilterButtons = (): JSX.Element[] => {
    const filters = getFilters();

    return filters.map((item) => {
      const { text, value, isActive } = item;

      const classes = classnames({
        'filter-item': true,
        'filter-item--active': isActive
      });

      return (
        <li key={value} className={classes} onClick={() => onChangeFilter(value)}>
          {text}
        </li>
      );
    });
  };

  const renderItemsLeftText = (): string => {
    const plural = activeTasksCount === 1 ? 'item' : 'items';

    return `${activeTasksCount} ${plural} left`;
  };

  return (
    <footer className="footer">
      <div className="footer__items-left">{renderItemsLeftText()}</div>

      <div className="footer__filter">
        <ul className="filter-item-list">{renderFilterButtons()}</ul>
      </div>

      <div className={clearButtonClasses} onClick={onClearCompletedClick}>
        Clear completed
      </div>
    </footer>
  );
};
