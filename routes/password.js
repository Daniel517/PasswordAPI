const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const config = require('../config')

const connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
})

router.get('/authenticate', (req, res) => {
	const body = req.body
	const sql = `SELECT id FROM users WHERE username = ${body.username} AND password = ${body.password}`
	connection.query(sql, (err, rows, fields) => {
		
		res.json(rows)
	})
})

module.exports = router;