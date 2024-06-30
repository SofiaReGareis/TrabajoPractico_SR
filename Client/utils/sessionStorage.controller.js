//Funcion para agregar
export const addSession = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user))
}

//Funcion para obtener
export const getSession = () => {
    return JSON.parse(sessionStorage.getItem('user'))
}
//si existe que lo mande si no existe que mande un false