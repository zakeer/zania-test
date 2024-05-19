import sortArray from "../utils/sortArray";
import { ACTION } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.MOVE_DOCUMENT:
      const { fromIndex, toIndex } = action.payload;
      const updatedDocuments = sortArray(state.documents, fromIndex, toIndex);
      return { ...state, documents: updatedDocuments };
    case ACTION.SET_DOCUMENTS:
      return { ...state, documents: action.payload, loading: false };
    case ACTION.SET_SELECTED_IMAGE:
      return { ...state, selectedImage: action.payload };
    case ACTION.SET_LAST_SAVE:
      return { ...state, lastSave: action.payload };
    case ACTION.SET_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default reducer