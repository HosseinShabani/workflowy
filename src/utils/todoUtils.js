class TodoUtils {
  todosWithChild(todos, parent = 0) {
    return todos
      .filter((item) => item.parent === parent)
      .map((item) => ({
        ...item,
        todos: this.todosWithChild(todos, item.id),
      }));
  }
}

const todoUtils = new TodoUtils();
export { todoUtils };
