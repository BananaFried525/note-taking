import { model, Schema } from "mongoose";

const noteSchema = new Schema<Note>({
    title: { type: String },
    content: { type: String, default: "" },
    tags: { type: [String] }
},{
    timestamps:{createdAt:'createAt'}
})

export interface Note {
    id: String
    title: String
    content: String
    createAt: Date
    tags: String[]
}

export const NoteModel = model<Note>('Note', noteSchema);