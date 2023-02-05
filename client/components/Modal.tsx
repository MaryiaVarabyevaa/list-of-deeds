import {Dispatch, SetStateAction} from "react";
import {IList} from "@/types/list";
import Alert from "@/components/Alert";

interface IModal {
    setShowModal: Dispatch<SetStateAction<boolean>>,
    list: IList[],
    nickname: string
}

const Modal = ({setShowModal, list, nickname}: IModal) => {

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    {
                        list.length === 0?  <Alert errorText={`${nickname} doesn't have any good deeds yet`}/> : <div className=" sm:flex flex-col gap-3">
                            <h1 className="text-gray-800 font-bold text-2xl mb-1">{`${nickname}'s list`}</h1>
                            {
                                list.map((item) => {
                                    const {_id, list, isCompleted} = item;
                                    return <div
                                        key={_id}
                                        className="flex items-center justify-between bg-gray-400 mx-auto w-full rounded-2xl p-4"
                                    >

                                        <div
                                            className={`${
                                                isCompleted
                                                    ? "line-through text-white"
                                                    : "text-white"
                                            }`}
                                        >
                                            {list}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Modal;