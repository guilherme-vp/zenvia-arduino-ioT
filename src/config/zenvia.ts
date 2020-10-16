import { Client, TextContent } from '@zenvia/sdk'
import { NewMessage, WhatsMessage } from '../types/message'

// Insira a key fornecida no dashboard da plataforma Zenvia
const APIKey: string = ''

const client = new Client(APIKey)

const whats = client.getChannel('whatsapp')

// Insira o nome do transportador da mensagem fornecido no dashboard da plataforma Zenvia
export const sender: string = ''

const sendMessage = async ({
	sender,
	receiver,
	messageContent
}: NewMessage): Promise<object | string | null> => {
	const content = new TextContent(messageContent)
	const response = await whats.sendMessage(sender, receiver, content)
	const messager: WhatsMessage = {
		receiver,
		message: content.text
	}
	if (response) return messager
	else return null
}

export default sendMessage
