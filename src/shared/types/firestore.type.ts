export type ActionType =
  | { type: "data"; payload: any }
  | { type: "error"; payload: any }
  | { type: "loading"; payload: boolean };
