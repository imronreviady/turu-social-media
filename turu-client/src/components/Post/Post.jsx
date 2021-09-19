import { Link } from 'react-router-dom'
import { MoreVert } from '@material-ui/icons'
import './post.css'
//import { Users } from '../../dummyData'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        const fatchUser = async () => {
            const res = await axios.get(`/api/users/?userId=${post.userId}`)
            setUser(res.data)
        }
        fatchUser()
    }, [post.userId]);

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={`/assets/${user.profilePicture || "person/noAvatar.png"}`} alt="" className="postProfileImg" />
                        </Link>
                        <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
                            <span className="postUsername">{user.username}</span>
                        </Link>
                        <span className="postDate">{ format(post.createdAt) }</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{ post?.desc }</span>
                    <img src={`/assets/${post?.img}`} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            src="/assets/like.png"
                            alt=""
                            className="likeIcon"
                            onClick={likeHandler}
                        />
                        <img
                            src="/assets/heart.png"
                            alt=""
                            className="likeIcon"
                            onClick={likeHandler}
                        />
                        <span className="postLikeCounter">{ like } people like this</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{ post.comment } comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
