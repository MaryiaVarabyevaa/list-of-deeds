import ToDoList from "@/components/ToDoList";
import Heading from "@/components/Heding";

const Main = () => {
    return (
        <div className="App font-Poppins container py-16 px-6 min-h-screen mx-auto">
            <Heading />
            <ToDoList />
        </div>
    )
}

export default Main;