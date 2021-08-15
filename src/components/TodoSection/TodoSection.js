import s from "./TodoSection.module.css";
import { TodoItem } from "..";

const TodoSection = ({ todos, ...props }) => {
  return (
    <div className={s.container}>
      <TodoItem {...props} />
      {!todos.length ? null : (
        <div className={s.list}>
          {todos.map((item) => (
            <TodoSection key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export { TodoSection };
