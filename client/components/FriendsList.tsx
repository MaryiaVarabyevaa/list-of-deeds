import {useSelector} from "react-redux";
import {IAllUserInfo, IUserState} from "@/types/user";
import {checkUserByNickname, getAllUsers} from "@/http/userAPI";
import {useCallback, useEffect, useState} from "react";
import {addFriend, getFriends} from "@/http/friendsAPI";
import {getList} from "@/http/listAPI";
import {IList} from "@/types/list";
import Modal from "@/components/Modal";


const FriendsList = () => {
    const [users, setUsers] = useState<IAllUserInfo[]>([]);
    const [friends, setFriends] = useState([]);
    const [userList, setUserList] = useState<IList[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const userId= useSelector((state: IUserState) => state.userId);

    const getUsers = async () => {
        let users = await getAllUsers();
        users = users.filter((user) => user._id !== userId);
        setUsers(users);
    }

    const getAllFriends = async () => {
        console.log('lala')
        let friends = await getFriends(userId);
        setFriends(friends);
    }

    useEffect(() => {
        if (userId) {
            getUsers();
            getAllFriends();
        }
    }, [])

    useEffect(() => {
        getUsers();
        getAllFriends();
    }, [isChanged])

    const handleClick = async (id: string) => {
        const list = await getList(id);
        setUserList(list);
        setShowModal(true);
    }

    const handleAdd = async () => {
        const checkedUser = await checkUserByNickname(value);
        if ( checkedUser ) {
           const newFriend = await addFriend(userId, checkedUser._id);
           setIsChanged(!isChanged);
           setValue('');
        } else {
            console.log("-")
        }

    }

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6">
            {
                users.length !== 0 &&  <div className="flex justify-center p-4 px-3 py-10">
                    <div className="w-full max-w-md">
                        <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                            <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                                Friends
                            </div>
                            <div className="flex items-center bg-gray-200 rounded-md">
                                <div className="pl-2">
                                    <button onClick={handleAdd}>
                                        +
                                    </button>
                                </div>
                                <input
                                    list="browsers"
                                    name="myBrowser"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                                />
                                <datalist id="browsers">
                                    {
                                        users.map((user: IAllUserInfo) => {
                                            const {_id, nickname} = user;
                                            return <option key={_id} value={nickname}/>
                                        })
                                    }
                                    <option value="Chrome" />
                                </datalist>
                            </div>
                            <div className="py-3 text-sm">
                                {
                                    friends.length !== 0 &&
                                    friends.map((friend) => {
                                        const {_id, nickname} = friend;
                                        return <div
                                            key={_id}
                                            onClick={() => handleClick(_id)}
                                            className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                                        >
                                            <span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
                                            <div className="flex-grow font-medium px-2">{nickname}</div>
                                            <div className="text-sm font-normal text-gray-500 tracking-wide">Friend</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                showModal && < Modal setShowModal={setShowModal} list={userList}/>
            }
        </div>
    )
}

export default FriendsList;