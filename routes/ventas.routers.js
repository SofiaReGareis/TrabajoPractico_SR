import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import { get_user_byId } from "../utils/usuarios.js"
import { calcularPrecioTotal, get_product_byId } from "../utils/productos.js"

const fileVentas = await readFile('./data/ventas.json', 'utf-8')
const salesData = JSON.parse(fileVentas)
const router = Router()
//console.log(salesData)
router.get('/all', (req, res) => {

    try {
        if (salesData.length) {
            res.status(200).json(salesData)
        } else {
            res.status(400).json('No hay ventas.')
        }
    }
    catch (ex) {
        res.send(500).json('Error al realizar la busqueda.')
    }
})



router.get('/byDate/:from/:to', (req, res) => {
    const from = req.params.from
    const to = req.params.to

    const result = salesData.filter(e => e.fecha >= from && e.fecha <= to)
    try {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json(`No hay ventas entre ${from}.`)
        }
    } catch (ex) {
        res.send(500).json('Error al realizar la busqueda.')
    }
})
// CAMBIAR PARA QUE TRAIGA LOS PRODUCTO CREAR UNA FUNCION QUE BUSQUE EL ID y ME DEVUELVA EL NOMBRE: 
/*router.post('/detail', (req, res) => {
    const from = req.body.from
    const to = req.body.to
    let aux = ''

    try {
        const arr = salesData.filter(e => e.fecha >= from && e.fecha <= to)
        const result = arr.map(e => {
            aux = get_user_byId(e.id_usuario)
            aux = aux.nombre + ' ' + aux.apellido
            console.log(e.producto)
            return {
                id: e.id,
                total: e.total,
                fecha: e.fecha,
                usuario: aux
            }
        })
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json(`No hay ventas entre ${from}.`)
        }
    } catch(ex) {
        res.send(500).json('Error al realizar la busqueda.')
    }
})*/

router.post('/detail', (req, res) => {
    const from = req.body.from
    const to = req.body.to
    let aux = ''

    try {
        const arr = salesData.filter(e => e.fecha >= from && e.fecha <= to)
        const result = arr.map(e => {
            aux = get_user_byId(e.id_usuario)
            aux = aux.nombre + ' ' + aux.apellido
            const productosNombres = e.productos.map(productoId => {
                const producto = get_product_byId(productoId)
                return producto ? producto.nombre : null
            })

            return {
                id: e.id,
                total: e.total,
                fecha: e.fecha,
                usuario: aux,
                producto: productosNombres
            }
        })
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json(`No hay ventas entre ${from} y ${to}.`)
        }
    } catch (ex) {
        res.send(500).json('Error al realizar la busqueda.')
    }
})

router.post('/sales', (req, res) => {
    const lastSaleId = salesData.length > 0 ? salesData[salesData.length - 1].id : 0
    const totalVenta = calcularPrecioTotal(req.body.productos)

    try {

        const newSale = {
            id: lastSaleId + 1,
            id_usuario: req.body.id_usuario,
            fecha: req.body.fecha,
            total: totalVenta,
            dirección: req.body.dirección,
            productos: req.body.productos
        }
        if (newSale) {
            salesData.push(newSale)
            writeFile('./data/ventas.json', JSON.stringify(salesData, null, 2))
            res.status(200).json(newSale)
        } else {
            res.status(400).json(`La venta no está completa`)
        }
    } catch (ex) {
        res.status(500).json('Error al crear la venta')
    }
})
export default router