import Task from "./Task";
import "../../style/task/InCompleteTodo.css"

const InCompleteTodo = (props: { incompleteTodos: any; completeCLick: any; deleteClick: any; }) => {
    const { incompleteTodos, completeCLick, deleteClick } = props;
    return (
        <div className="incomplete_area">
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