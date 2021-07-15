import { Router } from 'express';
import { NoteController } from '../controllers/note';
const route = Router();
const noteController = new NoteController();

route.post('/create',noteController.createNote);
route.get('/list',noteController.findNoteList);
route.get('/detail',noteController.findNote);

module.exports = route;