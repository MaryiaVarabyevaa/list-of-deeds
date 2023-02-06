import {useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "@/types/user";
import {findUser, login, registration} from "@/http/userAPI";
import {useDispatch} from "react-redux";
import {addUserAction} from "@/store/userStore";
import {useRouter} from "next/router";
import {emailValidation, nicknameValidation, passwordValidation} from "@/components/Auth/validation";
import Alert from "@/components/Alert";


const AuthForm = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    const dispatch = useDispatch();
    const router = useRouter()
    const { handleSubmit, control, formState: { errors } } = useForm<IUser>({
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
            if (!isAuth) {
                user = await login({
                    email: data.email,
                    password: data.password
                })
                user = await findUser(data.email);
            } else {
                user = await registration(data);
            }
            dispatch(addUserAction({userId: isAuth? user.sub : user._id}))
            await router.push('/main');

        } catch (err: any) {
            setErrorText(err.response.data.error)
        }
    }

    console.log(errorText.length)
    return <>
        <div className="h-screen flex justify-center">
            <div className="flex justify-center items-center bg-white mx-auto my-auto w-screen h-screen  flex-col">
                <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                {
                    errorText.length !== 0 && <Alert errorText={errorText}/>
                }
                <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
                    {
                       isAuth && <div className={`flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ${errors.nickname? 'border-red-600' : ''}`} >
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" stroke="currentColor">
                                <title/>
                                <g id="about"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/>
                                </g>
                            </svg>
                            <Controller
                                control={ control }
                                name='nickname'
                                rules={ nicknameValidation }
                                render={({
                                             field: {onChange, value}
                                         }) => (
                                    <input
                                        className="pl-2 outline-none border-none w-full"
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                        placeholder="Nickname"
                                    />
                                )}
                            />
                        </div>

                    }

                    <div className={`flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ${errors.email? 'border-red-600' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <Controller
                            control={ control }
                            name='email'
                            rules={ emailValidation }
                            render={({
                                         field: {onChange, value}
                                     }) => (
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Email Address"
                                />
                            )}
                        />

                    </div>
                    <div className={`flex items-center border-2 py-2 px-3 rounded-2xl mb-4 ${errors.password? 'border-red-600' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <Controller
                            control={ control }
                            name='password'
                            rules={ passwordValidation }
                            render={({
                                         field: {onChange, value}
                                     }) => (
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="password"
                                    value={value}
                                    onChange={onChange}
                                    placeholder="Password" />
                            )}
                        />
                    </div>
                    <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
                        {
                            isAuth? "Sign up" : "Sign in"
                        }
                    </button>
                    <span
                        className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                        onClick={() => setIsAuth(!isAuth)}
                    >{
                        isAuth? "Already have an account? Sign in": "Don't have an account? Sign Up"
                    }</span>
                </form>
            </div>
        </div>
    </>
}
export default AuthForm;