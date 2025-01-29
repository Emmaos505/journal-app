import { Dispatch } from "@reduxjs/toolkit";
import { AppStore } from "../store";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, Note, savingNewNote, setActiveNote, setNotes } from "./journalSlice";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch: Dispatch, getState: () => AppStore) => {
        dispatch(savingNewNote());
        const { uid } = getState().auth;
        console.log('uid', uid)

        const newNote: Note = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        console.log('newDocid', newDoc.id)
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote))

        console.log({ newDoc, setDocResp });

    }
};

export const startLoadingNotes = (uid: string) => {
    return async (dispatch: Dispatch) => {
        if (!uid) throw new Error('uid is required for get notes');
        const notesInFirebase = await loadNotes(uid);
        dispatch(setNotes(notesInFirebase));
        console.log('notesInFirebase', notesInFirebase);
    }
}