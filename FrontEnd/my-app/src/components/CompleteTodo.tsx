import React from "react";

const CompleteTodo = (props: { completeTodos: any; undoCLick: any; }) => {
    const { completeTodos, undoCLick} = props;
    return (
        <div className="complete_area">
            <p className="title">完了のTODO</p>
            <ul>
                {completeTodos.map((todo:  React.Key, index: any) => {
                    return (
                        <div key={todo} className="list_row">
                            <li>{todo}</li>
                            <button onClick={() => undoCLick(index)}>戻す</button>
                        </div>
                    );
                })}
            </ul>
        </div >
    );
};
export default CompleteTodo;