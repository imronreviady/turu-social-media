import { useState, useEffect } from 'react'
import Post from '../Post/Post'
import Share from '../Share/Share'
import './feed.css'
// import { Posts } from '../../dummyData'
import axios from 'axios'

export default function Feed({ username }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fatchPosts = async () => {
            const res = username ? await axios.get(`/api/posts/profile/${username}`) : await axios.get('/api/posts/timeline/6144a3325f7dc88a0b242659')
            setPosts(res.data)
        }
        fatchPosts()
    }, [username]);
    
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((post) => (<Post key={post._id} post={post} />))}
            </div>
        </div>
    )
}
