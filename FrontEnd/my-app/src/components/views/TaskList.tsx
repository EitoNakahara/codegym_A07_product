import React, { useState } from "react";
import InputTodo from "../utils/Todo/InputTodo";
import InCompleteTodo from "../utils/Todo/InCompleteTodo";
import CompleteTodo from "../utils/Todo/CompleteTodo";
import "../style/TaskList.css";

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

    const undoTask = (index: any) => {
        const newCompleteTodos = [...completeTodos];
        newCompleteTodos.splice(index, 1);

        const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];
        setIncompleteTodos(newInCompleteTodos);
        setCompleteTodos(newCompleteTodos);
    }

    return (
        <>
            <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={addTask} />
            <InCompleteTodo incompleteTodos={incompleteTodos} completeCLick={completeTask} deleteClick={deleteTask} />
            <CompleteTodo completeTodos={completeTodos} undoCLick={undoTask} />
        </>
    );
}

export default TaskList