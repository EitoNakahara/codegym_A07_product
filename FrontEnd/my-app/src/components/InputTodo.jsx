import React from "react";

const InputTodo = (props) => {
    const { todoText, onChange, onClick } = props;
    return (
        <div className="input_area">
            <input id="add_text" placeholder="TODOを入力" value={todoText} onChange={onChange} />
            <button id="add_button" onClick={onClick}>追加</button>
        </div>
    );
};
export default InputTodo;