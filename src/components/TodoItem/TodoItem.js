/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

import s from "./TodoItem.module.css";
import { utils } from "../../utils";
import { useTodo } from "../../hooks";
import {
  changeFocus,
  changeTitle,
  toggleDone,
} from "../../actions/todoActions";

const TodoItem = ({ id, title, done }) => {
  const [{ focused }, dispatch] = useTodo(true);
  const __html = useRef(title).current;
  const inputRef = useRef();

  useEffect(() => {
    const thisFocused = inputRef.current === document.activeElement;
    if (focused === id && !thisFocused) {
      inputRef.current.focus();
      utils.replaceCaret(inputRef.current);
    }
  }, [focused]);

  return (
    <div className={`${s.container} ${done && s.done}`}>
      <span
        className={s.circle}
        onClick={() => dispatch(toggleDone(id))}
      ></span>
      <div
        contentEditable
        ref={inputRef}
        className={s.input}
        onInput={() => dispatch(changeTitle(inputRef.current.innerText))}
        onFocus={() => dispatch(changeFocus(id))}
        onBlur={() => {
          dispatch(changeFocus(null));
          inputRef.current.innerHTML = title;
        }}
        dangerouslySetInnerHTML={{ __html }}
      ></div>
    </div>
  );
};

export { TodoItem };
