const Alert = ({errorText}: {errorText: string}) => {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700  p-4" role="alert">
            <p className="font-bold">Error!</p>
            <p>{errorText}</p>
        </div>
    )
}

export default Alert;