const router = require("express").Router();
const Conversation = require("../models/conversation");

// new conversation
router.post("/", async (req, res) => {
	const newConversation = new Conversation({
		members: [req.body.senderId, req.body.receiverId],
	});

	try {
		const savedConversation = await newConversation.save();
		res.status(200).json(savedConversation);
	} catch (error) {
		res.status(500).json(error);
	}
});

// get conversations of a user
router.get("/:userId", async (req, res) => {
	try {
		const conversations = await Conversation.find({
			members: { $in: [req.params.userId] },
		});
		res.status(200).json(conversations);
	} catch (error) {
		res.status(500).json(error);
	}
});

// get conversations include two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
	try {
		const conversations = await Conversation.findOne({
			members: {
				$all: [req.params.firstUserId, req.params.secondUserId],
			},
		});
		res.status(200).json(conversations);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
