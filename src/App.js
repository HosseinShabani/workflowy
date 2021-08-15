import { TodoProvider } from "./contexts";
import { Home } from "./pages";

const App = () => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");

  return (
    <TodoProvider todos={todos}>
      <Home />
    </TodoProvider>
  );
};

export default App;
