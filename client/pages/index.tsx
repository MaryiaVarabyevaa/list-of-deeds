import AuthForm from "@/components/Auth/AuthForm";


const Registration = () => {

    return (
        <div className="m-auto flex w-1/2 flex-col gap-4">
            <h1 className="bold text-2xl underline">Registration Form</h1>
            < AuthForm/>
        </div>
    )
}

// localStorage.clear()

export default Registration;