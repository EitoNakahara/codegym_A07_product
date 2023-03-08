import { Link } from "react-router-dom";
import "./style/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faFilePen, faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ isAuth }: { isAuth: any }) => {
    return (
        <nav>
            <Link to="/task_list">
                <FontAwesomeIcon icon={faFilePen} />
                タスク一覧
            </Link>
            <Link to="/home">
                <FontAwesomeIcon icon={faHouse} />
                ホーム
            </Link>
            <Link to="/logout">
                <FontAwesomeIcon icon={faRightFromBracket} />
                ログアウト
            </Link>
        </nav>
    )
}

export default Navbar