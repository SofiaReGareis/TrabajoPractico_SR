import { readFile } from 'fs/promises'

const fileProductos = await readFile('./data/productos.json', 'utf-8')
const productData = JSON.parse(fileProductos)

export const get_product_byId = (id) => {
    return productData.find(e => e.id === id)
}

export const calcularPrecioTotal = (productos) => {
    return productos.reduce((total, productId) => {
        const product = productData.find(p => p.id === productId)
        return total + (product ? product.precio : 0)
    }, 0)
} //productos es el posible array de los id de los productos de una venta.