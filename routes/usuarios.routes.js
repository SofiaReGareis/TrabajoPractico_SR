import { Router } from "express"
import { readFile, writeFile } from 'fs/promises'
import bcrypt from 'bcryptjs'
const fileUsuarios = await readFile('./data/usuarios.json', 'utf-8')
const userData = JSON.parse(fileUsuarios)
const router = Router()

const loadUsers = async () => {
    const fileProductos = await readFile('./data/productos.json', 'utf-8');
    return JSON.parse(fileProductos)
}

//console.log(userData)
router.post('/login', (req, res) => {
    const username = req.body.username;
    const pass = req.body.pass;

    const user = userData.find(e => e.nombre === username)

    try {
        if (!user) {
            return res.status(404).json({ status: false })
        }

        // Compara la contraseña ingresada con la contraseña almacenada hasheada
        const passwordMatch = bcrypt.compareSync(pass, user.pass)

        if (!passwordMatch) {
            // Contraseña incorrecta
            return res.status(401).json({ status: false })
        }

        const Data = {
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            status: true
        }

        res.status(200).json(Data)
    } catch (error) {
        console.error('Error en la autenticación:', error)
        res.status(500).send('Error en el servidor')
    }
})

router.post('/newUser', (req, res) => {
    const { nombre, apellido, email, pass } = req.body
    try {
        const hashedPass = bcrypt.hashSync(pass, 8)

        const id = userData.length > 0 ? userData[userData.length - 1].id + 1 : 1
        const admin = false //esta es para seguir con el esquema de json ya creado

        userData.push({ id: id, nombre, apellido, email, password: hashedPass, es_administrador: admin })
        writeFile('./data/usuarios.json', JSON.stringify(userData, null, 2))

        res.status(200).json({ status: true })

    } catch (error) {
        console.error('Error al crear un nuevo usuario:', error)
        res.status(500).json('Error al crear un nuevo usuario.')
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