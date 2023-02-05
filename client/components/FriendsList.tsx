import {useSelector} from "react-redux";
import {IAllUserInfo, IUserState} from "@/types/user";
import {checkUserByNickname, getAllUsers} from "@/http/userAPI";
import {useEffect, useState} from "react";
import {addFriend, getFriends, getNotFriends} from "@/http/friendsAPI";
import {getList} from "@/http/listAPI";
import {IList} from "@/types/list";
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import {IFriend} from "@/types/friends";


const FriendsList = () => {
    const [users, setUsers] = useState<any>([]);
    const [friends, setFriends] = useState<any>([]);
    const [userList, setUserList] = useState<IList[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [value, setValue] = useState('');
    const [isChanged, setIsChanged] = useState(false);
    const [nickname, setNickname] = useState('')
    const [isError, setIsError] = useState('');
    const userId= useSelector((state: IUserState) => state.userId);

    const getAllFriends = async () => {
        let friends = await getFriends(userId);
        setFriends(friends);
    }

    const getOtherUsers = async () => {
        const notFriends = await getNotFriends(userId);
        setUsers(notFriends);
    }


    useEffect(() => {
        if (userId) {
            getAllFriends();
            getOtherUsers();
        }
    }, [])

    useEffect(() => {
        getAllFriends();
        getOtherUsers();
    }, [isChanged])

    const handleClick = async (id: string, nickname: string) => {
        const list = await getList(id);
        setUserList(list);
        setNickname(nickname)
        setShowModal(true);
    }

    const handleAdd = async () => {
        const checkedUser = await checkUserByNickname(value);
        if ( checkedUser ) {
           const newFriend = await addFriend(userId, checkedUser._id);
           setIsChanged(!isChanged);
           setValue('');
        } else {
            setIsError('There is no user with this nickname');
            setValue('');
        }

    }

    return (
        <div className="w-full max-w-screen-xl mx-auto px-6">
            {
                <div className="flex justify-center p-4 px-3 py-10">
                    <div className="w-full max-w-md">
                        <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                            <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                                Friends
                            </div>
                            {
                                isError.length !== 0 && <Alert errorText={isError}/>
                            }
                            <div className="flex items-center bg-gray-200 rounded-md">
                                <div className="pl-2">
                                    <button onClick={handleAdd} disabled={users.length === 0? true : false}>
                                        +
                                    </button>
                                </div>
                                <input
                                    list="browsers"
                                    name="myBrowser"
                                    value={value}
                                    disabled={users.length === 0? true : false}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                        setIsError('');
                                        }
                                    }
                                    className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                                />
                                <datalist id="browsers">
                                    {
                                        users.length !== 0 && users.map((user: IAllUserInfo) => {
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
                                    friends.map((friend: IFriend) => {
                                        const {_id, nickname} = friend;
                                        return <div
                                            key={_id}
                                            onClick={() => handleClick(_id, nickname)}
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
                showModal && < Modal setShowModal={setShowModal} list={userList} nickname={nickname}/>
            }
        </div>
    )
}

export default FriendsList;