
import { createSlice } from '@reduxjs/toolkit';

interface JournalState {
    isSaving: boolean;
    messageSaved: string;
    notes: Note[];
    active: Note | null;
}

export interface Note {
    id?: string;
    title: string;
    body: string;
    date: number;
    imageUrls?: string[]
}

const initialState: JournalState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
};

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmptyNote: (state, action) => {
            return {
                ...state,
                notes: [...state.notes, action.payload],
                isSaving: false
            }
        },
        setActiveNote: (state, { payload }) => {
            state.active = payload
        },
        setNotes: (state, { payload }) => {
            state.notes = payload
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
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions;