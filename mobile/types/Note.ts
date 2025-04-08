export interface Note {
    id: string,
    note: string,
    createdAt: string
}

export interface noteFormData {
    note: string
}

export interface updateNoteFormData {
    id:string,
    formData: noteFormData
}