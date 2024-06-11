import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileProductos = await readFile('./data/productos.json', 'utf-8')
const productData = JSON.parse(fileProductos)
const router = Router()

router.get('/byId/:id', (req, res) => {
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

})
export default router


