import { useEffect } from 'react';
import ReactTimeAgo from 'react-time-ago'
import useDocuments from './hooks/useDocuments';
import InitialLoader from "./components/InitialLoader";
import OverlayImage from './components/OverlayImage';
import DocumentsGrid from './components/DocumentsGrid';

import './App.css';
function App() {
  const { loading, selectedImage, setSelectedImage, lastSave, } = useDocuments();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key.toLowerCase() === 'escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [setSelectedImage]);

  if (loading) return <InitialLoader />;

  return (
    <div className="App container max-w-4xl mx-auto py-4">
      <DocumentsGrid />
      {lastSave && (
        <div className="save-status">
          Last saved: <ReactTimeAgo date={lastSave} timeStyle="round" locale="en-US"/>
        </div>
      )}
      {selectedImage && (
        <OverlayImage src={selectedImage} />
      )}

    </div>
  );
}

export default App;
