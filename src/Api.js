const API_END_POINT = 'https://kdt-frontend.programmers.co.kr/'

export const request = async ({ url, options }) => {
    try {
        console.log(url)
        const res = await fetch(`${API_END_POINT}${url}`, options)
        if (res.ok) {
            const json = JSON.parse(res);
            return json
        }
        throw new Error('fetch fail')
    } catch (e) {
        alert(e.message)
    }
}
