import express from 'express'
import dotenv from 'dotenv-safe'
import http from 'http'
import socket from 'socket.io'
import config from './configurations'
import socketSend from './src/config/zenvia'

dotenv.config()

export const env = dotenv.config()

export const app = express()

const httpServer = http.createServer(app)

const io = socket(httpServer)

io.on('connection', socket => {
	console.log(`Nova conexão: ${socket.id}`)
	socket.on('newMessage', (message: string) => {
		console.log('parou aqui')
		console.log(`data recebida: ${message}`)
		io.emit(message)
	})
})

io.on('connection', socket => {
	socket.disconnect(true)
})

app.get('/arduinos', (req, res) => socketSend(req, res))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

export default app

httpServer.listen(process.env.PORT || config.port, () => {
	const port = process.env.PORT || config.port
	console.log(`Servidor rodando em ${port} :D`)
})
