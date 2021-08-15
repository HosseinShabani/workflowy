/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import { utils } from "../utils";

const useKeyboard = (callback, deps) => {
  const keyPressed = useRef([]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, deps);

  const handleKeyPress = (e) => {
    keyPressed.current.push(e.key);
    const [first, second, third] = [...new Set(keyPressed.current)];
    let prevent = true;
    if (e.key === "Enter") {
      callback("enter");
    } else if (e.key === "ArrowUp") {
      callback("arrowUp");
    } else if (e.key === "ArrowDown") {
      callback("arrowDown");
    } else if (first === "Shift" && second === "Tab") {
      callback("shiftTab");
    } else if (e.key === "Tab") {
      callback("tab");
    } else if (
      first === (utils.isMac() ? "Meta" : "Control") &&
      second === "Shift" &&
      third === (utils.isMac() ? "Backspace" : "Delete")
    ) {
      callback("remove");
    } else {
      prevent = false;
    }
    prevent && e.preventDefault();
  };

  const handleKeyUp = () => {
    keyPressed.current = [];
  };
};

export { useKeyboard };
