import React, { useState } from "react";
import InputTodo from "./components/InputTodo";
import InCompleteTodo from "./components/InCompleteTodo";
import CompleteTodo from "./components/CompleteTodo";
import "./style.css";

const App = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState(["aaa"]);
  const [completeTodos, setCompleteTodos] = useState(["aaa"]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const addTask = () => {
    if (todoText === '') return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText('');
  };

  const deleteTask = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  }

  const completeTask = (index) => {
    const newInCompleteTodos = [...incompleteTodos];
    newInCompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  }

  const undoTask = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  }

  return (
    <>
      <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={addTask} />
      <InCompleteTodo incompleteTodos={incompleteTodos} completeCLick={completeTask} deleteClick={deleteTask}/>
      <CompleteTodo completeTodos={completeTodos} undoCLick={undoTask}/>
    </>
  );
};
export default App;