import { Merge } from '@mui/icons-material';
import { collection, deleteDoc, doc, getDocs, query, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, setSaving, setNotes, updateNote, notesSlice, deleteNote } from './';

export const startNewNote: any = (data?: any) => {
  return async (dispatch: any, getState: () => any) => {
    const { uid } = getState().auth;
    const { active } = getState().notes;
    dispatch(setSaving());

    const newNote = {
      title: `${!active || (active.title != '' && active.body != '') ? '' : data.title}`,
      body: `${!active || (active.title != '' && active.body != '') ? '' : data.body}`,
      imageUrl: `AQuiVa URL IMG`,
      date: `${!active || (active.title != '' && active.body != '') ? '' : new Date().toLocaleString()}`,
    };
    if (!active || (active.title != '' && active.body != '')) return dispatch(setActiveNote(newNote)), dispatch(updateNote());

    const docRef = doc(collection(firebaseDB, `${uid}/journal/notes`));
    await setDoc(docRef, newNote);

    var docID = docRef.id;
    var newNoteWithID = { id: docID, ...newNote };

    dispatch(addNewEmptyNote(newNoteWithID));
    dispatch(setActiveNote(newNoteWithID));
  };
};

export const startLoadingNotes: any = () => {
  return async (dispatch: any, getState: any) => {
    const { uid } = getState().auth;

    const notesSnap = await getDocs(query(collection(firebaseDB, `${uid}/journal/notes`)));
    const notes: { id: string }[] = [];

    notesSnap.forEach((snapHijo) => {
      notes.push({ id: snapHijo.id, ...snapHijo.data() });
    });
    dispatch(setNotes(notes));
    return notes;
  };
};

export const startUpdateNote: any = ({ title, body }: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active } = getState().notes;

    const docRef = doc(firebaseDB, `${uid}/journal/notes`, active.id);
    await setDoc(docRef, { ...active, title: title, body: body }, { merge: true });
    dispatch(updateNote(active));
  };
};

export const startDeleteNote: any = () => {
  return async (dispatch: any, getState: any) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active } = getState().notes;

    const docRef = doc(firebaseDB, `${uid}/journal/notes`, active.id);
    await deleteDoc(docRef);

    dispatch(deleteNote(active));
  };
};
