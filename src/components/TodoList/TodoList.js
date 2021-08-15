import s from "./TodoList.module.css";
import { TodoSection } from "..";
import { useKeyboard, useTodo } from "../../hooks";
import { todoUtils } from "../../utils";
import {
  addTodo,
  removeTodo,
  addIndent,
  removeIndent,
  prevFocus,
  nextFocus,
} from "../../actions/todoActions";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";

const TodoList = () => {
  const [{ todos, focused }, dispatch] = useTodo(true);

  useKeyboard(
    (actionName) => {
      if (!focused) return;
      const action = {
        enter: addTodo(),
        arrowUp: prevFocus(),
        arrowDown: nextFocus(),
        shiftTab: removeIndent(),
        tab: addIndent(),
        remove: removeTodo(),
      }[actionName];
      dispatch(action);
    },
    [focused]
  );

  return (
    <div className={s.container}>
      {todoUtils.todosWithChild(todos).map((item) => (
        <TodoSection key={item.id} {...item} />
      ))}
      <button
        className={s.plusButton}
        onClick={() => dispatch(addTodo("last"))}
      >
        <Plus />
      </button>
    </div>
  );
};

export { TodoList };
