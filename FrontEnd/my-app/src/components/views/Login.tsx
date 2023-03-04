import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate, Link, useFormAction } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import "../style/Login.css";

const Login = ({ setIsAuth }: { setIsAuth: any }) => {
    const navigate = useNavigate();

    const loginUser = () => {
        console.log('login');
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
}

export default Login