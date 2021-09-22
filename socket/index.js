const io = require("socket.io")(8900, {
	cors: {
		origin: "http://localhost:3000",
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
	// when client connects
	console.log("a user connected");

	// take userId and socketId from user
	socket.on("addUser", (userId) => {
		addUser(userId, socket.id);
		io.emit("getUsers", users);
	});

	// when client sends and gets message
	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const sender = getUser(senderId);
		const receiver = getUser(receiverId);
		if (sender && receiver) {
			io.to(receiver.socketId).emit("getMessage", {
				senderId,
				text,
			});
		}
	});

	// when client disconnects
	socket.on("disconnect", () => {
		console.log("user disconnected");
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});
