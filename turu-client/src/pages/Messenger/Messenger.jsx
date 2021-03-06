import "./messenger.css";
import Topbar from "../../components/Topbar/Topbar";
import Conversation from "../../components/Conversations/Conversation";
import Message from "../../components/Message/Message";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger() {
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessages, setNewMessages] = useState("");
	const [arrivalMessages, setArrivalMessages] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	const { user } = useContext(AuthContext);
	const scrollRef = useRef();
	const socket = useRef();

	useEffect(() => {
		socket.current = io("ws://localhost:8900");

		socket.current.on("getMessage", (data) => {
			setArrivalMessages({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		arrivalMessages &&
			currentChat?.members.includes(arrivalMessages.sender) &&
			setMessages((prev) => [...prev, arrivalMessages]);
	}, [arrivalMessages, currentChat]);

	useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", (users) => {
			setOnlineUsers(
				user.followings.filter((f) => users.some((u) => u.userId === f))
			);
		});
	}, [user]);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get(`/api/conversations/${user._id}`);
				setConversations(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getConversations();
	}, [user._id]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get(
					`/api/messages/${currentChat?._id}`
				);
				setMessages(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getMessages();
	}, [currentChat]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessages,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find(
			(member) => member !== user._id
		);

		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessages,
		});

		try {
			const res = await axios.post("/api/messages", message);
			setMessages([...messages, res.data]);
			setNewMessages("");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<>
			<Topbar />
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input
							placeholder="search for friends"
							className="chatMenuInput"
						/>
						{conversations.map((conversation) => (
							<div onClick={() => setCurrentChat(conversation)}>
								<Conversation
									key={conversation._id}
									conversation={conversation}
									currentUser={user}
								/>
							</div>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{currentChat ? (
							<>
								<div className="chatBoxTop">
									{messages.map((message) => (
										<div ref={scrollRef}>
											<Message
												message={message}
												own={
													message.sender === user._id
												}
											/>
										</div>
									))}
								</div>

								<div className="chatBoxBottom">
									<textarea
										className="chatMessageInput"
										placeholder="write something"
										onChange={(e) =>
											setNewMessages(e.target.value)
										}
										value={newMessages}
									></textarea>
									<button
										className="chatSubmitButton"
										onClick={handleSubmit}
									>
										Send
									</button>
								</div>
							</>
						) : (
							<span className="noConversationText">
								Open a new chat
							</span>
						)}
					</div>
				</div>
				<div className="chatOnline">
					<div className="chatOnlineWrapper">
						<ChatOnline
							onlineUsers={onlineUsers}
							currentId={user._id}
							setCurrentChat={setCurrentChat}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
