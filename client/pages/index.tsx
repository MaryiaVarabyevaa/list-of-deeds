import {getAllUsers, registration} from "@/http/userAPI";
import {GetServerSideProps} from "next";
import {useState} from "react";


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
        <>
            <form style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '300px'}}>
                <input
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    value={nickname}
                    placeholder="nickname"
                    onChange={(e) => setNickname(e.target.value)}
                />
                <button onClick={handleSubmit}>Send</button>
            </form>
        </>
    )
}


export default Registration;