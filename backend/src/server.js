import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes.js'
import clienteRoutes from './routes/cliente.routes.js'
import tiposProyectoRoutes from './routes/tiposProyecto.routes.js'
import entregablesRoutes from './routes/entregables.routes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/clientes', clienteRoutes)
app.use('/api/tiposproyecto', tiposProyectoRoutes)
app.use('/api/entregables', entregablesRoutes)

// Servir archivos subidos
import path from 'path'
app.use('/uploads', express.static(path.resolve('uploads')))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en localhost:${PORT}`)
})