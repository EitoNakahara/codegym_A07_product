import React from "react";
import Task from "./Task";

const InCompleteTodo = (props: { incompleteTodos: any; completeCLick: any; deleteClick: any; }) => {
    const { incompleteTodos, completeCLick, deleteClick } = props;
    return (
        <div className="incomplete_area">
            <p className="title">今日やること一覧</p>
            <ul>
                {incompleteTodos.map((todo: React.Key, index: any) => {
                    return (
                        <Task todo={todo} index={index} completeCLick={completeCLick} deleteClick={deleteClick} />
                    );
                })}
            </ul>
        </div >
    );
};
export default InCompleteTodo;