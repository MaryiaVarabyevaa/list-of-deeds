import {useEffect, useState} from "react";
import {TiPencil} from "react-icons/ti";
import {BsTrash} from "react-icons/bs";
import {completeItem, createItem, deleteItem, getList, updateItem} from "@/http/listAPI";
import {IList} from "@/types/list";
import FriendsList from "@/components/FriendsList";
import {useSelector} from "react-redux";
import {IUserState} from "@/types/user";

const ToDoList = () => {
    const [list, setList] = useState<IList[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState<IList | null>(null);
    const [newTask, setNewTask] = useState("");
    const userId = useSelector((state: IUserState) => state.userId);
    const [openFriendsView, setOpenFriendsView] = useState(false);
    const [showList, setShowList] = useState(true);

    const getFullList = async () => {
        const list = await getList(userId);
        setList(list);
    }


    useEffect(() => {
       if (userId) {
           getFullList();
       }
    }, [])


    const handleAddTodo = async (task: string) => {
        if (task.trim().length === 0) {
            alert("Please enter a task");
        } else {
            const newItem = await createItem(userId, task);
            setList([...list, newItem]);
            setNewTask("");
            setShowModal(false);
        }
    };

    const handleUpdateToDoList = async (id: string, task: string) => {
        if (task.trim().length === 0) {
            alert("Please enter a task");
        } else {
            let item = list.find((item) => item._id == id );
            if (item) {
                const oldList = list.filter((item) => item._id !== id );
                item.list = task;
                setList([...oldList, item]);
                const newItem = await updateItem(id, task);
                setShowModal(false);
            }
        }
    };

    const handleDeleteToDo = async (id: string) => {
        const updatedToDoList = list.filter((todo) => todo._id != id);
        const deletedItem = await deleteItem(id);
        setList(updatedToDoList)
    };

    const handleToggleCompleted = async (id: string) => {
        let item = list.find((item) => item._id == id );
        if (item) {
            const oldList = list.filter((item) => item._id !== id );
            item.isCompleted = !item.isCompleted;
            setList([...oldList, item]);
            const completeTask = await completeItem(id, item.isCompleted );
        }

    };

    const handleChange = (e: any) => {
        setNewTask(e.target.value)
    }

    return (
        <>
            {showModal && (
                <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
                    <div className="flex flex-col gap-5 bg-white p-8 rounded-md">
                        <input
                            className="pl-2 outline-none border-2 py-2 px-3 rounded-2xl"
                            type="text"
                            value={newTask}
                            onChange={handleChange}
                            placeholder={currentTask ? "Update your task here" : "Enter your task here"}
                        />
                        <div className="flex justify-between gap-3">
                            <>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        currentTask? handleUpdateToDoList(currentTask._id, newTask) : handleAddTodo(newTask)
                                    }}
                                    className="bg-indigo-600 text-white py-3 px-10  rounded-2xl"
                                >
                                    {
                                        currentTask? "Save" : "Add"
                                    }
                                </button>
                                <button
                                    className="bg-Tangaroa rounded-2xl text-white py-3 px-10"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </>
                        </div>
                    </div>
                </div>
            )}
            <div className="h-screen items-center flex gap-3 mt-11 flex-col">
                <h1 className="text-gray-800 font-bold text-2xl mb-1">Rather, add a good deed to your list!</h1>
                <div className="flex justify-center items-center bg-white w-1/3 gap-3 ">
                    <button
                        type="submit"
                        className="block bg-indigo-600 mt-4 py-2 w-1/2 rounded-2xl text-white font-semibold mb-2"
                        onClick={() => {
                            showList? setShowModal(true) :
                                setShowList(true);
                                setOpenFriendsView(false);
                        }}
                    >
                        {
                            showList? "Add Deed" : "Show list"
                        }
                    </button>
                    <button
                        type="submit"
                        className="block w-full bg-indigo-600 mt-4 w-1/2 py-2 rounded-2xl text-white font-semibold mb-2"
                        onClick={() => {
                            setOpenFriendsView(!openFriendsView);
                            setShowModal(false)
                            setShowList(false);
                        }}
                    >
                        Friends
                    </button>
                </div>
                {
                    showList && list.length === 0? <h1>Тут еще нет никаких добрых дел :(</h1> : <div className="flex justify-center items-center bg-white w-1/3 gap-3 flex-col  py-10">
                        {list.map((todo) => (
                            <div
                                key={todo._id}
                                className="flex items-center justify-between bg-gray-400 mx-auto w-full rounded-2xl p-4 gap-5"
                            >
                                <div
                                    className={`${
                                        todo.isCompleted
                                            ? "line-through text-white"
                                            : "text-white"
                                    }`}
                                    onClick={() => {
                                        handleToggleCompleted(todo._id);
                                    }}
                                >
                                    {todo.list}
                                </div>
                                <div>
                                    <button
                                        className="text-white p-1 rounded-md ml-2"
                                        onClick={() => {
                                            setShowModal(true);
                                            setCurrentTask(todo);
                                            setNewTask(todo.list);
                                        }}
                                    >
                                        <TiPencil />
                                    </button>
                                    <button
                                        className=" text-white p-1 rounded-md ml-2"
                                        onClick={() => handleDeleteToDo(todo._id)}
                                    >
                                        <BsTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                }
                {
                    openFriendsView && <FriendsList />
                }
            </div>

        </>
    )
}

export default ToDoList;