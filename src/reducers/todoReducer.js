const todoReducer = (state, action) => {
  const item = state.todos.find(({ id }) => id === state.focused) || {};
  switch (action.type) {
    case "addTodo": {
      let todos = [...state.todos];
      const isLast = action.payload === "last";
      const id = `TODO_${todos.length + 1}_${Date.now()}`;
      const hasChilds = todos.filter(({ parent }) => parent === item.id).length;
      todos.splice(isLast ? todos.length : todos.indexOf(item) + 1, 0, {
        id,
        parent: isLast ? 0 : hasChilds ? item.id : item.parent,
        title: "",
        done: false,
      });
      return {
        ...state,
        todos,
        focused: id,
      };
    }
    case "removeTodo": {
      const removeId = action.payload || state.focused;
      let index = null;
      const todos = state.todos.filter(({ id }, i) => {
        if (id === removeId) index = i;
        return id !== removeId;
      });
      return {
        ...state,
        todos,
        focused: todos[index - 1]?.id || null,
      };
    }
    case "changeTitle": {
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === state.focused) {
            return { ...item, title: action.payload };
          }
          return item;
        }),
      };
    }
    case "toggleDone": {
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.payload) {
            return { ...item, done: !item.done };
          }
          return item;
        }),
      };
    }
    case "addIndent": {
      const todos = [...state.todos];
      const beforeTodos = todos.slice(0, todos.indexOf(item)).reverse();
      const parent =
        beforeTodos.find(({ parent }) => parent === item.parent)?.id ||
        item.parent;
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === state.focused) {
            return { ...item, parent };
          }
          return item;
        }),
      };
    }
    case "removeIndent": {
      const parent =
        state.todos.find(({ id }) => id === item.parent)?.parent || 0;
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === state.focused) {
            return { ...item, parent };
          }
          return item;
        }),
      };
    }
    case "changeFocused": {
      return {
        ...state,
        focused: action.payload,
      };
    }
    case "prevFocus":
    case "nextFocus": {
      const plus = action.type === "nextFocus" ? 1 : -1;
      const prev = state.todos[state.todos.indexOf(item) + plus]?.id;
      return {
        ...state,
        focused: prev || item.id,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export { todoReducer };
