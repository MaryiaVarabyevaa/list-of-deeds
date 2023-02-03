import {useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "@/types/user";
import {login, registration} from "@/http/userAPI";
import {emailValidation, nicknameValidation, passwordValidation} from "@/components/Auth/validation";
import Alert from "@/components/Alert";

const AuthForm = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [errorText, setErrorText] = useState('');
    const { handleSubmit, control, reset, register, formState: { errors } } = useForm<IUser>({
        mode: 'onChange',
        defaultValues: {
            nickname: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<IUser> = async (data)=> {
        try {
            let user = null;
            if (!isAuth) {
                user = await login({
                    email: data.email,
                    password: data.password
                })
            } else {
                user = await registration(data);
            }
        } catch (err) {
            // @ts-ignore
            setErrorText(err.response.data.error)
        }
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            {
                errorText.length !== 0 && <Alert errorText={errorText} />
            }
            {
                isAuth && <div className="input-wrapper flex flex-col">
                    <label htmlFor="nickname">Nickname</label>
                    <Controller
                        control={ control }
                        name='nickname'
                        rules={ nicknameValidation }
                        render={({
                                     field: {onChange, value}
                                 }) => (
                            <input
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    {errors.nickname && <p className="text-xs italic text-red-500">{errors.nickname.message}</p>}
                </div>
            }
            <div className="input-wrapper flex flex-col">
                <label htmlFor="email">Email</label>
                <Controller
                    control={ control }
                    name='email'
                    rules={ emailValidation }
                    render={({
                                 field: {onChange, value}
                             }) => (
                        <input
                            type='email'
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.email && <p className="text-xs italic text-red-500">{errors.email.message}</p>}
            </div>

            <div className="input-wrapper flex flex-col">
                <label htmlFor="password">Password</label>
                <Controller
                    control={ control }
                    name='password'
                    rules={ passwordValidation }
                    render={({
                                 field: {onChange, value}
                             }) => (
                        <input
                            type="password"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.password && (
                    <p className="text-xs italic text-red-500">{errors.password.message}</p>
                )}
            </div>
            <div className="input-wrapper">
                <button
                    type="submit"
                    className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                >
                    Submit
                </button>
            </div>
        </form>
        <a href='@/components/Auth/AuthForm#' onClick={() => setIsAuth(!isAuth)}>{
            isAuth? "Already have an account? Sign in": "Don't have an account? Sign Up"
        }</a>
    </>
}
export default AuthForm;