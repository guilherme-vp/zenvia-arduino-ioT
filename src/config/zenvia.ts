import { Client, TextContent } from '@zenvia/sdk'
import io from 'socket.io-client'
import configs from '../../configurations'
import { Request, Response } from 'express'

interface NewMessage {
	sender: string
	receiver: string
	messageContent: string
}

const APIKey: string = 'qD7RSHFfypsPs6Et5tPybERiwq7ViruWC3ZL'

const client = new Client(APIKey)

export const whats = client.getChannel('whatsapp')

const socket = io.connect(`http://localhost:4000`)

const sendMessage = async ({
	sender,
	receiver,
	messageContent
}: NewMessage): Promise<string> => {
	const content = new TextContent(messageContent)
	const response = await whats.sendMessage(sender, receiver, content)
	console.log(response)
	if (response) return `${sender} enviou: "${content.text}"`
	else return 'Não foi possível completar'
}

const socketSend = async (req: Request, res: Response) => {
	const socketSend = await sendMessage({
		sender: 'shrub-handspring',
		receiver: '5511988203360',
		messageContent: 'oioi'
	})
	if (socketSend) {
		socket.emit('newMessage', socketSend)
		res.send('Mensagem enviada')
	} else {
		res.send('mensagem falhou')
	}
}

export default socketSend
