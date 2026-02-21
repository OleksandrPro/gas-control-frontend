import { useParams } from "react-router-dom"

interface CardProps {
    id: number
}

export const CardDetails = () => {
    const {id} = useParams()

    return (
        <div>
            <h1>CardDetails Page</h1>
            <p>ID: {id}</p>
        </div>
    )
}