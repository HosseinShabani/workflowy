const changeFocus = (id) => ({ type: "changeFocused", payload: id });

const addTodo = (payload) => ({ type: "addTodo", payload });

const removeTodo = (id) => ({ type: "removeTodo", payload: id });

const changeTitle = (title) => ({ type: "changeTitle", payload: title });

const addIndent = () => ({ type: "addIndent" });

const removeIndent = () => ({ type: "removeIndent" });

const prevFocus = () => ({ type: "prevFocus" });

const nextFocus = () => ({ type: "nextFocus" });

const toggleDone = (id) => ({ type: "toggleDone", payload: id });

export {
  changeFocus,
  addTodo,
  removeTodo,
  changeTitle,
  addIndent,
  removeIndent,
  prevFocus,
  nextFocus,
  toggleDone,
};
