export interface WhatsMessage {
	receiver: string
	message: string
}

export interface NewMessage {
	sender: string
	receiver: string
	messageContent: string
}
