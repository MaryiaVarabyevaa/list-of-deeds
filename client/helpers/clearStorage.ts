export function clearStorage() {
    let session = sessionStorage.getItem('session');
    if (session === null) {
        localStorage.clear();
    }
    sessionStorage.setItem('session', 'true');
}