import { useNavigate } from 'react-router-dom';

export const usePageNavigation = () => {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate("/")
    }

    const goToDictionaries = () => {
        navigate("/dictionaries")
    }

    return { goToHome, goToDictionaries };
}