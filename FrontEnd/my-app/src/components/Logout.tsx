import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Logout = ({ setIsAuth }: { setIsAuth: any }) => {
    const navigate = useNavigate();

    const logOut = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
                setIsAuth(false);
                navigate("/login");
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <p>ログアウトする</p>
            <button onClick={logOut}>ログアウト</button>
        </div>
    )
}

export default Logout