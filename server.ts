import express from 'express'
import dotenv from 'dotenv-safe'
import http from 'http'
import socket from 'socket.io'
import config from './configurations'
import { WhatsMessage } from './src/types/message'
import path from 'path'
import sendMessage from './src/config/zenvia'

dotenv.config()

export const env = dotenv.config()

export const app = express()

const httpServer = http.createServer(app)

const io = socket(httpServer)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/*', (_, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.set('views', path.join(__dirname, 'public'))

io.on('connection', socket => {
	console.log(`Nova conexão: ${socket.id}`)
	socket.on('new message', async (msg: WhatsMessage) => {
		const { receiver, message } = msg
		try {
			const socketSend = await sendMessage({
				sender: 'shrub-handspring',
				receiver,
				messageContent: message
			})
			if (socketSend) socket.broadcast.emit('receivedMessage', msg)
		} catch (e) {
			console.log(e)
		}
	})
})

httpServer.listen(process.env.PORT || config.port, () => {
	const port = process.env.PORT || config.port
	console.log(`Servidor rodando em ${port} :D`)
})

export default app
