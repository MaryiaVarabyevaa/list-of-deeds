import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addTodoAction, setTodoAction, sortTodoAction, toggleAction, updateTodoAction} from "@/store/listStore";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import empty from "../assets/empty.jpg";
import {completeItem, createItem, deleteItem, getList, updateItem} from "@/http/listAPI";
import {IList} from "@/types/list";
import {isAwaitExpression} from "tsutils";

interface ITodoList {
    task: string,
    id: string,
    completed: boolean
}

interface IListState {
    todoList: ITodoList[],
    sortCriteria: string;
}

const ToDoList = () => {
    const [userId, setUserId] = useState('63de13dee71302469a79b225');
    const [list, setList] = useState<IList[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState<IList | null>(null);
    const [newTask, setNewTask] = useState("");
    const [sortCriteria, setSortCriteria] = useState('All');

    const getFullList = async () => {
        const list = await getList('63de13dee71302469a79b225');
        setList(list);
    }
    useEffect(() => {
        getFullList();
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

    const handleSort = (sortCriteria: string) => {
        setSortCriteria(sortCriteria);
    }


    const sortToDoList = list.filter((todo) => {
        if (sortCriteria === "All") return true;
        if (sortCriteria === "Completed" && todo.isCompleted) return true;
        if (sortCriteria === "Not Completed" && !todo.isCompleted) return true;
        return false;
    });

    const handleToggleCompleted = async (id: string) => {
        let item = list.find((item) => item._id == id );
        if (item) {
            const oldList = list.filter((item) => item._id !== id );
            item.isCompleted = !item.isCompleted;
            setList([...oldList, item]);
            const completeTask = await completeItem(id, item.isCompleted );
        }

    };

    console.log(list);

    return (
        <div>
            {showModal && (
                <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
                    <div className="bg-white p-8 rounded-md">
                        <input
                            className="border p-2 rounded-md outline-none mb-8"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            placeholder={
                                currentTask ? "Update your task here" : "Enter your task here"
                            }
                        />
                        <div className="flex justify-between">
                            {currentTask ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setShowModal(false);
                                            handleUpdateToDoList(currentTask._id, newTask);
                                        }}
                                        className="bg-sunsetOrange text-white py-3 px-10 rounded-md"
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-Tangaroa rounded-md text-white py-3 px-10"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="bg-Tangaroa rounded-md text-white py-3 px-10"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-sunsetOrange text-white py-3 px-10 rounded-md"
                                        onClick={() => {
                                            handleAddTodo(newTask);
                                            setShowModal(false);
                                        }}
                                    >
                                        Add
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className=" flex items-center justify-center flex-col">
                {list.length === 0 ? (
                    <div className="mb-6">
                        <div className="sm:w-[500px] sm:h-[500px] min-w-[250px] min-[250px]">
                            <img src={empty.src} alt="" />
                        </div>
                        <p className="text-center text-Gray">
                            You have no todo's, please add one.
                        </p>
                    </div>
                ) : (
                    <div className="container mx-auto mt-6">
                        <div className="flex justify-center mb-6">
                            <select
                                onChange={(e) => handleSort(e.target.value)}
                                className="p-1 outline-none text-sm"
                            >
                                <option value="All" className="text-sm">
                                    All
                                </option>
                                <option value="Completed" className="text-sm">
                                    Completed
                                </option>
                                <option value="Not Completed" className="text-sm">
                                    Not Completed
                                </option>
                            </select>
                        </div>
                        <div>
                            {sortToDoList.map((todo) => (
                                <div
                                    key={todo._id}
                                    className="flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-md p-4"
                                >
                                    <div
                                        className={`${
                                            todo.isCompleted
                                                ? "line-through text-greenTeal"
                                                : "text-sunsetOrange"
                                        }`}
                                        onClick={() => {
                                            handleToggleCompleted(todo._id);
                                        }}
                                    >
                                        {todo.list}
                                    </div>
                                    <div>
                                        <button
                                            className="bg-blue-500 text-white p-1 rounded-md ml-2"
                                            onClick={() => {
                                                setShowModal(true);
                                                setCurrentTask(todo);
                                                setNewTask(todo.list);
                                            }}
                                        >
                                            <TiPencil />
                                        </button>
                                        <button
                                            className="bg-sunsetOrange text-white p-1 rounded-md ml-2"
                                            onClick={() => handleDeleteToDo(todo._id)}
                                        >
                                            <BsTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <button
                    className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    Add Task
                </button>
            </div>
        </div>
    )
}

export default ToDoList;

// localStorage.clear()