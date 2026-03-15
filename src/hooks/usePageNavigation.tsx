import { useNavigate } from 'react-router-dom';

export const usePageNavigation = () => {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate("/")
    }

    const goToDictionaries = () => {
        navigate("/dictionaries")
    }

    const openCardDetails = (id: number) => {
        navigate(`/card-details/${id}`)
    }

    return { goToHome, goToDictionaries, openCardDetails };
}