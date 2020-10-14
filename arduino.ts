import io from 'socket.io-client'
import five from 'johnny-five'
import config from './configurations'

const port: string | undefined = `${config.port}`

const socket = io.connect(`http://localhost:4000`)

const board = new five.Board({ port: 'COM4' })

board.on('ready', () => {
	const led = new five.Led({ pin: 2 })
	const lcd = new five.LCD({
		controller: 'PCF8574T'
	})
	socket.on('connect', () => {
		lcd.clear()
		led.blink()

		lcd.cursor(0, 3).print('Bem vindo!')
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
				.cursor(1, 3)
				.print('da Zenvia!')
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
			lcd.clear().cursor(0, 2).print('e aproveite!')
		}, 9000)
		setTimeout(() => {
			lcd.clear()
			lcd.noBacklight()
		}, 11000)
	})

	socket.on('newMessage', (data: string) => {
		console.log('data arduino', data)
		lcd.backlight().print('hellow')
	})
})
