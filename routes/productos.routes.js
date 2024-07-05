import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const loadProducts = async () => {
    const fileProductos = await readFile('./data/productos.json', 'utf-8');
    return JSON.parse(fileProductos)
}

const router = Router()

//router.get para tp3
router.get('/all', async (req, res) => {
    try {
        const productos = await loadProducts();
        const productosFiltrados = productos.map(producto => ({
            id: producto.id,
            nombre: producto.nombre,
            desc: producto.desc,
            precio: producto.precio,
            cantidad: producto.cantidad,
            imagen: producto.imagen
        }));

        if (productosFiltrados.length > 0) {
            res.status(200).json(productosFiltrados);
        } else {
            res.status(404).json('No hay productos disponibles.');
        }
    } catch (error) {
        console.error('Error al leer el archivo de productos:', error);
        res.status(500).json('Error al obtener los productos.');
    }
})

//filtrar por categoria
router.get('/categoria/:categoria', async (req, res) => {
    try {
        const categoria = req.params.categoria;
        const productos = await loadProducts();
        const productosFiltrados = productos
            .filter(producto => producto.categoria === categoria)
            .map(producto => ({
                nombre: producto.nombre,
                desc: producto.desc,
                precio: producto.precio,
                cantidad: producto.cantidad
            }));

        res.json(productosFiltrados);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer los productos' });
    }
})

//obtener las categorias para utilizarlas en la lista desplegable en el front
router.get('/categorias', async (req, res) => {
    try {
        const productos = await loadProducts()
        const categorias = [...new Set(productos.map(producto => producto.categoria))]

        res.status(200).json(categorias)
    } catch (error) {
        console.error('Error al leer las categorías de productos:', error)
        res.status(500).json('Error al obtener las categorías.')
    }
})
/*router.get('/byId/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const result = productData.find(e => e.id === id)

    if (result) {
        res.status(200).json(result)
    } else {
        res.status(400).json(`${id} no se encuentra.`)
    }
})
router.get('/byName/:name', (req, res) => {
    const name = req.params.name
    const result = productData.find(e => e.nombre === name)
    try {
        if (result) {
            res.status(200).json(result.desc)
        } else {
            res.status(400).json(`${name} no se encuentra.`)
        }
    } catch (ex) {
        res.send(500).json('Error al buscar el producto.')
    }
})

router.put('/changePrice', (req, res) => {
    const id = req.body.id
    const newPrice = req.body.newPrice
    try {
        const index = productData.findIndex(e => e.id === id)
        if (index !== -1) {
            productData[index].precio = newPrice
        } else {
            res.status(400).json(`el id ${id} no se encuentra en la lista.`)
        }
        writeFile('./data/productos.json', JSON.stringify(productData, null, 2));
        res.status(200).json(`Se actualizó el precio del producto ${id} con éxito.`)
    } catch (ex) {
        res.send(500).json('Error al actualizar el producto.')
    }

})*/

export default router


