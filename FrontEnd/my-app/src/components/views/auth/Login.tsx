import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";


import "../../style/auth/Login.css";

const Login = ({ setIsAuth }: { setIsAuth: any }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPass, setCheckPass] = useState(false);
    const [inputError, setInputError] = useState(false);

    const URL = 'http://localhost:8080/login';

    const inputEmail = (event: any) => {
        if (email != null) {
            setEmail(event.target.value);
            setCheckEmail(false);
        }
        else { setCheckEmail(true); }
    }

    const inputPass = (event: any) => {
        if (pass != null) {
            setPass(event.target.value);
            setCheckPass(false);
        }
        else { setCheckPass(true); }
    }


    const pushLogin = () => {
        // if (inputError) {
        //     return
        // }
        // const response = await fetch(URL, {
        //     mode: "cors",
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ mail: email, pass: pass }) // フロントエンドから送信するデータ
        // });
        // const json = await response.json(); // バックエンドから受信したデータ

        // setIsAuth[json["isAuth"]];
        // console.log(json["isAuth"]);
        setIsAuth(true);
        navigate('/home')
    }

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
                <input onChange={inputEmail} placeholder="メールアドレス" />
                {checkEmail ? <p>メールアドレスが不十分です</p> : ""}
                <input onChange={inputPass} placeholder="パスワード" />
                {checkPass ? <p>パスワードが不十分です</p> : ""}
                <button className="login-button" onClick={pushLogin}>ログイン</button>
                {inputError ? <p>全て入力してください</p> : ""}
                <p>アカウントをお持ちでない場合は<Link to={'/signup'}>こちら</Link>から</p>
            </div >
            <p>その他のログイン</p>
            <div className="google-login">
                <button onClick={loginGoogle}>SIGN IN WITH GOOGLE</button>
            </div>
        </div >
    )
}
export default Login