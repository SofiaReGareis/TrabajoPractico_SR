import express from 'express'
//import dotenv from 'dotenv'
//import { readFile, writeFile } from 'fs/promises'
import userRouter from './routes/usuarios.routes.js'
import itemRouter from './routes/productos.routes.js'
import saleRouter from './routes/ventas.routers.js'

//dotenv.config()
const app = express()
//const port = process.env.PORT || 5000
const port = 3000
app.use(express.json())
app.use(express.static('./Client'))

app.listen(port, () => {
    console.log(`Servido levantado en el puerto ${port}`)
})

app.use('/users', userRouter)
app.use('/items', itemRouter)
app.use('/sales', saleRouter)



