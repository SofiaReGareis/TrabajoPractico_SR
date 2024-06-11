import express from 'express'
import dotenv from 'dotenv'
//import {readFile, writeFile} from 'fs/promises'
import userRouter from './routes/usuarios.routes.js'
import itemRouter from './routes/productos.routes.js'
import saleRouter from './routes/ventas.routers.js'

dotenv.config()
const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Servido levantado en el puerto ${port}`)
})

app.use('/user', userRouter)
app.use('/item', itemRouter)
app.use('/sale', saleRouter)



