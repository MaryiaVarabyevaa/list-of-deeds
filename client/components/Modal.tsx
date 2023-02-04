import {Dispatch, SetStateAction, useState} from "react";
import {IList} from "@/types/list";
import {TiPencil} from "react-icons/ti";
import {BsTrash} from "react-icons/bs";

interface IModal {
    setShowModal: Dispatch<SetStateAction<boolean>>,
    list: IList[]
}

const Modal = ({setShowModal, list}: IModal) => {
    // const [showModal, setShowModal] = useState(false);

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3 sm:flex">
                        {
                            list.length === 0? <h1>This user does not have any good deeds yet</h1> : list.map((item) => {
                                const {_id, list, isCompleted} = item;
                                return <div
                                    key={_id}
                                    className="flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-md p-4"
                                >
                                    <div
                                        className={`${
                                            isCompleted
                                                ? "line-through text-greenTeal"
                                                : "text-sunsetOrange"
                                        }`}
                                    >
                                        {list}
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;