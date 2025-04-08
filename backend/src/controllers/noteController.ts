import moment from "moment-timezone";
import { AppDataSource } from "../data-source";
import Note from "../entities/Note";
import User from "../entities/User";
import { Request, Response } from "express";


const noteRepository = AppDataSource.getRepository(Note);
const userRepository = AppDataSource.getRepository(User);


export const createNote = async (req: Request, res: Response) => {
    try {
        const { note } = req.body;
        const userId = req.user.id;

        const user = await userRepository.findOneBy({id: userId})

        const newNote = noteRepository.create({ note, user });
        await noteRepository.save(newNote);

        return res.status(201).json({
            ...newNote,
            createdAt: moment(note.createdAt).tz('Africa/Kigali').format("MMM D, [at] h:mm A")
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};


export const getNotesByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const notes = await noteRepository.find({ where: { user:{id: userId} }, order:{createdAt:'DESC'} });

        const allNotes = notes.map((note) => ({...note, createdAt: moment(note.createdAt).tz('Africa/Kigali').format("MMM D, [at] h:mm A")}))

        return res.status(200).json(allNotes);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
  };


export const updateNote = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { note } = req.body;
      const userId = req.user.id;

      const existingNote = await noteRepository.findOne({ where: { id: id, user:{id: userId }} });
      if (!existingNote) return res.status(404).json({ message: "Note not found" });

      existingNote.note = note
      await noteRepository.save(existingNote);

      return res.status(200).json({
        ...existingNote,
        createdAt: moment(existingNote.createdAt).tz('Africa/Kigali').format("MMM D, [at] h:mm A")
    });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };


export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const note = await noteRepository.findOne({ where: { id: id, user:{id: userId} } });
        if (!note) return res.status(404).json({ message: "Note not found" });

        await noteRepository.remove(note);
        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}    