export const todosReducers = {
  set: (state, payload) => {
    return {
      ...state,
      todos: payload
    };
  },

  create: (state, payload) => {
    return {
      ...state,
      todos: [
        ...state.todos,
        payload
      ]
    }
  },

  update: (state, payload) => {
    const { id, isDone } = payload;
    const newTodos = [ ...state.todos ];
    const updatedTodoIndex = state.todos.findIndex(todo => todo.id === id);

    if (updatedTodoIndex !== -1) {
      newTodos[updatedTodoIndex] = {
        ...newTodos[updatedTodoIndex],
        isDone
      };
    }

    return {
      ...state,
      todos: newTodos
    };
  },

  delete: (state, payload) => {
    const id = payload;
    const newTodos = [ ...state.todos ];
    const deletedTodoIndex = state.todos.findIndex(todo => todo.id === id);

    if (deletedTodoIndex !== -1) {
      newTodos.splice(deletedTodoIndex, 1);
    }

    return {
      ...state,
      todos: newTodos
    };
  }
};