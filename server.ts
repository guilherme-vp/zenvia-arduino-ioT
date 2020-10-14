import express from 'express'
import dotenv from 'dotenv-safe'
import five, { LCD} from 'johnny-five'
import http from 'http'
import socket from 'socket.io'


dotenv.config()

export const env = dotenv.config()

const board = new five.Board({ port: 'COM4' })

board.on('ready', () => {
	const lcd = new LCD({
		controller: 'PCF8574T'
	})
	lcd.cursor(0, 3).print('Bem vindo!')
	setTimeout(() => {
		lcd
		.clear()
		.cursor(0, 3)
		.print('Aproveite')
		.cursor(1, 2)
		.print('os exemplos')
	}, 1500)
	setTimeout(() => {
		lcd
		.clear()
		.cursor(0, 0)
		.print('de uso das APIs')
		.cursor(1, 3)
		.print('da Zenvia!')
	}, 3000)
	setTimeout(() => {
		lcd
		.clear()
		.cursor(0, 3)
		.print('configure')
		.cursor(1, 1)
		.print('os seus dados')
	}, 5000)
	setTimeout(() => {
		lcd.clear().cursor(0, 2).print('e aproveite!')
	}, 8000)
	setTimeout(() => {
		lcd.clear()
		lcd.noBacklight()
	}, 10000)
})

board.

const app = express()

const httpServer = new http.Server(app)

const io = socket(httpServer)

app.listen(process.env.PORT || 3000, () => {
	console.log(`Servidor rodando :D`)
})

export default app
