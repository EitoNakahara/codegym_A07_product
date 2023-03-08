import React, { useState } from "react";
import InputTodo from "../utils/Todo/InputTodo";
import InCompleteTodo from "../utils/Todo/InCompleteTodo";
import "../style/task/TaskList.css";

const TaskList = ({ setCompleteTodos }: { setCompleteTodos: any }) => {
    const [todoText, setTodoText] = useState('');
    const [incompleteTodos, setIncompleteTodos] = useState(["見本"]);
    const [towerTodos, setTowerTodos] = useState(["見本"]);

    const onChangeTodoText = (event: any) => setTodoText(event.target.value);

    const addTask = () => {
        if (todoText === '') return;
        const newTodos = [...incompleteTodos, todoText];
        setIncompleteTodos(newTodos);
        setTodoText('');
    };

    const deleteTask = (index: any) => {
        const newTodos = [...incompleteTodos];
        newTodos.splice(index, 1);
        setIncompleteTodos(newTodos);
    }

    const completeTask = (index: any) => {
        const newInCompleteTodos = [...incompleteTodos];
        newInCompleteTodos.splice(index, 1);

        const newCompleteTodos = [...towerTodos, incompleteTodos[index]];
        setIncompleteTodos(newInCompleteTodos);
        setCompleteTodos(newCompleteTodos);
    }

    return (
        <>
            <p className="title">今日やること一覧</p>
            <InCompleteTodo incompleteTodos={incompleteTodos} completeCLick={completeTask} deleteClick={deleteTask} />
            <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={addTask} />
        </>
    );
}

export default TaskList