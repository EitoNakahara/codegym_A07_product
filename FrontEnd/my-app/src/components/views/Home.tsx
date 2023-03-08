import "../style/Home.css";
import CompleteTodo from "../utils/Todo/CompleteTodo";

const Home = ({ completeTodos }: { completeTodos: any }) => {
  return (
    <>
      <p className="title">今日やること一覧</p>
      <CompleteTodo completeTodos={completeTodos} />
    </>
  );
}

export default Home