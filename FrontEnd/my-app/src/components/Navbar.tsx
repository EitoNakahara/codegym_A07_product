import { Link } from "react-router-dom";
import "./style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faFilePen, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isAuth }: { isAuth: any }) => {
    return (
        <nav>
            <Link to="/helloworld">
                <FontAwesomeIcon icon={faHouse} />
                helloworld
            </Link>
            <Link to="/">
                <FontAwesomeIcon icon={faHouse} />
                ホーム
            </Link>
            <Link to="/create_post">
                <FontAwesomeIcon icon={faFilePen} />
                記事投稿
            </Link>
            {!isAuth ?
                (
                    <Link to="/login">
                        <FontAwesomeIcon icon={faRightToBracket} />
                        ログイン
                    </Link>
                ) :
                (
                    <Link to="/logout">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        ログアウト
                    </Link>
                )
            }
        </nav>
    )
}

export default Navbar