import "./style/CreatePost.css";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const navigate = useNavigate();

    const sendPost = async () => {
        await addDoc(collection(db, "posts"), {
            title: title,
            postText: postText,
            author: {
                username: auth.currentUser?.displayName,
                id: auth.currentUser?.uid
            },
        })

        navigate("/");
    };

    return (
        <div className="createPostPage">
            <div className="postContainer">
                <h1>記事を投稿</h1>
                <div className="inputPost">
                    <div>タイトル</div>
                    <input
                        className="title"
                        type="text"
                        placeholder="タイトル記入"
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="inputPost">
                    <div>投稿記事</div>
                    <textarea
                        className="article"
                        placeholder="投稿内容を記入"
                        onChange={(e) => { setPostText(e.target.value) }}
                    />
                </div>
                <button className="postButton" onClick={sendPost}>投稿する</button>
            </div>
        </div>
    )
}

export default CreatePost