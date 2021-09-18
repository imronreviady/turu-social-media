import './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../Online/Online'

export default function Rightbar() {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img src="/assets/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>Budi Dekil</b> and <b>4 other friends</b> have birthday today!</span>
                </div>
                <img src="/assets/ad.png" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {
                        Users.map(user => (
                            <Online user={user} key={user.id} />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
