
const CompleteTodo = (props:{completeTodos: any}) => {
    const { completeTodos} = props;
    return (
        <div className="complete_area">
            <p className="title">完了のTODO</p>
            <ul>
                {completeTodos.map((todo:any) => {
                    return (
                        <div key={todo} className="list_row">
                            <li>{todo}</li>
                        </div>
                    );
                })}
            </ul>
        </div >
    );
};
export default CompleteTodo;