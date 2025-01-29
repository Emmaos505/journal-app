import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid: string) => {
    if (!uid) throw new Error('El uid del usuario no existe');
    const response = await collection(FirebaseDB, `${uid}/journal/notes`);
    console.log('response', response);
    const { docs } = await getDocs(response);
    const notes = docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return notes;
}