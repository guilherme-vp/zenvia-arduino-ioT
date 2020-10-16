import five from 'johnny-five'
import { WhatsMessage } from '../types/message'
import io from 'socket.io-client'
import config from '../config/configurations'

// Insira a porta onde seu Arduino está sendo executado
const board = new five.Board({ port: 'COM4' })

board.on('ready', () => {
	const led = new five.Led({ pin: 13 })
	const lcd = new five.LCD({
		// Insira a versão do seu display lcd
		controller: 'PCF8574T'
	})
	// Insira a url onde o servidor socket está sendo executado
	const socket = io.connect(`http://localhost:${config.port}`, {
		reconnection: true,
		forceNew: true
	})
	socket.on('connect', () => {
		lcd.backlight()
		console.log('Client conectado')

		socket.on('disconnect', () => {
			console.log('Client Desconectado')
			lcd
				.clear()
				.cursor(0, 1)
				.print('Nao conectado')
				.cursor(1, 3)
				.print('ao socket')
		})
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
			led.blink()

			setTimeout(() => {
				led.stop(0)
				led.off()
			}, 1000)

			const { receiver, message } = msg

			lcd
				.clear()
				.cursor(0, 2)
				.backlight()
				.print(receiver)
				.cursor(1, 4)
				.print('recebeu:')

			setTimeout(() => {
				lcd.clear().print(message)
			}, 5000)
			setTimeout(() => {
				lcd.clear().noBacklight()
			}, 10000)
		})
	})
})
