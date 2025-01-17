
import { createSlice } from '@reduxjs/toolkit';

interface JournalState {
    isSaving: boolean;
    messageSaved: string;
    notes: Note[];
    active: Note | null;
}

interface Note {
    id: string;
    title: string;
    body: string;
    date: string;
    imageUrls: string[]
}

const initialState: JournalState = {
    isSaving: true,
    messageSaved: '',
    notes: [],
    active: null
};

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        addNewEmptyNote: (state, action) => {

        },
        setActiveNote: (state, action) => {

        },
        setNotes: (state, action) => {

        },
        setSaving: (state, action) => {

        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        },
    }
});

export const journalReducer = journalSlice.reducer;
export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById
} = journalSlice.actions;