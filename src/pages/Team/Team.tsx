import { useNavigate, useParams } from "react-router"

export const Team = () => {
    const { name } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <p>Team {name}</p>
            <button onClick={() => navigate('/')}>Test navigation vers home</button>
        </div>
    )
}