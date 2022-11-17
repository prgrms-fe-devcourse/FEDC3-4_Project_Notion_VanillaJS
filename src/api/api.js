// const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

export const request = async (url, options = {}) => {
	try {
		const res = await fetch(`${process.env.API_END_POINT}${url}`, {
			...options,
			headers: {
				"Content-Type": "application/json",
				"x-username": "woogie",
			},
		});
		if (res.ok) {
			return await res.json();
		}
		throw new Error("API 호출 실패!!!!!!!");
	} catch (error) {
		alert(error);
	}
};
