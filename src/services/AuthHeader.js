export default function authHeader() {
    const user = localStorage.getItem('user');
    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return {};
    }
}