import { addDoc, collection, doc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase";
import { useReducer } from "react";

type ActionType =
  | { type: "data"; payload: any }
  | { type: "error"; payload: any }
  | { type: "loading"; payload?: boolean };

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
        loading: action.payload || !state.loading,
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
      const res = await setDoc(doc(firestore, id), document);
      dispatch({ type: "data", payload: res });
    } catch (err) {
      dispatch({ type: "error", payload: err });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  return { add, set, ...state };
};
