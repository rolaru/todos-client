export const TodosActionNames = {
  SetTodos: 'set-todos',
  CreateTodo: 'create-todo',
  UpdateTodo: 'update-todo',
  DeleteTodo: 'delete-todo'
};

export const generateTodosActions = dispatch => ({
  setTodos: todos => dispatch({
    type: TodosActionNames.SetTodos,
    payload: todos
  }),

  createTodo: todo => dispatch({
    type: TodosActionNames.CreateTodo,
    payload: todo
  }),

  updateTodo: (id, isDone) => dispatch({
    type: TodosActionNames.UpdateTodo,
    payload: {
      id, isDone
    }
  }),

  deleteTodo: id => dispatch({
    type: TodosActionNames.DeleteTodo,
    payload: id
  })
});