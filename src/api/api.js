import { APU_END_POINT, USER } from '../../dummyEnv.js';

const API_ROOT = ({ path }) => `${APU_END_POINT}${path}`;

const returnOptions = ({ method, content }) => {
	return {
		method,
		headers: {
			'x-username': USER,
			[method === 'POST' || method === 'PUT' ? 'Content-Type' : 'Accept']:
				'application/json',
		},
		[method === 'POST' || method === 'PUT' ? 'body' : 'params']:
			JSON.stringify(content),
	};
};

const useFetch = async ({ path, method, content = '' }) => {
	try {
		const options = returnOptions({ method, content });
		const response = await fetch(API_ROOT({ path }), options);

		if (!response || !response.ok) {
			throw Error(response.status);
		}

		return await response.json();
	} catch (e) {
		alert(e.message);
		console.error(e.message);
	}
};

const API = {
	GET: async ({ path }) => await useFetch({ path, method: 'GET' }),

	POST: async ({ path, content }) =>
		await useFetch({ path, method: 'POST', content }),

	PUT: async ({ path, content }) =>
		await useFetch({ path, method: 'PUT', content }),

	DELETE: async ({ path }) => await useFetch({ path, method: 'DELETE' }),
};

export default API;
