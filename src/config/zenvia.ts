import { Client, TextContent } from '@zenvia/sdk'
import { WhatsMessage } from '../types/message'

const APIKey: string = 'qD7RSHFfypsPs6Et5tPybERiwq7ViruWC3ZL'

const client = new Client(APIKey)

const whats = client.getChannel('whatsapp')

interface NewMessage {
	sender: string
	receiver: string
	messageContent: string
}

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
