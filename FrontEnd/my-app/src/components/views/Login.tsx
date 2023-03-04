import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate, Link, useFormAction } from "react-router-dom";
import { useState, useEffect } from "react";


import "../style/Login.css";

const Login = ({ setIsAuth }: { setIsAuth: any }) => {
    /*const navigate = useNavigate();*/

    /*const loginUser = () => {
        console.log('login');*/

        const [mail, setMail] = useState("");
        const [pass, setPass] = useState("");
        const [error, setError] = useState(false);

        useEffect(() => {
            console.log("change");
        })

        const URL = "http://localhost:8080/login";
    


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
    }

    /*
    const loginGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential == null) {
                    throw credential;
                }
                localStorage.setItem("isAuth", "true");
                setIsAuth(true);
                navigate("/logout");
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    return (
        <div>
            <p>ログイン</p>
            <div className="mail-login">
                <input placeholder="メールアドレス" />
                <input placeholder="パスワード" />
                <button className="login-button" onClick={loginUser}>ログイン</button>
                <p>アカウントをお持ちでない場合は<Link to={'/signup'}>こちら</Link>から</p>
            </div>
            <p>その他のログイン</p>
            <div className="google-login">
                <button onClick={loginGoogle}>SIGN IN WITH GOOGLE</button>
            </div>
        </div>
    )
    */

export default Login