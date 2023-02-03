import {useRouter} from "next/router";
import {useEffect} from "react";


const Error = () => {
    const router = useRouter();

    useEffect(() => {
       setTimeout(() => {
           // редеректит на главную
           router.push('/')
       }, 3000)
    }, [router])
    return <>
        <h1>404</h1>
        <h2>Something is going wrong...</h2>
    </>
}

export default Error;