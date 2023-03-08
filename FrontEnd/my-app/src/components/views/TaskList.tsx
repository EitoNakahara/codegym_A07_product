import React, { useState } from "react";
import InputTodo from "../utils/Todo/InputTodo";
import InCompleteTodo from "../utils/Todo/InCompleteTodo";
import "../style/task/TaskList.css";

const TaskList = () => {
    const [todoText, setTodoText] = useState('');
    const [incompleteTodos, setIncompleteTodos] = useState(["aaa"]);
    const [completeTodos, setCompleteTodos] = useState(["aaa"]);

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

        const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
        setIncompleteTodos(newInCompleteTodos);
        setCompleteTodos(newCompleteTodos);
    }

    return (
        <>
            <InCompleteTodo incompleteTodos={incompleteTodos} completeCLick={completeTask} deleteClick={deleteTask} />
            <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={addTask} />
        </>
    );
}

export default TaskList