import "./style/CreatePost.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const navigate = useNavigate();

    const sendPost = async () => {
        navigate("/");
    };

    return (
        <div className="createPostPage">
            <div className="postContainer">
                <h1>タスクの追加</h1>
                <div className="inputPost">
                    <div>タスクの種類</div>
                    <input
                        className="kind"
                        type="text"
                        placeholder="タスクの種類"
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="inputPost">
                    <div>タスクの内容</div>
                    <textarea
                        className="content"
                        placeholder="タスクの内容を記入"
                        onChange={(e) => { setPostText(e.target.value) }}
                    />
                </div>
                <button className="postButton" onClick={sendPost}>タスクの追加</button>
            </div>
        </div>
    )
}

export default CreatePost