import {getAllUsers, registration} from "@/http/userAPI";
import {GetServerSideProps} from "next";
import {useState} from "react";
import AuthForm from "@/components/AuthForm";


// @ts-ignore
// export const getServerSideProps: GetServerSideProps = async ( {req, res} ) => {
//     // let data = null;
//     // if (req.method === 'POST') {
//     //     data = await registration(res.bodu)
//     // }
//     // // const data = await getAllUsers();
//     // // if (!data) {
//     // //     return {
//     // //         notFound: true
//     // //     }
//     // // }
//     // return {
//     //     props: {
//     //         users: data
//     //     },
//     // }
//     // if (req.method === "POST") {
//     //     console.log(req.body);
//     //     // await registration();
//     // }
//     //
//     // return {
//     //     props: {
//     //         name: req.body?.name || "smeijer",
//     //         message: req.body ? "received!" : "",
//     //     }
//     // };
// }


// @ts-ignore
const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newUserInfo = {
            email, password, nickname
        };
        const newUser = await registration(newUserInfo);

    }

    return (
        <div className="m-auto flex w-1/2 flex-col gap-4">
            <h1 className="bold text-2xl underline">Registration Form</h1>
            < AuthForm/>
        </div>
    )
}


export default Registration;