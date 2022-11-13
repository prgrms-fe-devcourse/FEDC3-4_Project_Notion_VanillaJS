export const API_ENDPOINT = 'https://kdt-frontend.programmers.co.kr'
export const API_X_USERNAME = 'roto'

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_ENDPOINT}${url}`, {
      ...options,
      headers: {
        'x-username': API_X_USERNAME,
        'Content-type': 'application/json'
      }
    })

    if(!res.ok) throw new Error(`Could not fetch data!! (${res.status})`)

    return await res.json()
    
  } catch(e) {
    alert(e.message)
  }
}


export const getDocument = async (documentId) => {
  return await request(`/documents${documentId ? `/${documentId}` : ''}`)
}

export const createDocument = async (document) => {
  return await request('/documents', {
    method: 'POST',
    body: JSON.stringify(document)
  })
}

export const editDocument = async () => {

}

export const deleteDocument = async (documentId) => {
  return await request(`/documents/${documentId}`, {
    method: 'DELETE'
  })
}