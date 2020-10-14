type Config = {
	type: string
	host: string
	namespace: string
	port?: number | string
	url?: string | number
}

const development: Config = {
	type: 'development',
	host: 'http://localhost',
	namespace: 'arduino',
	port: 4000
}

const production: Config = {
	type: 'production',
	host: 'https://zenvia-server.herokuapp.com',
	namespace: ''
}

const config = process.env.NODE_ENV === 'development' ? development : production
const port = config.type === 'development' ? ':' + config.port : ''
const namespace = config.namespace ? config.namespace : ''
const url = config.host + port + '/' + namespace
config.url = url

export default config
