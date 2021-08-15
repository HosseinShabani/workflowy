import s from "./Home.module.css";
import { TodoList } from "../../components";

const Home = () => {
  return (
    <div className={s.container}>
      <TodoList />
    </div>
  );
};

export default Home;
