const API_END_POINT = '';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-type': 'application/json',
        'x-username': 'kimyuri',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('요청에 실패함');
  } catch (e) {
    console.error(e);
  }
};

export const fetchDocuments = async (documentId = '', options) =>
  request(
    `${API_END_POINT}/documents${documentId.length ? `/${documentId}` : ''}`,
    options
  );
