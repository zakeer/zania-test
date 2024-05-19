import { useContext } from 'react';
import { ACTION } from '../store/actions';
import { DocumentContext } from '../store/context';

const useDocuments = () => {
  const { state, dispatch } = useContext(DocumentContext);

  const setDocuments = (documents) => {
    dispatch({ type: ACTION.SET_DOCUMENTS, payload: documents });
  };

  const moveDocument = (fromIndex, toIndex) => {
    dispatch({ type: ACTION.MOVE_DOCUMENT, payload: { fromIndex, toIndex } });
  };

  const setSelectedImage = (image) => {
    dispatch({ type: ACTION.SET_SELECTED_IMAGE, payload: image });
  };

  const setLastSave = (timestamp) => {
    dispatch({ type: ACTION.SET_LAST_SAVE, payload: timestamp });
  };

  return {
    documents: state.documents,
    selectedImage: state.selectedImage,
    loading: state.loading,
    lastSave: state.lastSave,
    moveDocument,
    setDocuments,
    setSelectedImage,
    setLastSave
  };
};

export default useDocuments;
