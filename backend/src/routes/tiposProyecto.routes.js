import { Router } from 'express'
import { createTipoProyecto, getTiposProyecto, getTipoProyectoById, deleteTipoProyecto } from '../controllers/tiposProyecto.controller.js'

const router = Router()
router.post('/', createTipoProyecto)
router.get('/', getTiposProyecto)
router.get('/:id', getTipoProyectoById)
router.delete('/:id', deleteTipoProyecto)

export default router