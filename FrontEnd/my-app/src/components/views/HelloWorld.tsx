import { useState, useEffect } from "react";

const HelloWorld = () => {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);

    useEffect (() =>{
        console.log("change");
    },[name])

    const URL = "http://localhost:5000";

    const inputText = (event: any) => {
        console.log(event.target.value);
        setName(event.target.value);
    }

    const inputPass = (event: any) => {
        setPass(event.target.value);
    }

    const validatePass = (event: any) => {
        if (event.target.value != pass) {
            return setError(true)
        }
        return setError(false)
    }


    const onClickHandler = async () => {
        const response = await fetch(URL, {
            mode: "cors",
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name, pass: pass }) // フロントエンドから送信するデータ
        })
        const json = await response.json() // バックエンドから受信したデータ
        console.log(json["isAuth"])
    }

    return (
        <>
            <input onChange={inputText} placeholder="name" />
            <input onChange={inputPass} placeholder="password" />
            <input onChange={validatePass} placeholder="rePassword" />
            { error ? "パスワードが異なっています" : "" }
            <button onClick={onClickHandler}>click</button>
        </>
    )
}
export default HelloWorld