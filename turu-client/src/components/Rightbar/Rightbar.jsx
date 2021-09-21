import './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../Online/Online'

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src="/images/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>Budi Dekil</b> and <b>4 other friends</b> have birthday today!</span>
                </div>
                <img src="/images/ad.png" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {
                        Users.map(user => (
                            <Online user={user} key={user.id} />
                        ))
                    }
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
                <h4 className="rightbarTitle">User Informations</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : '-'}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    <div className="rightbarFollowing">
                        <img src="/images/person/2.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Budi Dekil</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="/images/person/2.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Budi Dekil</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="/images/person/2.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Budi Dekil</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="/images/person/2.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Budi Dekil</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="/images/person/2.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Budi Dekil</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src="/images/person/2.jpeg" alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">Budi Dekil</span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                { user ? <ProfileRightbar /> : <HomeRightbar /> }
            </div>
        </div>
    )
}
