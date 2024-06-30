//Trae todos los productos para mostrar en la tabla
export const getProducts = async () => {
    try {
        const res = await fetch('http://localhost:3000/items/all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) {
            throw new Error('No se pueden obtener los datos')
        }
        const pruductos = await res.json()
        return pruductos

    } catch (error) {
        console.error('Error al obtener los datos: ', error)
    }
}

//Trae la categoría para cargarlas en la lista desplegable:
export const getCategory = async () => {
    try {
        const res = await fetch('http://localhost:3000/items/categorias', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) {
            throw new Error('No se pueden obtener los datos')
        }
        const categorias = await res.json()
        return categorias

    } catch (error) {
        console.error('Error al obtener los datos: ', error)
    }
}

//trae desde el back los productos para ser seleccionados por categoria
export const getProductsByCategory = async (category) => {
    try {
        const res = await fetch(`http://localhost:3000/items/categoria/${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) {
            throw new Error('No se pueden obtener los datos')
        }
        const productos = await res.json()
        return productos
    } catch (error) {
        console.error('Error al obtener los datos: ', error)
    }
}