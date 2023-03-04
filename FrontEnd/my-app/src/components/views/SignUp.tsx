import { useState, useEffect } from "react";

const SignUp = ({ setIsAuth }: { setIsAuth: any }) => {

    /*const navigate = useNavigate();*/

    /*const loginUser = () => {
        console.log('login');*/

    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("change");
    })

    const URL = "http://localhost:8080";

    const inputText = (event: any) => {
        console.log(event.target.value);
        setMail(event.target.value);
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
            body: JSON.stringify({ mail: mail, pass: pass }) // フロントエンドから送信するデータ
        })
        const json = await response.json() // バックエンドから受信したデータ

        setIsAuth[json["isAuth"]]
        console.log(json["isAuth"])
    }

    return (
        <>
            <input onChange={inputText} placeholder="name" />
            <input onChange={inputPass} placeholder="password" />
            <input onChange={validatePass} placeholder="rePassword" />
            {error ? "パスワードが異なっています" : ""}
            <button onClick={onClickHandler}>click</button>
        </>
    )
};

export default SignUp