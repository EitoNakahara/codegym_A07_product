import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }: { setIsAuth: any }) => {
    const navigate = useNavigate();

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
            <p>ログインして始める</p>
            <button onClick={loginGoogle}>Googleでログイン</button>
        </div>
    )
}

export default Login