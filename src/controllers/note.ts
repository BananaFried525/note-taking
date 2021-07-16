import { Request, Response } from "express";
import { Note, NoteModel } from "../models/note";
import { ResponseModel } from "../models/response";
import { Validator } from "../utils/validator";

export class NoteController {
    constructor() { }

    createNote = async (req: any, res: any) => {
        let validator = new Validator();
        try {
            let invalidStr = validator.validateField(req.body,["title","content"]);
            if (invalidStr.length > 0) {
                res.status(400).json({ data: `invalid: ${invalidStr}` });
                return
            }
            let { title, content, tags } = req.body
            let newNote = new NoteModel({ title, content, tags });
            await newNote.save();

            res.status(200).json(new ResponseModel("success", {}));
        } catch (error) {
            res.status(500).json(new ResponseModel("error", error));
        }
    }

    findNoteList = async (req: any, res: Response) => {
        try {
            let { filter } = req.query;
            let allowFilter = ['title', '-title', 'createAt', '-createAt'];
            if (allowFilter.indexOf(filter) == -1) filter = '';
            let noteList = await NoteModel.find({}).sort(filter);
            let respNotes = new Array<Note>();
            noteList.forEach(note => {
                let a: Note = {
                    id: note?._id || "",
                    title: note?.title || "",
                    content: note?.content || "",
                    createAt: note?.createAt || new Date(),
                    tags: note?.tags || new Array<String>()
                };
                respNotes.push(a);
            });

            res.status(200).json(new ResponseModel("success", respNotes));
        } catch (error) {
            res.status(500).json(new ResponseModel("error", error));
        }

    }

    findNote = async (req: Request, res: Response) => {
        const validator = new Validator();
        try {
            let { id } = req.query
            let reg = /^[0-9a-fA-F]{24}$/
            if (validator.isEmpty(id) || !reg.test(id + "")) {
                res.status(400).json({ data: 'invalid: id' });
                return
            }
            let note = await NoteModel.findById(id);
            let respNote: Note = {
                id: note?._id || "",
                title: note?.title || "",
                content: note?.content || "",
                createAt: note?.createAt || new Date(),
                tags: note?.tags || new Array<String>()
            };
            res.status(200).json(new ResponseModel("success", respNote));
        } catch (error) {
            console.log(error)
            res.status(500).json(new ResponseModel("error", error));
        }
    }

    findNotesByTag = async (req: Request, res: Response) => {
        const validator = new Validator();
        try {
            let invalidStr = validator.validateField(req.query,["tagName"]);
            if (invalidStr.length > 0) {
                res.status(400).json({ data: `invalid: ${invalidStr}` });
                return
            }
            let { tagName } = req.query;
            let notes = await NoteModel.find({ tags: tagName });
            let respNotes = new Array<Note>();
            notes.forEach(note => {
                let a: Note = {
                    id: note?._id || "",
                    title: note?.title || "",
                    content: note?.content || "",
                    createAt: note?.createAt || new Date(),
                    tags: note?.tags || new Array<String>()
                };
                respNotes.push(a);
            });
            res.status(200).json(new ResponseModel("success", respNotes))
        } catch (error) {
            console.log(error)
            res.status(500).json(new ResponseModel("error", error));
        }
    }
}