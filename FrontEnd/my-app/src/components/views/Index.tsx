import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Index = ({ isAuth }: { isAuth: any }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, [isAuth]);

    return (
        <></>
    )
}

export default Index