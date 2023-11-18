import { createHash } from 'crypto'
import envConfig from '~/constants/config'

const sha256 = (content: string) => createHash('sha256').update(content).digest('hex')
const hashPassword = (password: string) => sha256(password + envConfig.PASSWORD_SECRET)
export default hashPassword
