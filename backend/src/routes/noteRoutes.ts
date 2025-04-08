import express from "express";
import { createNote, getNotesByUser, updateNote, deleteNote } from "../controllers/noteController";
import { isLoggedIn } from "../middleware/authenticate";
import { validateNote } from "../middleware/validation/noteSchema";

const router = express.Router();


router.post("/", isLoggedIn, validateNote, createNote);
router.get("/", isLoggedIn, getNotesByUser);
router.patch("/:id", isLoggedIn, validateNote, updateNote);
router.delete("/:id", isLoggedIn, deleteNote);

export default router;