import Button from './../../../components/button/button';

import './todos-filters.css';

export const Filters = {
  All: null, 
  Completed: 'completed',
  Incompleted: 'incompleted'
}

const TodosFilters = ({ activeFilter, setActiveFilter }) => {

  const getFilterClasses = (filter) => {
    return 'todos-filters__button' +
      (activeFilter === filter ? ' todos-filters__button--active' : '');
  };

  const onClearFilter = () => setActiveFilter(Filters.All);
  const onSelectCompletedFilter = () => setActiveFilter(Filters.Completed);
  const onSelectIncompletedFilter = () => setActiveFilter(Filters.Incompleted);

  return (
    <div className="todos-filters">
      <label className="todos-filters__label">Show:</label>

      <Button
        classes={getFilterClasses(Filters.All)}
        variant="link"
        onClick={onClearFilter}
      >
        All
      </Button>
      <Button
        classes={getFilterClasses(Filters.Completed)}
        variant="link"
        onClick={onSelectCompletedFilter}
      >
        Completed
      </Button>
      <Button
        classes={getFilterClasses(Filters.Incompleted)}
        variant="link"
        onClick={onSelectIncompletedFilter}
      >
        Incompleted
      </Button>
    </div>
  );
};

export default TodosFilters;