export function isLoggedIn() {
    const isLogged = localStorage.getItem('loggedIn');
    if (isLogged) {
        return true;
    }
    return false;
}
