import "../../style/task/InputTodo.css"

const InputTodo = (props: { todoText: any; onChange: any; onClick: any; }) => {
    const { todoText, onChange, onClick } = props;
    return (
        <div className="input_area">
            <input id="add_text" placeholder="TODOを入力" value={todoText} onChange={onChange} />
            <button id="add_button" onClick={onClick}>追加</button>
        </div>
    );
};
export default InputTodo;