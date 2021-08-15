import { createContext, useReducer, useMemo, useEffect } from "react";

import { todoReducer } from "../reducers";

const TodoContext = createContext();

const TodoProvider = ({ children, todos = [] }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    focused: null,
    todos,
  });

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export { TodoProvider, TodoContext };
