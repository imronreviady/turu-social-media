import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import './profile.css'

export default function Profile() {
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src="/assets/post/3.jpeg" alt="" className="profileCoverImg" />
                            <img src="/assets/person/1.jpeg" alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Imady Revi</h4>
                            <span className="profileInfoDesc">Hey mf!!!</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    )
}
