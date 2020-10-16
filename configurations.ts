import { Config } from './src/types'

const development: Config = {
	type: 'development',
	host: 'http://localhost',
	port: 3000
}

const config = development
const port = config.port
const url = config.host + port
config.url = url

export default config
