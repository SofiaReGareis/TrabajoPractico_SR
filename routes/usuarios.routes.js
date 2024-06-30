import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'

const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
const userData = JSON.parse(fileUsuarios)
const router = Router()

//console.log(userData)
router.post('/login', (req, res) => {
    const username = req.body.username
    const pass = req.body.pass

    const result = userData.find(e => e.nombre === username && e.password === pass)

    if (result) {
        const data = {
            nombre: result.nombre,
            apellido: result.apellido,
            email: result.email,
            status: true
        }
        console.log(data)
        res.status(200).json(data)
    } else {
        res.status(400).json({ status: false })
    }
})


router.get('/byId/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const result = userData.find(e => e.id === id)
    try {
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json(`${id} no se encuentra.`)
        }
    } catch (ex) {
        res.send(500).json('Error al realizar la busqueda.')
    }
})

router.delete('/delete/:id', async (req, res) => {
    const userId = parseInt(req.params.id)
    const usuarioIndex = userData.findIndex(usuario => usuario.id === userId)

    try {
        if (usuarioIndex === -1) {
            return res.status(404).json('Usuario no encontrado')
        }

        const deletedUsuario = userData.splice(usuarioIndex, 1)[0]

        //actualizar las ventas de este usuario
        const fileVentas = await readFile('./data/ventas.json', 'utf-8')
        const salesData = JSON.parse(fileVentas)

        salesData.forEach(venta => {
            if (venta.id_usuario === userId) {
                venta.id_usuario = -1; // Usuario obsoleto
            }
        })

        writeFile('./data/usuarios.json', JSON.stringify(userData, null, 2))
        writeFile('./data/ventas.json', JSON.stringify(salesData, null, 2))

        res.status(200).json(`Usuario ${deletedUsuario.nombre} eliminado exitosamente`)
    } catch (error) {
        res.status(500).json('Error al eliminar el usuario')
    }
})
export default router