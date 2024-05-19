import React, { createContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import DocumentServices from '../services/document.services';
import { ACTION } from './actions';

const initialState = {
  documents: [],
  selectedImage: null,
  loading: true,
  lastSave: null,
};

const DocumentContext = createContext(initialState);

function DocumentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saveInterval = setTimeout(async () => {
      dispatch({ type: ACTION.SET_LOADING });
      const updatedDocuments = await DocumentServices.saveDocuments(state.documents);
      dispatch({ type: ACTION.SET_DOCUMENTS, payload: updatedDocuments });
      if (state.documents !== updatedDocuments) {
        dispatch({ type: ACTION.SET_LAST_SAVE, payload: Date.now() });
      }
    }, 1000 * 5);

    return () => {
      console.log("::: saveInterval -> CLEAR ::::", saveInterval);
      clearTimeout(saveInterval)
    }
  }, [state.documents, dispatch])

  useEffect(() => {
    let isMount = true;
    (async () => {
      try {
        const documents = await DocumentServices.getDocuments();
        if (isMount) {
          dispatch({ type: ACTION.SET_DOCUMENTS, payload: documents })
        }
      } catch (error) {
        console.log('Error getting documents', error)
      }
    })();
    return () => {
      isMount = false;
    }
  }, [dispatch]);


  return (
    <DocumentContext.Provider value={{ state, dispatch }}>
      {children}
    </DocumentContext.Provider>
  );
}

export { DocumentContext, DocumentProvider };