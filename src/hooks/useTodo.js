import { useContext } from "react";

import { TodoContext } from "../contexts";

const useTodo = (withSetter = false) => {
  const { state, dispatch } = useContext(TodoContext);
  const data = {
    ...state,
  };

  return withSetter ? [data, dispatch] : data;
};

export { useTodo };
