import {useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "@/types/user";
import {findUser, login, registration} from "@/http/userAPI";
import {emailValidation, nicknameValidation, passwordValidation} from "@/components/Auth/validation";
import Alert from "@/components/Alert";
import Input from "@/components/Input";
import {useDispatch} from "react-redux";
import {addUserAction} from "@/store/userStore";
import {useRouter} from "next/router";

const AuthForm = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [errorText, setErrorText] = useState('');
    const dispatch = useDispatch();
    const router = useRouter()
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
            let user: any = null;
            let isNewUser = false;
            if (!isAuth) {
                user = await login({
                    email: data.email,
                    password: data.password
                })
                user = await findUser(data.email);
            } else {
                user = await registration(data);
                isNewUser = true;
            }
            router.push('/main');
            dispatch(addUserAction({userId: isAuth? user.sub : user._id , isNewUser}))
        } catch (err: any) {
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
                            <Input value={value} onChange={onChange} placeholder={'Enter your nickname'} margin={2}/>
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
                        <Input value={value} onChange={onChange} placeholder={'Enter your email'} margin={2}/>
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
                        <Input
                            value={value}
                            onChange={onChange}
                            placeholder={'Enter your password'}
                            margin={2}
                            type="password"
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
                    className="bg-sunsetOrange text-white py-3 px-10 rounded-md"
                >
                    Submit
                </button>
            </div>
        </form>
        <a href='#' onClick={() => setIsAuth(!isAuth)}>{
            isAuth? "Already have an account? Sign in": "Don't have an account? Sign Up"
        }</a>
    </>
}
export default AuthForm;