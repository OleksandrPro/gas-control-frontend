interface SearchbarProps {
    placeHolder: string
    text: string
    onClick: () => void
}

export const Searchbar = ({placeHolder, text, onClick}: SearchbarProps) => {
    return (
        <div>
            <input placeholder={placeHolder}/>
            <button onClick={onClick}>{text}</button>
        </div>
    )
}