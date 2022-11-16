import API from "./api.js";

const useApi = async ({ method, content = '', id = '' }) => {

    const makeParam = () => {
        switch (method) {
            case 'GET':
                if (Boolean(id)) return { path: `/${id}` };
                return { path: '' };
            case 'POST':
                return { path: '', content };
            case 'PUT':
                return { path: `/${id}`, content };
            case 'DELETE':
                return { path: `/${id}` };
            default:
                throw new Error('잘못된 method 입니다.');
        }
    }

    try {
        const response = await API[method](makeParam());
        return response;
    } catch (e) {
        alert(e.message);
        console.error(e.message);
    }
};

const LIST_API = {
    getAllDocuments: async () => await useApi({ method: 'GET' }),

    getOneDocument: async ({ id }) => await useApi({ method: 'GET', id }),

    createDocument: async ({ content }) => await useApi({ method: 'POST', content }),

    editDocument: async ({ id, content }) => await useApi({ method: 'PUT', id, content }),

    deleteDocument: async ({ id }) => await useApi({ method: 'DELETE', id }),
}

export default LIST_API;
