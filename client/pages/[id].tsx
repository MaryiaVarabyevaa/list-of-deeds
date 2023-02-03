// @ts-ignore
export const getServerSideProps = async (context) => {
    const {id} = context.params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true
        }
    }
    // возращает пропсы для компонента
    return {
        props: {contacts: data},
    }
}

// @ts-ignore
const User = ({contacts}) => {

    const {name, email} = contacts || {};

    if (!contacts) {
        return <h1>Empty User</h1>
    }

    return <>
        <h1>{name}</h1>
       <div>
           <strong>Email: </strong>
           {email}
       </div>
    </>
}

export default User;