import { pool } from '../database/database.js'

export const getClienteById = async (req, res) => {
}

export const getClientes = async (req, res) => {

}

export const createCliente = async (req, res) => {
    try {
        const { rif_cliente, nombre_cliente, email_cliente, telefono_cliente } = req.body

        const result = await pool.query(
            'INSERT INTO clientes (rif_cliente, nombre_cliente, email_cliente, telefono_cliente) VALUES ($1, $2, $3, $4) RETURNING *',
            [rif_cliente, nombre_cliente, email_cliente, telefono_cliente]
        )

        res.status(201).json(result.rows[0])
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateCliente = async (req, res) => {

}

export const deleteCliente = async (req, res) => {

}