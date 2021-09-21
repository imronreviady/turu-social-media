import { useState, useEffect, useContext } from 'react'
import Post from '../Post/Post'
import Share from '../Share/Share'
import './feed.css'
// import { Posts } from '../../dummyData'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Feed({ username }) {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fatchPosts = async () => {
            const res = username ?
                await axios.get(`/api/posts/profile/${username}`)
                :
                await axios.get(`/api/posts/timeline/${user._id}`)
            setPosts(res.data)
        }
        fatchPosts()
    }, [username, user._id]);
    
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((post) => (<Post key={post._id} post={post} />))}
            </div>
        </div>
    )
}
