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

    console.log(currentTask)

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
                            placeholder={"Enter your task here"}
                        />
                        <div className="flex justify-between gap-3">
                            <>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setNewTask('');
                                        setCurrentTask(null);
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
                                    onClick={() => {
                                        setShowModal(false);
                                        setNewTask('');
                                        setCurrentTask(null)
                                    }}
                                >
                                    Cancel
                                </button>
                            </>
                        </div>
                    </div>
                </div>
            )}
           <div className="App font-Poppins container py-16 px-6 min-h-screen mx-auto">
               <div className=" flex items-center justify-center flex-col">
                   <h1 className="text-gray-800 font-bold text-2xl mb-7">Start adding to your list of good deeds as soon as possible</h1>
                  <div className="flex gap-5">
                      <button
                          type="submit"
                          className="bg-indigo-600 text-center text-white py-3 px-10 rounded-md"
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
                          className="bg-indigo-600 text-center text-white py-3 px-10 rounded-md"
                          onClick={() => {
                              setOpenFriendsView(!openFriendsView);
                              setShowModal(false)
                              setShowList(false);
                          }}
                      >
                          Friends
                      </button>
                  </div>
                   <div className="container mx-auto mt-6">
                       {
                           showList && (list.length === 0? <div className="flex flex-col items-center justify-between">
                               <h1 className="text-gray-800 font-bold text-2xl mb-1 mt-7 ">There are no good deeds here yet</h1>
                               <p className="text-sm font-normal text-gray-600 mb-1">So add something...</p>
                               <svg viewBox="0 0 256 256" className="h-12 w-12 text-gray-400"  xmlns="http://www.w3.org/2000/svg">
                                   <rect fill="none" height="256" width="256"/>
                                   <circle cx="128" cy="128" fill="none" r="96" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/>
                                   <circle cx="92" cy="108" r="10"/><circle cx="164" cy="108" r="10"/><path d="M169.6,176a48.1,48.1,0,0,0-83.2,0" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"/>
                               </svg>
                           </div> : <>
                               <div className="container mx-auto mt-6">
                                   <div>
                                       {
                                           list.map((item) => {
                                               return  <div
                                                   className="flex items-center justify-between mb-6 bg-gray-400 mx-auto w-full md:w-[75%] rounded-md p-4"
                                                   key={item._id}
                                               >
                                                   <div
                                                       className={`${
                                                           item.isCompleted
                                                               ? "line-through text-white"
                                                               : "text-white"
                                                       }`}
                                                       onClick={() => {
                                                           handleToggleCompleted(item._id);
                                                       }}
                                                   >
                                                       { item.list }
                                                   </div>
                                                   <div>
                                                       <button
                                                           className="text-white p-1 rounded-md ml-2"
                                                           onClick={() => {
                                                               setShowModal(true);
                                                               setCurrentTask(item);
                                                               setNewTask(item.list);
                                                           }}
                                                       >
                                                           <TiPencil />
                                                       </button>
                                                       <button
                                                           className="text-white p-1 rounded-md ml-2"
                                                           onClick={() => handleDeleteToDo(item._id)}
                                                       >
                                                           <BsTrash />
                                                       </button>
                                                   </div>
                                               </div>
                                           })
                                       }
                                   </div>
                               </div>
                           </>)
                       }
                   </div>
               </div>
               {
                   openFriendsView && <FriendsList />
               }
           </div>
        </>
    )
}

export default ToDoList;