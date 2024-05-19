class DocumentServices {

  static API_ENDPOINT = `http://localhost:8080/documents`;

  static getDocuments = async () => {
    try {
      const response = await fetch(this.API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  }

  static saveDocuments = async (documents = []) => {
    try {
      const updatedDocuments = documents.map((doc, index) => {
        return {
          ...doc,
          index: doc.position,
          position: index
        }
      });
      const modifiedDocuments = updatedDocuments.filter((doc, idx) => doc.index !== idx);
      if (!modifiedDocuments.length) return documents;
      const response = await fetch(`${this.API_ENDPOINT}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documents: modifiedDocuments }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return updatedDocuments;
    } catch (err) {
      throw err;
    }
  }
}


export default DocumentServices;