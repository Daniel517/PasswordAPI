const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const config = require('../configs/config')

const connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
})

router.get('/authenticate', (req, res) => {
	const body = req.body
	const sql = `SELECT user_id FROM users WHERE username = "${body.username}" AND password = "${body.password}"`
	connection.query(sql, (err, rows, fields) => {
		if (err) {
			console.log(err)
			throw err
		}
		res.json(rows)
	})
})

module.exports = router;