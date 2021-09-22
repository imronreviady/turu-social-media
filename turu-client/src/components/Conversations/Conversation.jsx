import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
	const [user, setUser] = useState(null);

	const PF = process.env.REACT_APP_PUBLIC_FOLDER;

	useEffect(() => {
		const friendId = conversation.members.find(
			(member) => member !== currentUser._id
		);

		const getUser = async () => {
			try {
				const response = await axios.get(
					`/api/users/?userId=${friendId}`
				);
				setUser(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getUser();
	}, [currentUser, conversation]);

	return (
		<div className="conversation">
			<img
				src={
					user?.profilePicture
						? PF + user?.profilePicture
						: PF + "person/noAvatar.png"
				}
				alt=""
				className="conversationImg"
			/>
			<span className="conversationName">{user?.username}</span>
		</div>
	);
}
