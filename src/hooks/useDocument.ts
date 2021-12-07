import { ActionType } from "../shared/types/firestore.type";
import { doc, onSnapshot } from "@firebase/firestore";
import { firestore } from "../firebase";
import { useEffect, useReducer } from "react";

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

export const useDocument = (collectionName: string, docId: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, collectionName, docId),
      (doc) => {
        dispatch({ type: "data", payload: doc.data() });
      },
      (err) => {
        dispatch({ type: "error", payload: err });
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { ...state };
};
