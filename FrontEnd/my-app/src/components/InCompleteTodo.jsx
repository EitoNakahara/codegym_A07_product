import React from "react";

const InCompleteTodo = (props) => {
    const { incompleteTodos, completeCLick, deleteClick } = props;
    return (
        <div className="incomplete_area">
            <p className="title">未完了のTODO</p>
            <ul>
                {incompleteTodos.map((todo, index) => {
                    return (
                        <div key={todo} className="list_row">
                            <li>{todo}</li>
                            <button onClick={() => completeCLick(index)}>完了</button>
                            <button onClick={() => deleteClick(index)}>削除</button>
                        </div>
                    );
                })}
            </ul>
        </div >
    );
};
export default InCompleteTodo;