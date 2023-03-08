import "../../style/task/Task.css"

const Task = (props: { todo: any, index: any, completeCLick: any; deleteClick: any; }) => {
    const { todo, index, completeCLick, deleteClick } = props;
    return (
        <div key={todo} className="list_row">
            <li>{todo}</li>
            <div className="button_list">
                <button onClick={() => completeCLick(index)}>完了</button>
                <button onClick={() => deleteClick(index)}>削除</button>
            </div>
        </div>
    )
}

export default Task