const API_END_POINT = 'https://kdt.roto.codes';

export const fetchDocuments = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'tooooo1',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error();
  } catch (error) {
    alert(error.message);
  }
};

export const fetchDocumentList = async () => {
  const postList = await fetchDocuments('/documents');
  return postList;
};

export const fetchDocumentPost = async (postId) => {
  const post = await fetchDocuments(`/documents/${postId}`);
  return post;
};

export const fetchCreateDocument = async (parent) => {
  const newPost = await fetchDocuments(`/documents`, {
    method: 'POST',
    body: JSON.stringify({
      title: '제목 없음',
      parent,
    }),
  });
  return newPost;
};

export const fetchUpdateDocument = async (post) => {
  await fetchDocuments(`/documents/${post.id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
  });
};

export const fetchDeleteDocument = async (postId) => {
  await fetchDocuments(`/documents/${postId}`, {
    method: 'DELETE',
  });
};
