import express from "express";
import { isLoggedIn } from "../middleware/authenticate";
import { getMessagesByGroup, sendMessage } from "../controllers/messageController";

const router = express.Router();
router.use(isLoggedIn)

router.post("/", sendMessage);
router.get("/:id", getMessagesByGroup);


export default router;