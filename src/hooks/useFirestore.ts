import { ActionType } from "../shared/types/firestore.type";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { firestore } from "../firebase";
import { useReducer } from "react";

const initialState = {
  data: null,
  error: null,
  loading: false,
};

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case "data":
      return { data: action.payload, error: null, loading: false };
    case "error":
      return { data: null, error: action.payload, loading: false };
    case "loading":
      return {
        data: state.data,
        error: state.error,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ref = collection(firestore, collectionName);

  const add = async (document: any) => {
    dispatch({ type: "loading", payload: true });

    try {
      const res = await addDoc(ref, document);
      dispatch({ type: "data", payload: res });
    } catch (err) {
      dispatch({ type: "error", payload: err });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const set = async (id: string, document: any) => {
    dispatch({ type: "loading", payload: true });

    try {
      const res = await setDoc(doc(ref, id), document);
      dispatch({ type: "data", payload: res });
    } catch (err) {
      dispatch({ type: "error", payload: err });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const update = async (id: string, document: any) => {
    dispatch({ type: "loading", payload: true });

    try {
      await updateDoc(doc(ref, id), document);
      dispatch({ type: "data", payload: "ok" });
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  return { add, set, update, ...state };
};
