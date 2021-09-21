import { useEffect, useState } from 'react'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import './profile.css'
import axios from 'axios'
import { useParams } from 'react-router'

export default function Profile() {
    const [user, setUser] = useState({})
    const username = useParams().username
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fatchUser = async () => {
            const res = await axios.get(`/api/users/?username=${username}`)
            setUser(res.data)
        }
        fatchUser()
    }, []);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                src={user.profileCover ? PF + user.profileCover : PF + "person/noCover.png"}
                                alt="" className="profileCoverImg" />
                            <img
                                src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
                                alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{ user.username }</h4>
                            <span className="profileInfoDesc">{ user.desc }</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={ user } />
                    </div>
                </div>
            </div>
        </>
    )
}
