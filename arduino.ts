import five from 'johnny-five'
// import { socket } from './src/config/socket'
import { WhatsMessage } from './src/types/message'
import io from 'socket.io-client'

const board = new five.Board({ port: 'COM4' })

const socket = io('http://localhost:3000')

board.on('ready', () => {
	const led = new five.Led({ pin: 13 })
	const lcd = new five.LCD({
		controller: 'PCF8574T'
	})

	if (socket.disconnected)
		lcd.cursor(0, 1).print('Nao conectado').cursor(1, 3).print('ao socket')
	else {
		socket.on('connect', () => {
			led.blink()

			lcd.clear().cursor(0, 3).print('Bem vindo!')

			lcd.useChar('bigpointerright')
			setTimeout(() => {
				led.stop(0)
				led.off()
				lcd
					.clear()
					.cursor(0, 3)
					.print('Aproveite')
					.cursor(1, 2)
					.print('os exemplos')
			}, 2000)
			setTimeout(() => {
				lcd
					.clear()
					.cursor(0, 0)
					.print('de uso das APIs')
					.cursor(1, 2)
					.print('da Zenvia!:bigpointerright::bigpointerright:')
			}, 4000)
			setTimeout(() => {
				lcd
					.clear()
					.cursor(0, 3)
					.print('configure')
					.cursor(1, 1)
					.print('os seus dados')
			}, 6000)
			setTimeout(() => {
				lcd.clear().cursor(0, 1).print('e divirta-se!')
			}, 9000)
			setTimeout(() => {
				lcd.clear()
				lcd.noBacklight()
			}, 11000)
			socket.on('receivedMessage', (msg: WhatsMessage) => {
				const { receiver, message } = msg
				console.log('data arduino', msg)
				lcd.backlight().print(receiver).cursor(1, 0).print('recebeu')
				setTimeout(() => {
					lcd.clear().print(message)
				}, 2000)
			})
		})
	}
})
