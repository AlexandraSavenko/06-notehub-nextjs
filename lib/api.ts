import { Note, NoteFormValues } from "@/types/note"
import axios from "axios"

interface FetchNotesResponse {
    notes: Note[],
    totalPages: number
}
interface FetchNotesParams {
    searchValue: string,
    page: number
}
interface FetchNoteDetails {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: string
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    }

})
export const fetchNotes = async ({searchValue, page}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const searchParams: Record<string, string> = {}
    if(searchValue) searchParams.search = searchValue
    if(page) searchParams.page = page.toString()
    const query = new URLSearchParams(searchParams)
const res = await api.get<FetchNotesResponse>(`/notes?${query}`);
return res.data
}

export const fetchNoteById = async ({ id }: {id: string}) => {

const res = await api.get<FetchNoteDetails>(`/notes/${id}`)

return res.data
}

export const createNote = async (newNote: NoteFormValues) => {
    const res = await api.post<FetchNotesResponse>('/notes', newNote);
    return res.data
}
export const deleteNote = async (noteId: string) => {
     const res = await api.delete(`/notes/${noteId}`);
    return res.data
}