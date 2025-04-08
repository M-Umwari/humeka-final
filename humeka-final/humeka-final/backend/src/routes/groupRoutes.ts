import { Router } from "express";
import {GroupController} from '../controllers/groupController'
import { isLoggedIn, restrictToRole } from "../middleware/authenticate";

const router = Router()
router.use(isLoggedIn)

router.get('/', GroupController.getGroups)
router.post("/", restrictToRole(['counselor']), GroupController.createGroup)
router.post("/join", GroupController.joinGroup)
router.post("/leave", GroupController.leaveGroup)
router.post('/sessions', GroupController.createGroupSession)
router.get('/sessions', GroupController.getGroupSessions)
router.get('/sessions/own', GroupController.getOwnGroupSessions)
router.delete('/sessions/:id', GroupController.cancelGroupSession)

export default router