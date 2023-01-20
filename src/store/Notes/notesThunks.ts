import { Merge } from '@mui/icons-material';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, setSaving, setNotes, updateNote, notesSlice } from './';

export const startNewNote: any = () => {
  return async (dispatch: any, getState: () => any) => {
    const { uid } = getState().auth;
    dispatch(setSaving());

    const newNote = {
      title: ' tercera nota hellow world',
      body: 'la tercera 454b5  4646y 9pefyvdfv7y dpf9v7a9dpsfv das9fv sd9fv d9pfv7',
      imageUrl: 'aqui va la url ',
      date: new Date().toLocaleString(),
    };

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
    setDoc(
      docRef,
      { title: title, body: body, ...active },
      {
        merge: true,
      }
    ).then(() => console.log('Document updated'));
    // const notesWithoutID = { title: title, body: body, ...active };
    // delete notesWithoutID.id;

    // console.log(notesWithoutID);

    // const docRef = doc(collection(firebaseDB, `${uid}/journal/notes/${active.id}`));
    // await setDoc(docRef, notesWithoutID, { merge: true });
    // dispatch(updateNote());
  };
};
