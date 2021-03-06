import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
	const [friends, setFriends] = useState([]);
	const [onlineFriends, setOnlineFriends] = useState([]);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		const getFriends = async () => {
			const response = await axios.get(`/api/users/friends/${currentId}`);
			setFriends(response.data);
		};
		getFriends();
	}, [currentId]);

	useEffect(() => {
		setOnlineFriends(
			friends.filter((friend) => onlineUsers.includes(friend._id))
		);
	}, [friends, onlineUsers]);

	const handleClick = async (user) => {
		try {
			const response = await axios.get(
				`/api/conversations/find/${currentId}/${user._id}`
			);
			setCurrentChat(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="chatOnline">
			{onlineFriends.map((online) => (
				<div
					className="chatOnlineFriend"
					key={online._id}
					onClick={() => {
						handleClick(online);
					}}
				>
					<div className="chatOnlineImgContainer">
						<img
							className="chatOnlineImg"
							src={
								online.profilePicture
									? PF + online.profilePicture
									: PF + "person/noAvatar.png"
							}
							alt=""
						/>
						<div className="chatOnlineBadge"></div>
					</div>
					<span className="chatOnlineName">{online.username}</span>
				</div>
			))}
		</div>
	);
}
